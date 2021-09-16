import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Seller from './sellerContext';

function SellerProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState([]);

  const data = {
    shoppingCart,
    setShoppingCart,
  };
  return (
    <Seller.Provider value={ data }>
      {children}
    </Seller.Provider>
  );
}

SellerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SellerProvider;
