const DataLoader = require("dataloader");

const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

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
  message._doc.read = message._doc.read
    ? dateToString(message._doc.read)
    : "false";

  return {
    ...message._doc,
    _id: message.id,
    sender: user.bind(this, message._doc.sender),
    receiver: user.bind(this, message._doc.receiver),
    createdAt: dateToString(message._doc.createdAt),
    updatedAt: dateToString(message._doc.updatedAt),
  };
};

exports.transformMessage = transformMessage;
