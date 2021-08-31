import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Seller/Navbar';
import { LoginContext } from '../../context/LoginContext';
import { getSalesBySeller } from '../../services/api';

const route = 'seller_orders';

function Orders() {
  const { apiResponse } = useContext(LoginContext);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const response = await getSalesBySeller(apiResponse.id);
      setSales(response);
    };

    getSales();
  }, [apiResponse.id]);

  return (
    <>
      <Navbar name={ apiResponse.name } />
      <section>
        <h1>PEDIDOS</h1>
        { sales && sales.map((sale) => (
          <div key={ sale.id }>
            <Link to={ `/seller/orders/${sale.id}` }>
              <p data-testid={ `${route}__element-order-id-${sale.id}` }>
                {`Pedido ${sale.id}`}
              </p>
              <p data-testid={ `${route}__element-delivery-status-${sale.id}` }>
                {sale.status}
              </p>
              <p data-testid={ `${route}__element-order-date-${sale.id}` }>
                {sale.saleDate}
              </p>
              <p data-testid={ `${route}__element-card-price-${sale.id}` }>
                {`R$ ${sale.totalPrice}`}
              </p>
              <p data-testid={ `${route}__element-card-address-${sale.id}` }>
                {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
              </p>
            </Link>
          </div>
        )) }
      </section>
    </>
  );
}

export default Orders;
