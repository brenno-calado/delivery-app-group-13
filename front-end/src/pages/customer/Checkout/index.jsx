import React from 'react';
import { Link } from 'react-router-dom';

import DescriptionsBar from '../../../components/DescriptionsBar';
import Navbar from '../../../components/Navbar';
import PrimaryButton from '../../../components/PrimaryButton';
import Input from '../../../components/Input';
import GridOrderDetails from '../../../components/GridOrderDetails';

import useGlobalContext from '../../../context/GlobalStateProvider';

import style from './checkout.module.scss';

const Checkout = () => {
  const { totalPrice, setCartQuantity, cartQuantity } = useGlobalContext();
  const id = 1;

  const onClickRemoveItem = (itemId) => {
    const one = 1;
    const index = cartQuantity.findIndex((item) => item.id === itemId);
    if (index !== -one) {
      const newItems = [...cartQuantity];
      newItems.splice(index, 1);
      setCartQuantity(newItems);
    }
  };

  return (
    <>
      <Navbar />
      <h1>Finalizar Pedido</h1>
      <div className={ style.totalContainer }>
        <GridOrderDetails shouldRemoveItemApear />
        <div className={ style.barContainer }>
          {JSON.parse(localStorage.getItem('cart'))
          && JSON.parse(localStorage.getItem('cart')).map((
            { id: itemId, description, quantity, price }, index,
          ) => {
            const intPrice = parseFloat(price.replace(',', '.'));
            const multPrice = parseFloat(quantity) * intPrice;
            const totPrice = (Math.round(multPrice * 100) / 100).toFixed(2);
            const toStringNumber = totPrice.toString().replace('.', ',');

            // return (
            //   <div key={ itemId } className={ gridStyle }>
            //     <span
            //       className={ style.firstGrid }
            //       data-testid={
            //         `customer_checkout__element-order-table-item-number-${index}`
            //       }
            //     >
            //       { id + 1 }

            //     </span>
            //     <span
            //       className={ style.secondGrid }
            //       data-testid={ `customer_checkout__element-order-table-name-${index}` }
            //     >
            //       { userOrProductName }
            //     </span>
            //     <span
            //       className={ style.thirdGrid }
            //       data-testid={
            //         `customer_checkout__element-order-table-quantity-${index}`
            //       }
            //     >
            //       { emailOrQuantity }
            //     </span>
            //     <span
            //       className={ style.fourthGrid }
            //       data-testid={
            //         `customer_checkout__element-order-table-unit-price-${index}`
            //       }
            //     >
            //       { userTypeOrValue }
            //     </span>
            //     <span
            //       className={ style.fifthGrid }
            //       data-testid={
            //         `customer_checkout__element-order-table-sub-total-${index}`
            //       }
            //     >
            //       { deleteOrPrice }
            //     </span>
            //     { shouldDeleteApear && (
            //       <div className={ style.sixthGrid }>
            //         <button
            //           type="button"
            //           onClick={ () => removeItem(itemId) }
            //           data-testid={
            //             `customer_checkout__element-order-table-remove-${index}`
            //           }
            //         >
            //           Remover
            //         </button>
            //       </div>
            //     ) }
            //   </div>
            // );
            return (<DescriptionsBar
              key={ Math.random() }
              id={ index }
              itemId={ itemId }
              userOrProductName={ description }
              emailOrQuantity={ quantity }
              userTypeOrValue={ price }
              deleteOrPrice={ toStringNumber }
              shouldDeleteApear
              dataTestIdId={
                `customer_checkout__element-order-table-item-number-${index}`
              }
              removeItem={ onClickRemoveItem }
              dataTestIdUserOrProductName={
                `customer_checkout__element-order-table-name-${index}`
              }
              dataTestIdEmailOrQuantity={
                `customer_checkout__element-order-table-quantity-${index}`
              }
              dataTestIdUserTypeOrValue={
                `customer_checkout__element-order-table-unit-price-${index}`
              }
              dataTestIdDeleteOrPrice={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
              dataTestIdRemove={
                `customer_checkout__element-order-table-remove-${index}`
              }
            />);
          })}
        </div>
        <PrimaryButton>
          Total: R$
          {' '}
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            {totalPrice}
          </span>
        </PrimaryButton>
      </div>
      <h2>Detalhes e Endereço para a Entrega</h2>

      <form className={ style.formDataContainer }>
        <label htmlFor="orderData">
          P. Vendedora Responsável
          <select data-testid="customer_checkout__select-seller" id="orderData">
            <option value="Fulana1">Fulana1</option>
            <option value="Fulana2">Fulana2</option>
            <option value="Fulana3">Fulana3</option>
            <option value="Fulana4">Fulana4</option>
          </select>
        </label>
        <Input
          labelDescription="Endereço"
          dataTestId="customer_checkout__input-address"
        />
        <Input
          labelDescription="Número"
          dataTestId="customer_checkout__input-addressNumber"
        />
        <div className={ style.checkoutButton }>
          <Link to={ `/customer/orders/${id}` }>
            <PrimaryButton
              dataTestId="customer_checkout__button-submit-order"
            >
              FINALIZAR PEDIDO
            </PrimaryButton>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Checkout;