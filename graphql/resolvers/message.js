const User = require("../../models/user");
const Message = require("../../models/message");

module.exports = {
  addMessage: async (args) => {
    try {
      const Message = new Message({
        message: args.message,
        sender: "5f11aa85ac6e7a27ec0c7875",
        receiver: "5f11b574f5c916209ceaf64d",
      });

      let result = await Message.save();

      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
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
