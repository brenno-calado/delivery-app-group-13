const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');
const salesServices = require('../services/sales');

const create = async (req, res, next) => {
  try {
    const sale = req.body;
    const { login } = req;
    const newSale = await salesServices.create(sale, login);

    return res.status(CREATED_STATUS).json(newSale);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sale = await salesServices.getById(id);

    return res.status(OK_STATUS).json(sale);
  } catch (err) {
    next(err);
  }
};

const getByUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const sale = await salesServices.getByUser(id);
    return res.status(OK_STATUS).json(sale);
  } catch (err) {
    next(err);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const sale = await salesServices.getAllSales();
    return res.status(OK_STATUS).json(sale);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getById,
  getByUser,
  getAllSales,
};