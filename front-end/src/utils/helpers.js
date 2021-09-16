import moment from 'moment';

const formatDate = (saleDate) => {
  const date = new Date(saleDate);
  return moment(date).format('DD/MM/YYYY');
};

const formatCurrency = (totalPrice) => Number(totalPrice)
  .toLocaleString('pt-br', { minimumFractionDigits: 2 });

export {
  formatDate,
  formatCurrency,
};
