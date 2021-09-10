import React from 'react';
import styled from 'styled-components';
import { Main } from '../atoms';
// import NavGroup from '../molecules/NavGroup';
// import UserGroup from '../molecules/UserGroup';
// import ProductsList from '../../components/organisms/ProductsList';
import NavBar from '../organisms/NavBar';
import { productsArrayPropTypes } from '../../utils/propTypes';
import CheckoutSelect from '../molecules/CheckoutSelect';

const CustomerCheckout = ({ className }) => (
  <>
    <NavBar />
    <Main className={ className }>
      <CheckoutSelect />
    </Main>
  </>
);

export default styled(CustomerCheckout)`
  margin: 10vh 0 10vh 0;
  padding: 0 0 100vh 0;
  display: grid;
  grid-template-rows: 10vh 90vh;
  padding: 3% 8%;
  /* grid-gap: 10px; */
  /* background-color: red; */
  height: 100%;
`;

CustomerCheckout.propTypes = productsArrayPropTypes;