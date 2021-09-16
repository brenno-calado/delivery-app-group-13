import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Customer from './customerContext';

function CustomerProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState([]);

  const [sellers, setSellers] = useState([]);

  const [customer, setCustomer] = useState({});

  const data = {
    customer,
    setCustomer,
    shoppingCart,
    setShoppingCart,
    sellers,
    setSellers,
  };
  return (
    <Customer.Provider value={ data }>
      {children}
    </Customer.Provider>
  );
}

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomerProvider;
