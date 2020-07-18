var { realSockets } = require("../Global");
const { updateSocketId } = require("../graphql/resolvers/user");
/**
 * SOCKET IO
 */
module.exports = {
  addSocket: async (email, socketId, socket) => {
    try {
      realSockets.push(socket);
      updateSocketId(email, socketId);
    } catch (err) {
      throw err;
    }
  },
  removeSocket: async (socketId) => {
    try {
      realSockets = realSockets.filter((item) => item.id !== socketId);
    } catch (err) {
      throw err;
    }
  },
};
