# Prime/ish

How many times have you asked yourself, "I wonder if <3-digit number> is part of one of the first 10,000 Prime numbers" and had no easy way to find the answer??? I know I have! That's where Prime/ish comes to the rescue. Prime/ish takes a 3-digit input and will return the first prime number that contains that input. Our prayers have been answered!

This repo is the front-end code. To run the app locally, you will also need to clone the back-end code from https://github.com/dcschreck/prime-ish-server.

## Technical Specs

Prime/ish is built with the MERN stack; MongoDB, Express, React.js, and Node.js. Also added to this project are graphql-yoga (runs on top of Apollo's apollo-server-express), mongoose (connects to MongoDB database and allows us to run queries and mutations) and react-apollo (allows us to run GraphQL queries in React).

## How to Run App

Once the front-end and back-end repos have been cloned, start the server:

Note: if you already have MongoDB installed, go to number 1 below. If not, install MongoDB by first installing Homebrew. If you're on a Mac running above OS X 10.8, install Homebrew by typing `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` into your terminal. If you're running below 10.8 on your Mac or are on something else, go to https://brew.sh for instructions. Once Homebrew is installed, install MongoDB by running `brew install mongodb` in your terminal. Once installed, go to number 1 below.

1. In your terminal, navigate to the `server` file. Start MongoDB by typing:
  * `brew services start mongodb`

2. To start the server, type:
  * `node index.js`

3. Open a new terminal tab (keep the server-side running) and navigate to the `client` file. Start your React app by typing:
  * `npm start`

The React app should automatically open at http://localhost:3000. Queries and mutations can now be run. If you navigate to http://localhost:4000, you will see your GraphQL "Playground." Here you can run queries and mutations with or without running the front-end.  
