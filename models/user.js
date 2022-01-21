const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false,
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  stocks: {
    type: Object,
  }
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject('This user does not exist');
    }
    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) {
        return Promise.reject('Incorrect password');
      }
      return user;
    })
  })
}

module.exports = mongoose.model('User', userSchema);