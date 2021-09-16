const { BadRequest } = require('../../utils/httpStatus');

const isValidEmail = (email) => {
  if (email === '') {
    const error = { type: BadRequest, message: '"email" is not allowed to be empty' };
    throw error;
  }

  if (!email) {
    const error = { type: BadRequest, message: '"email" is required' };
    throw error;
  }

  const isValidEmailFormat = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!isValidEmailFormat) {
    const error = { type: BadRequest, message: '"email" must be a valid email' };
    throw error;
  }
  return true;
};

module.exports = isValidEmail;
