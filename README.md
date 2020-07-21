# socketio-chat

Using NodeJS, also ReactJS to for demonstration, with the help of socketIO to create a private chat system with user authentication.

CMD Logs:

- git clone https://github.com/mahadansar/socketio-chat.git
- npm init -y
- npm install --save express body-parser
- npm install --save-dev nodemon
- npm start
- npm install --save express-graphql graphql
- npm install --save mongoose
- npm install --save bcryptjs
- npm install --save jsonwebtoken
- npm install --save dataloader
- npm install socket.io

./frontend:

- npx create-react-app .
- npm install --save react-router-dom
- npm install socket.io-client react-scroll-to-bottom react-emoji query-string
- npm i -s graphql apollo-boost react-apollo
- npm install @apollo/react-hooks apollo-cache-inmemory apollo-link-http apollo-client

Other INFO:

MERNG

Database
Users - \_id, firstName!, lastName!, email!, password, socketID(updated every login)
Messages - \_id, message
Message_Sender - messageID, userID
Message_Recipient - messageID, userID

Server
Sockets[] - store online sockets(users)
