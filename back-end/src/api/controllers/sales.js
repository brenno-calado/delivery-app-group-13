const sales = require('../services/sales');

const getAll = async (req, res) => {
  const allSales = await sales.getAll();
  return res.status(201).send(allSales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const allSales = await sales.getById(id);
  return res.status(201).send(allSales);
};

const registerSale = async (req, res) => {
  console.log(req.body.data)
  const {address, addressNumber, sellerId, totalPrice, userEmail} = req.body.data;
  const newSaleId = await sales
    .registerSale({address, addressNumber, sellerId, totalPrice, userEmail});
  return res.status(201).json(newSaleId);
};


module.exports = {
  getAll,
  getById,
  registerSale,
};