import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/helpers';

// import useInfoUsers from '../hooks/useInfousers';

function TableOrderDetails(props) {
  const [orderDetails, setOrderDetails] = useState({});
  const { id, path } = props;

  const pageTestId = {
    '/customer/checkout': 'customer_checkout__',
    '/customer/orders': 'customer_order_details__',
    '/seller/orders': 'seller_order_details__',
  };

  const deliverystatuses = {
    '/customer/orders': ['delivery', 'MARCAR COMO ENTREGUE'],
    '/seller/orders': ['dispatch', 'SAIU PARA ENTREGA', 'preparing', 'PREPARAR PEDIDO'],
  };

  const dataTestId = pageTestId[path];

  const getOrderDetails = ((useCallback(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      method: 'get',
      url: `http://localhost:3001/sales/${id}`,
      headers: {
        Authorization: user.token,
      },
    };
    axios(config)
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.error('erro: ', error);
      });
  })));

  useEffect(() => {
    getOrderDetails();
  }, []);

  const { saleDate, status } = orderDetails;

  return (Object.keys(orderDetails).length === 0 ? <span>loading...</span> : (
    <>
      <h3>Detalhe do Pedido</h3>
      <table>
        <thead>
          <tr>
            <th
              data-testid={
                `${dataTestId}element-order-details-label-order-id`
              }
            >
              {`PEDIDO ${id}`}
            </th>
            <th
              data-testid={
                `${dataTestId}element-order-details-label-seller-name`
              }
            >
              {orderDetails.seller.name}
            </th>
            <th
              data-testid={
                `${dataTestId}element-order-details-label-order-date`
              }
            >
              {formatDate(saleDate)}
            </th>
            <th
              data-testid={
                `${dataTestId}element-order-details-label-delivery-status`
              }
            >
              {status}
            </th>
            { path.includes('seller') && (
              <button
                type="button"
                data-testid={
                  `${dataTestId}button-${deliverystatuses[path][2]}-check`
                }
              >
                {deliverystatuses[path][3]}
              </button>
            )}
            <button
              type="button"
              data-testid={
                `${dataTestId}button-${deliverystatuses[path][0]}-check`
              }
              disabled
            >
              {deliverystatuses[path][1]}
            </button>
          </tr>
        </thead>
      </table>
    </>));
}

TableOrderDetails.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default TableOrderDetails;
