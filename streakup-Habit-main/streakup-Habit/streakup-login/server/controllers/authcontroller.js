import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usermodal from "../models/usermodal.js";
import transporter from "../config/nodemailer.js";
// REGISTER
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({ success: false, message: "Please provide all the details" });
  }

  try {
    const existingUser = await usermodal.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: "Username already taken" });
    }

    const existingEmail = await usermodal.findOne({ email });
    if (existingEmail) {
      return res.json({ success: false, message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new usermodal({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      //sending emial welcome
      const mailoptions = {
        
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Welcome to StreakUp!',
        text: `Hello ${username},\n\nWelcome to StreakUp! We're excited to have you on board.\n\nBest regards,\nThe StreakUp Team`
      }
      await transporter.sendMail(mailoptions);
      return res.status(201).json({
      
        success: true,
        message: "User registered successfully and also sent welcome email",
        user: { username: user.username, email: user.email, id: user._id },
        token,
      
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, message: "Please provide all the details" });
  }

  try {
    const user = await usermodal.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user: { username: user.username, email: user.email, id: user._id },
        token,
      });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      })
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// SEND VERIFY OTP tp users email
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId; // ✅ get userId from middleware
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await usermodal.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.isAccountVerified) return res.json({ success: false, message: "Account already verified" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyotp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Your OTP for Account Verification',
      text: `Hello ${user.username},\n\nYour OTP is: ${otp}\nThis OTP is valid for 10 minutes.`
    };

    await transporter.sendMail(mailoptions);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// VERIFY ACCOUNT USING OTP
export const verifyEmail = async (req, res) => {
  try {
    const userId = req.userId;   // ✅ comes from token (middleware)
    const { otp } = req.body;    // ✅ comes from frontend input

    if (!userId || !otp) {
      return res.json({ success: false, message: "Missing details" });
    }

    const user = await usermodal.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (!user.verifyotp || user.verifyotp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    // ✅ Mark account verified
    user.isAccountVerified = true;
    user.verifyotp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// CHECK IF USER IS AUTHENTICATED OR NOT
//middle well exectduted after that this will be executed
export const isAuthenticated =  async(req,res)=>{
  try{

    return res.json({success:true,message:"user is authenticated"});

  }catch(error)
  {
    return res.json({success:false,message:error.message});
  }

}

// send reset OTP
export const sendResestOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: "Please provide email" });

  try {
    const user = await usermodal.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    // generate OTP only once
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    // send email
    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Your OTP for Password Reset",
      text: `Hello ${user.username},\n\nYour OTP is: ${otp}\nValid for 10 minutes.`,
    };
    await transporter.sendMail(mailoptions);

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.json({ success: false, message: "Please provide all details" });

  try {
    const user = await usermodal.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // clear OTP after reset
    user.resetPasswordOtp = "";
    user.resetPasswordOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



// VERIFY RESET OTP
export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.json({ success: false, message: "Please provide email and OTP" });

  try {
    const user = await usermodal.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.resetPasswordOtp !== otp) return res.json({ success: false, message: "Invalid OTP" });
    if (user.resetPasswordOtpExpireAt < Date.now()) return res.json({ success: false, message: "OTP expired" });

    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

