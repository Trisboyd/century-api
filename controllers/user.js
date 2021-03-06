const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// ____________________________________________access secret key in environment variable
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new Error('User does not exist');
    } else {
      res.send({ user });
    }
  })
  .catch(console.log(req), next);
}

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
  .then((hash) => User.create({ name, email, password: hash }))
  .then((user) => {
    if (!user) {
      throw new Error;
    }
    res.send({ _id: user._id, email: user.email });
  })
  .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password})
  .then((user) => {
    if (!user) {
      return 'Incorrect login information';
    }
    else {
      const token = jwt.sign({ _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.send(token);
    }
  })
  .catch(next);
};