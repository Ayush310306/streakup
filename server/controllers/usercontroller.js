import usermodal from "../models/usermodal.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId; // coming from middleware
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user ID",
      });
    }

    // ⛔ TERA SELECT = "username isAccountVerified"
    // ✔ FIX → _id ko include karna hi padega
    const user = await usermodal
      .findById(userId)
      .select("_id username email isAccountVerified totalPoints");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      userData: {
        _id: user._id, // 🔥 super important
        username: user.username,
        email: user.email,
        totalPoints: user.totalPoints || 0,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    console.error("Error in getUserData:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: " + error.message,
    });
  }
};

export default getUserData;
