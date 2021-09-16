import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [firstNavBarLink, setFirstNavBarLink] = useState(false);
  const [secondNavBarLink, setSecondNavBarLink] = useState('');
  const [secondNavBarText, setSecondNavBarText] = useState('');
  const match = useRouteMatch();
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/login');
  }

  function renderFirstNavBarLink() {
    return (
      <Link
        className="noUnderline"
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </Link>
    );
  }

  useEffect(() => {
    if (match.path.includes('admin')) {
      setSecondNavBarText('GERENCIAR USUÁRIOS');
      setSecondNavBarLink('/admin/manage');
    } else if (match.path.includes('seller')) {
      setSecondNavBarText('PEDIDOS');
      setSecondNavBarLink('/seller/orders');
    } else {
      setSecondNavBarText('MEUS PEDIDOS');
      setFirstNavBarLink(true);
      setSecondNavBarLink('/customer/orders');
    }
  }, [match.path]);

  return (
    <div className="navBar">
      <div className="leftHeader">
        { firstNavBarLink && renderFirstNavBarLink() }
        <Link
          className="noUnderline"
          to={ secondNavBarLink }
          data-testid="customer_products__element-navbar-link-orders"
        >
          { secondNavBarText }
        </Link>

      </div>
      <div className="rightHeader">
        <p data-testid="customer_products__element-navbar-user-full-name">
          { user.name || null }
        </p>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Header;
