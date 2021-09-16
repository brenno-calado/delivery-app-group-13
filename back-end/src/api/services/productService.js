const { Product } = require('../../database/models');
const { isValidToken } = require('./utils/tokenValidate');

const findAll = async (authorization) => {
  isValidToken(authorization);
  const result = await Product.findAll();
  return result;
};

module.exports = {
  findAll,
};
