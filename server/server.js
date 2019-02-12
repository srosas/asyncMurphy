const esprima = require('esprima');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./../webpack.config.js');
const http = require('http');
const path = require('path');


const compiler = webpack(config);

// const sequelize = require('sequelize')

const userController = require('./../db/user/userController');
const sessionController = require('./session/sessionController');
const cookieController = require('./util/cookieController');

const app = express();
const server = http.createServer(app);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

// /////////////////////////////
// connect to Postgres database here
// //////////////////////////

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//Render to index file

// Render to index file
app.get('/', cookieController.setCookie, (req, res) => {
  res.render('./../client/index');
});

// Render to signup page
app.get('/signup', (req, res) => {
  res.render('./src/signup', { error: null });
});

//Post to signup page
app.post('/signup', userController.createUser);

//Post to login page
app.post('/login', userController.verifyUser);

//able to see only if logged in
app.get('/isLoggedin', (req, res) => {
  userController.getAllUsers((err, users) => {
    if (err) throw err;
    res.render('./../client/isLoggedIn', { users: users });
  });
});

// Oauth process
// app.get('/oauth', (req, res) => {
//   const code = req.query.code;
//   // const clientID = add client ID;
//   // const secret = add client secret;

//   request.post(
//     `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${secret}&code=${code}`,

//     (err, response) => {
//       const url = `https://api.github.com/user?${response.body}`;

//       const options = {
//         url,
//         headers: {
//           'User-Agent': 'request',
//           Accept: 'application/vnd.github.v3+json'
//         }
//       };

//       request.get(options, (error, data) => {
//         console.log(data);
//       });
//     }
//   );
// });
function parse(input) {
  return input.match(/setTimeout\((.*)\,(.*)\)/);
}

app.post('/parse', (req, res) => {
  const { program } = req.body;
  const result = parse(program);
  res.json(result);
});

server.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

module.exports = server;
