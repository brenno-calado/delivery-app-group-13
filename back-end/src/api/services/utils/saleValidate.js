const { Sale } = require('../../../database/models');
const { BadRequest, NotFound } = require('../../utils/httpStatus');

const validStatus = {
  Pendente: 'Pendente',
  Preparando: 'Preparando',
  'Em Trânsito': 'Em Trânsito',
  Entregue: 'Entregue',
};

const isValidStatus = (status) => {
  if (status === '') {
    const error = { type: BadRequest, message: '"status" is not allowed to be empty' };
    throw error;
  }

  if (!status) {
    const error = { type: BadRequest, message: '"status" is required' };
    throw error;
  }

  if (!validStatus[status]) {
    const validKeys = `${Object.keys(validStatus)}`;
    const error = { type: BadRequest, message: { error: 'invalid status', validKeys },
    };
    throw error;
  }
  return true;
};

const isValidId = async (id) => {
  const idExists = await Sale.findOne({ where: { id } });

  if (!idExists) {
    const error = { type: NotFound, message: 'id not found' };
    throw error;
  } 
  return true;
};

const isValidSaleField = async (sale) => {
  isValidStatus(sale.status);
  await isValidId(sale.id);
};

module.exports = {
  isValidSaleField,
};