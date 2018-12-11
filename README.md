# Prime/ish

The Prime/ish app takes a 3-digit input and will return the first prime number that contains that input. This repo is the front-end code. To run the app locally, you will also need to clone the back-end code from https://github.com/dcschreck/prime-ish-server.

## Technical Specs

rime/ish is built with the MERN stack; MongoDB, Express, React.js, and Node.js. Also added to this project are graphql-yoga (runs on top of Apollo's apollo-server-express), mongoose (connects to MongoDB database and allows us to run queries and mutations) and react-apollo (allows us to run GraphQL queries in React).

## How to Run App

Once both the front-end and back-end repos have been cloned, start the server:

1. In your terminal, navigate to `prime-ish/server`. Start MongoDB by typing:
  * `brew services start mongodb`

2. To start the server, type:
  * `node index.js`

3. Open a new terminal tab (keep the server-side running) and navigate to `prime-ish/client`. Start your React app by typing:
  * `npm start`

The React app should automatically open at http://localhost:3000. Queries can now be run. If you navigate to http://localhost:4000, you will see your GraphQL "Playground." Here you can run queries and mutations with our without running the front-end.  
