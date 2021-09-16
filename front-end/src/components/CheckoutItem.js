import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Customer from '../context/customerContext';
import Seller from '../context/sellerContext';

export default function CheckoutItem({ product, index, role, page }) {
  const { shoppingCart, setShoppingCart } = useContext(
    role === 'customer' ? Customer : Seller,
  );

  const dataTest = role === 'customer' ? 'customer_checkout' : 'seller_order_details';

  const removeProduct = () => {
    const newCart = shoppingCart.filter((item, listIndex) => listIndex !== index);
    setShoppingCart(newCart);
  };

  const {
    name,
    quantity,
    price,
  } = product;
  return (
    <tr>
      <td
        className="secondary grow-1"
        data-testid={ `${dataTest}__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        className="light-background grow-3"
        data-testid={ `${dataTest}__element-order-table-name-${index}` }
      >
        { name }
      </td>
      <td
        className="primary grow-1"
        data-testid={ `${dataTest}__element-order-table-quantity-${index}` }
      >
        { quantity }
      </td>
      <td
        className="ternary grow-1"
        data-testid={ `${dataTest}__element-order-table-unit-price-${index}` }
      >
        R$
        { `${(Math.round(price * 100) / 100).toFixed(2)}`
          .split('.').join(',') }
      </td>
      <td
        className="quaternary grow-1"
        data-testid={ `${dataTest}__element-order-table-sub-total-${index}` }
      >
        R$
        { `${(Math.round((price * quantity) * 100) / 100).toFixed(2)}`
          .split('.').join(',') }
      </td>
      { page === 'checkout' && (
        <td>
          <button
            className="secondary grow-1"
            type="button"
            onClick={ removeProduct }
            data-testid={ `${dataTest}__element-order-table-remove-${index}` }
          >
            Remover
          </button>
        </td>
      ) }
    </tr>
  );
}

CheckoutItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    price: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
