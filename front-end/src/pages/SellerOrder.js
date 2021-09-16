import React, { } from 'react';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';
import useOrderList from '../hooks/useOrderList';

const SellerOrder = () => {
  const [orderList] = useOrderList([]);
  if (!orderList) return <h1>Loading...</h1>;
  return (
    <div>
      <Header />
      <OrderCard orderList={ orderList } />
    </div>
  );
};

export default SellerOrder;
