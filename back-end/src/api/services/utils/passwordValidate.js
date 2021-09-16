const { BadRequest } = require('../../utils/httpStatus');

const isValidPassword = (password) => {
  if (password === '') {
    const error = { type: BadRequest, message: '"password" is not allowed to be empty' };
    throw error;
  }

  if (!password) {
    const error = { type: BadRequest, message: '"password" is required' };
    throw error;
  }

  const isValidPasswordFormat = /[0-9a-zA-Z$*&@#_]{6}/.test(password);
  if (!isValidPasswordFormat) {
    const error = { type: BadRequest, message: '"password" length must be 6 characters long' };
    throw error;
  }
  return true;
};

module.exports = isValidPassword;
