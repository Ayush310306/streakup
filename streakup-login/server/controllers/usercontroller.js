import usermodal from "../models/usermodal.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId; // coming from middleware
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID" });
    }

    const user = await usermodal.findById(userId).select("username isAccountVerified");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      userData: {
        userId: user._id,
        username: user.username,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    console.error("Error in getUserData:", error);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};
export default getUserData;