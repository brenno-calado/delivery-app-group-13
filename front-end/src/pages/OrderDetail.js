import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../components/Header';
import CheckoutTable from '../components/CheckoutTable';
import TableOrderDetails from '../components/TableOrderDetails';
import useOrderDetail from '../hooks/useOrderDetail';
import Seller from '../context/sellerContext';
import Customer from '../context/customerContext';

const OrderDetail = () => {
  const { id } = useParams();
  const { token } = JSON.parse(localStorage.getItem('user'));
  const History = useHistory();
  const MAGIC_NUMBER = 3;
  const path = History.location.pathname.split('/')
    .filter((p, index) => index < MAGIC_NUMBER);
  const role = path[1];
  const { setShoppingCart } = useContext(role === 'seller' ? Seller : Customer);
  const [setOrderDetail] = useOrderDetail();

  useEffect(() => {
    setOrderDetail(token, setShoppingCart, id);
  }, []);

  return (
    <>
      <Header />
      <TableOrderDetails id={ id } path={ path.join('/') } />
      <CheckoutTable />
    </>
  );
};

export default OrderDetail;
