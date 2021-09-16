import React from 'react';
import Header from '../components/Header';
import CheckoutTable from '../components/CheckoutTable';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = () => (
  <>
    <Header />
    <h2>Finalizar Pedido</h2>
    <CheckoutTable />
    <h3>Detalhes e Endereço para Entrega</h3>
    <CheckoutForm />
  </>
);

export default Checkout;
