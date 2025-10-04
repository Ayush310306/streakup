import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
  const { token } = req.cookies;

  console.log("Cookies:", req.cookies);

  
  if (!token) {
    return res.status(401).json({ success: false, message: "please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    req.userId = decoded.id; // attach userId here
    console.log(`Authenticated User ID: ${decoded.id}`);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized: " + err.message });
  }
};

export default userAuth;
