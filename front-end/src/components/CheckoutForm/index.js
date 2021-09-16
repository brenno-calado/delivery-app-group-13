import React, { useState, useContext } from 'react';
import useOrder from '../../hooks/useOrder';
import useSellers from '../../hooks/useSellers';
import Customer from '../../context/customerContext';

const CheckoutForm = () => {
  const { token, email } = JSON.parse(localStorage.getItem('user'));
  const {
    shoppingCart,
  } = useContext(Customer);

  const [setOrder] = useOrder();
  const [sellers] = useSellers();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellerId, setSellerId] = useState('');
  return (
    !sellers ? <span>Loading...</span> : (
      <form
        className="main form-login"
        onSubmit={ (e) => {
          e.preventDefault();
          setOrder({
            email,
            deliveryAddress,
            deliveryNumber,
            sellerId,
            totalPrice: shoppingCart.reduce(
              ((acc, curr) => acc + ((+curr.price) * curr.quantity)), 0,
            ),
            products: shoppingCart
              .map(({ name, urlImage, price, ...product }) => (
                { productId: product.id, quantity: product.quantity })),
            token,
          });
        } }
      >
        <label htmlFor="sellerId">
          P. Vendedora Responsável
          <select
            id="sellerId"
            data-testid="customer_checkout__select-seller"
            name="sellerId"
            value={ sellerId }
            onChange={ ({ target: { value } }) => setSellerId(value) }
          >
            <option>Selecione uma opção</option>
            {sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>
                {seller.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="deliveryAddress">
          Endereço
          <input
            id="deliveryAddress"
            name="deliveryAddress"
            data-testid="customer_checkout__input-address"
            value={ deliveryAddress }
            onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
          />
        </label>
        <label htmlFor="deliveryNumber">
          Número
          <input
            type="number"
            id="deliveryNumber"
            name="deliveryNumber"
            data-testid="customer_checkout__input-addressNumber"
            value={ deliveryNumber }
            onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
          />
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          className="btn-primary"
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    )
  );
};

export default CheckoutForm;
