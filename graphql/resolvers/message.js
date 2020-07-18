const Message = require("../../models/message");
var { realSockets } = require("../../Global");
const { transformMessage } = require("./merge");

module.exports = {
  addMessage: async (args) => {
    try {
      const message = new Message({
        message: args.message,
        sender: "5f11aa85ac6e7a27ec0c7875",
        receiver: "5f11b574f5c916209ceaf64d",
      });

      for (let y in realSockets) {
        if ("5f11aa85ac6e7a27ec0c7875" === realSockets[y].id) {
          console.log(realSockets[y].id);

          // realSockets[y].emit("message", message);

          break;
        }
      }

      let result = await message.save();

      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  getMessages: async ({ sender, receiver }) => {
    const data = {
      $or: [
        {
          $and: [
            {
              receiver: sender,
            },
            {
              sender: receiver,
            },
          ],
        },
        {
          $and: [
            {
              receiver: receiver,
            },
            {
              sender: sender,
            },
          ],
        },
      ],
    };

    const result = await Message.find(data).sort({ timestamp: 1 });

    return result.map((message) => {
      return transformMessage(message);
    });
  },
};
