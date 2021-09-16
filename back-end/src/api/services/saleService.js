const { Sale, User, SaleProduct, Product } = require('../../database/models');
const { isValidSaleField } = require('./utils/saleValidate');
const { isValidToken } = require('./utils/tokenValidate');

const create = async (authorization, sale) => {
  isValidToken(authorization);
  
  const { products, email, ...newSale } = sale;
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;
  
  newSale.userId = userId;
  const result = await Sale.create(newSale);
  const saleId = result.dataValues.id;
  
  products.forEach(async ({ productId, quantity }) => SaleProduct.create(
    { saleId, productId, quantity },
  ));
  return { saleId };
};

const findAll = async (authorization) => {
  isValidToken(authorization);
  const result = await Sale.findAll();
  return result;
};

const findById = async (id, authorization) => {
  isValidToken(authorization);
  
  const result = await Sale.findByPk(id, {
    attributes: { exclude: ['userId', 'sellerId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: User, as: 'seller', attributes: { exclude: ['password'] } },
      { model: Product, as: 'products', through: { attributes: ['quantity'] } },
    ],
  });

  return result;
};

const updateStatus = async (sale, authorization) => {
  isValidToken(authorization);
  await isValidSaleField(sale);
  await Sale.update({ status: sale.status }, { where: { id: sale.id } });
  return { message: 'status updated successfully' };
};

module.exports = {
  create,
  findAll,
  findById,
  updateStatus,
};
