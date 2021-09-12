import paths from '../routes/paths';
import testIds from './testIds';

const pageItems = {
  customer: {
    navItems: [
      {
        text: 'Produtos',
        testId: testIds.id11,
        path: paths.customer.products,
      },
      {
        text: 'Meus pedidos',
        testId: testIds.id12,
        path: paths.customer.orders,
      },
    ],
  },
  seller: {
    navItems: [
      {
        text: 'Pedidos',
        testId: testIds.id12,
        path: paths.seller.orders,
      },
    ],
  },
  administrator: {},
};

export default (role) => pageItems[role];
