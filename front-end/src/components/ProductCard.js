import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Customer from '../context/customerContext';

const ProductCard = ({ product }) => {
  const { shoppingCart, setShoppingCart } = useContext(Customer);
  const [negativeNumError, setNegativeNumError] = useState(false);
  const negativeNumErrorMsg = 'Quantity must be greater than zero';

  useEffect(() => {
    const foundProduct = shoppingCart.find((cartItem) => cartItem.id === product.id);
    const quantityInput = document.getElementById(`quantity-${product.id}`);
    if (foundProduct) {
      quantityInput.value = foundProduct.quantity;
    } else {
      quantityInput.value = 0;
    }
  }, [product.id, shoppingCart]);

  const priceWithComma = `${(Math.round(product.price * 100) / 100).toFixed(2)}`
    .split('.').join(',');

  function handleQuantityBtn(e, action) {
    setNegativeNumError(false);
    e.preventDefault();
    const { id, name, price, urlImage } = product;
    const quantityInput = document.getElementById(`quantity-${id}`);
    const currentQuantity = Number(quantityInput.value) || 0;
    let newQuantity = currentQuantity;
    if (action === 'add') {
      newQuantity = currentQuantity + 1;
    }
    if (action === 'remove' && currentQuantity >= 1) {
      newQuantity = currentQuantity - 1;
    }
    quantityInput.value = newQuantity;
    const prod = {
      id,
      name,
      price,
      urlImage,
      quantity: newQuantity,
    };
    const cart = shoppingCart.filter((item) => item.id !== id);
    cart.push(prod);
    setShoppingCart(cart);
  }

  function handleQuantityInput(e) {
    setNegativeNumError(false);
    const { id, name, price, urlImage } = product;
    const currentQuantity = e.target.value;
    if (currentQuantity < 0) {
      setNegativeNumError(true);
      return false;
    }
    const prod = {
      id,
      name,
      price,
      urlImage,
      quantity: currentQuantity,
    };
    const cart = shoppingCart.filter((item) => item.id !== id);
    cart.push(prod);
    setShoppingCart(cart);
  }

  return (
    <div className="productCard">
      <p
        className="price"
        data-testid={ `customer_products__element-card-price-${product.id}` }
      >
        { priceWithComma }
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        src={ product.urlImage }
        alt={ product.name }
        height="150px"
      />
      <div className="productHeader">
        <p data-testid={ `customer_products__element-card-title-${product.id}` }>
          { product.name }
        </p>
        <div className="quantityBtn">
          <button
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            type="button"
            onClick={ (e) => handleQuantityBtn(e, 'remove') }
          >
            -
          </button>
          <input
            className="quantityInput"
            id={ `quantity-${product.id}` }
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
            type="number"
            min="0"
            onChange={ handleQuantityInput }
          />
          <button
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            type="button"
            onClick={ (e) => handleQuantityBtn(e, 'add') }
          >
            +
          </button>
        </div>
        <p className="quantityError">
          { negativeNumError && negativeNumErrorMsg }
        </p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape(PropTypes.string),
}.isRequired;

export default ProductCard;
