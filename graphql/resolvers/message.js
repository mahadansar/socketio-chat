const Message = require("../../models/message");
var { realSockets } = require("../../Global");
const { transformMessage } = require("./merge");

module.exports = {
  addMessage: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      const message = new Message({
        message: args.message,
        sender: req.userId,
        receiver: args.userId,
      });

      for (let y in realSockets) {
        if (args.userId === realSockets[y].id) {
          realSockets[y].emit("message", message);
          break;
        }
      }

      let result = await message.save();

      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  getMessages: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      const data = {
        $or: [
          {
            $and: [
              {
                receiver: req.userId,
              },
              {
                sender: args.userId,
              },
            ],
          },
          {
            $and: [
              {
                receiver: args.userId,
              },
              {
                sender: req.userId,
              },
            ],
          },
        ],
      };

      const result = await Message.find(data).sort({ timestamp: 1 });

      return result.map((message) => {
        return transformMessage(message);
      });
    } catch (err) {
      throw err;
    }
  },
};
