const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type User {
  _id: ID!
  firstName: String!
  lastName: String!
  email: String!
  password: String
  socketId: String
  createdAt: String!
  updatedAt: String!
}
type Message {
  _id: ID!
  message: String!
  sender: User!
  receiver: User!
  read: String
  createdAt: String!
  updatedAt: String!
}
type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}
input UserInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
}
type RootQuery {
    getMessages(userId: ID!): [Message!]
}
type RootMutation {
    createUser(userInput: UserInput): User
    login(email: String!, password: String!): AuthData!
    addMessage(message: String!, userId: ID!): Message!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
