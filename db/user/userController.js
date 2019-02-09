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
  User.create(req.body, (err, response) => {
    console.log('response', response)
    console.log('err', err);
    if (err) return res.render(__dirname + './../../client/signup');
    //req.locals = { currUser: response };

    res.status(200).json(response);
    //res.redirect('/isLoggedin');
  })
};

userController.verifyUser = (req, res, next) => {
  User.find({ username: req.body.username }, (err, data) => {
    if (data.length === 0) return res.redirect('/signup');

    const pwMatch = bcrypt.compareSync(req.body.password, data[0].password);

    if (pwMatch && data[0].username === req.body.username) {
      req.locals = { currUser: data[0] };
      next();
    } else {
      res.redirect('/signup');
    }
  });
};

module.exports = userController;
