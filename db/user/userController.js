const User = require('./userModel');
//const cookieController = require('./../util/cookieController');
//const sessionController = require('./../session/sessionController');
const bcrypt = require('bcryptjs');
const userController = {};

userController.getAllUsers = (next) => {
  User.find({}, next);
};

userController.createUser = (req, res, next) => {
  console.log('in create user', req.body);
  User.create(req.body)
    .then(response => {
      //if (err) return res.render(__dirname + './../../client/signup');
      req.locals = { currUser: response };
      res.send(response[0].dataValues);
      //res.redirect('/isLoggedin');
    })
};

userController.verifyUser = (req, res, next) => {
  console.log('req.body', req.body)
  User.findOne({ where: { username: req.body.username } })
    .then(data => {
      console.log('data', data.dataValues.username)
      if (data.dataValues.username.length === 0) return res.redirect('/signup');

      if (data.dataValues.username === req.body.username) {
        req.locals = { currUser: data.dataValues.username };
        res.send("received");
      } else {
        res.redirect('/signup');
      }
    });
};

module.exports = userController;
