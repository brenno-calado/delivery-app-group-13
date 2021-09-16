const md5 = require('md5');
const { User } = require('../../database/models');
const { generateToken, isValidToken } = require('./utils/tokenValidate');
const { isValidUserFields } = require('./utils/userValidate');

const create = async (user) => {
  await isValidUserFields(user);
  const hashPassword = md5(user.password);
  const newUser = { ...user, password: hashPassword };
  
  const userData = await User.create(newUser);
  const token = generateToken(userData.dataValues);
  const { name, email, role } = userData.dataValues;
  const result = { name, email, role, token };
  return result;
};

const getSellers = async (authorization) => {
  isValidToken(authorization);
  const result = User.findAll({ where: { role: 'seller' } });
  return result;
};

module.exports = {
  create,
  getSellers,
};
