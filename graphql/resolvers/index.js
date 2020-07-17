const authResolver = require("./auth");
const messageResolver = require("./message");

const rootResolver = {
  ...authResolver,
  ...messageResolver,
};

module.exports = rootResolver;
