const jwt = require('jsonwebtoken');

// ___________________________________________access secret key in environment variable
const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new Error('Incorrect login information');
};

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch(error) {
    return handleAuthError();
  }
  next();
}

module.exports = auth;