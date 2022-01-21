const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const router = require('express').Router();
const { login, createUser, getCurrentUser } = require('../controllers/user');
const auth = require('../middleware/auth');

// ________________________function for email validation
const validateEmail = (string) => {
  if (!validator.isEmail(string)) {
    throw new Error('Invalid email');
  }
  return string;
};

// ROUTES_________________________________________________________________________ROUTES
router.use(requestLogger); // log all requests from following routes

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.get('/users/me', getCurrentUser);

router.get('*', () => {
  throw Error('Requested resource not found');
});

module.exports = router;