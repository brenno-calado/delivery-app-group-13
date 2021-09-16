const { generateToken } = require('./utils/tokenValidate');
const { isValidLogin } = require('./utils/loginValidate');

const login = async (user) => {
  const userData = await isValidLogin(user);
  const token = generateToken(userData);
  const { name, email, role } = userData.dataValues;
  const result = { name, email, role, token };
  return result;
};

module.exports = {
  login,
};
