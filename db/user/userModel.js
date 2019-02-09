const Sequelize = require('sequelize');

const sequelize = new Sequelize('User', 'srosas', 'password123', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.sync({ logging: console.log }).then(() => {

});

const User = sequelize.define('users', {
  username: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true }
});
console.log('User', User)

module.exports = User;