var { sockets, realSockets } = require("../Global");
const { updateSocketId } = require("../graphql/resolvers/auth");
/**
 * SOCKET IO
 */

module.exports = {
  addSocket: async (email, socketId, socket) => {
    try {
      sockets.push({ email, socketId });
      realSockets.push(socket);
      updateSocketId(email, socketId);
    } catch (err) {
      throw err;
    }
  },
  removeSocket: async (socketId) => {
    try {
      sockets = sockets.filter((item) => item.socketId !== socketId);
      realSockets = realSockets.filter((item) => item.id !== socketId);
    } catch (err) {
      throw err;
    }
  },
};
