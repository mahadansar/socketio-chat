const User = require("../../models/user");

module.exports = {
  updateSocketId: async (email, socketId) => {
    try {
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        throw new Error("User not found.");
      }

      existingUser.socketId = socketId;
      await existingUser.save();

      return;
    } catch (err) {
      console.log(err);
    }
  },
};
