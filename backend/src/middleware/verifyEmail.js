const User = require("../users/user.model");

const verifyEmail = async (req, res, next) => {
  try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      if (!user.isVerified) {
          return res.status(403).json({ success: false, message: "Email verification required" });
      }

      // Proceed to the next middleware or controller
      req.user = user; // Attach the user object to `req` for further use if needed
      next();
  } catch (error) {
      console.error("Error in verifyEmail middleware", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = verifyEmail;
