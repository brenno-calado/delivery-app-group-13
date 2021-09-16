import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useLogin();

  const History = useHistory();

  useEffect(() => {
    if (login.path) {
      History.push(login.path);
    }
  }, [login, History]);

  const buttonAble = () => {
    const MIN_CHARACTERS = 6;
    const check = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
    if (check && password.length >= MIN_CHARACTERS) {
      return true;
    }
    return false;
  };

  return (
    <div className="main">
      <img src="/logo192.png" alt="logotipo delivery-app" width="60px" />
      <h1>Delivery App</h1>
      <form className="form-login">
        <label htmlFor="input-email">
          Login
          <input
            type="email"
            id="input-email"
            autoComplete="on"
            data-testid="common_login__input-email"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>

        <label htmlFor="input-password">
          Senha
          <input
            type="password"
            id="input-password"
            autoComplete="on"
            data-testid="common_login__input-password"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>

        <button
          type="button"
          className="btn-primary"
          data-testid="common_login__button-login"
          disabled={ !buttonAble() }
          onClick={ () => setLogin({ email, password }) }
        >
          Login
        </button>
        <button
          type="button"
          className="btn-register"
          data-testid="common_login__button-register"
          onClick={ () => History.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      <div
        className={ login.message ? 'error-box' : 'hidden' }
        data-testid="common_login__element-invalid-email"
      >
        {login.message}
      </div>
    </div>
  );
};

export default Login;
