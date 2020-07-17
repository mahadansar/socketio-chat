var { sockets } = require("../Global");
const { updateSocketId } = require("../graphql/resolvers/auth");
/**
 * SOCKET IO
 */

module.exports = {
  addSocket: async (email, socketId) => {
    try {
      sockets.push({ email, socketId });
      updateSocketId(email, socketId);
    } catch (err) {
      throw err;
    }
  },
  removeSocket: async (socketId) => {
    try {
      sockets = sockets.filter((item) => item.socketId !== socketId);
    } catch (err) {
      throw err;
    }
  },
};
