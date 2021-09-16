const products = require('../services/productService');

const findAll = async (req, res) => {
const { authorization } = req.headers;
  const result = await products.findAll(authorization);
  return res.status(200).json(result);
};

module.exports = {
  findAll,
};
