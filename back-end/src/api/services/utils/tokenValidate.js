require('dotenv').config();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../../utils/httpStatus');

const getJwtEvaluationKey = () => {
  const jwtEvaluationKey = path.resolve(__dirname, '..', '..', '..', '..', 'jwt.evaluation.key');
  let result = fs.readFileSync(jwtEvaluationKey, 'utf8');
  result = result.replace('\n', '');
  return result;
};
const secret = getJwtEvaluationKey();

const generateToken = (userData) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const { id, password, ...payload } = userData;
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const isValidToken = (authorization) => {
  try {
    if (!authorization) {
      const error = { type: Unauthorized, message: 'Token not found' };
      // console.log('caiu aqui no if');
      throw error;
    }
    const userData = jwt.verify(authorization, secret);
    // console.log(authorization);
    return userData;
  } catch (error) {
    const err = { type: Unauthorized, message: 'Expired or invalid token' };
    throw err;
  }
};

module.exports = {
  generateToken,
  isValidToken,
};
