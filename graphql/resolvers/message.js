const Message = require("../../models/message");
const User = require("../../models/user");
const DataLoader = require("dataloader");
var { sockets, realSockets } = require("../../Global");

module.exports = {
  addMessage: async (args) => {
    try {
      const message = new Message({
        message: args.message,
        sender: "5f11b574f5c916209ceaf64d",
        receiver: "5f11aa85ac6e7a27ec0c7875",
      });

      for (let y in realSockets) {
        if ("5f11aa85ac6e7a27ec0c7875" === realSockets[y].id) {
          console.log(realSockets[y].id);

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

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      password: null,
    };
  } catch (err) {
    throw err;
  }
};

const transformMessage = async (message) => {
  return {
    ...message._doc,
    _id: message.id,
    sender: user.bind(this, message._doc.sender),
    receiver: user.bind(this, message._doc.receiver),
  };
};
