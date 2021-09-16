import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import useAdminRegister from '../hooks/useAdminRegister';
import useRegisterInputs from '../hooks/utils/useRegisterInputs';

const Admin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [setRegister, register] = useAdminRegister();
  const [validInputs, validateInputs] = useRegisterInputs();

  useEffect(() => {
    if (name !== '' && email !== '' && password !== '' && role !== '') {
      validateInputs(name, email, password);
    }
  }, [name, email, password, role, validateInputs]);

  useEffect(() => {
    if (register.register) {
      setName('');
      setEmail('');
      setRole('seller');
      setPassword('');
    }
  }, [register.register]);

  function handleRegister() {
    setRegister({ name, email, password, role });
  }

  return (
    <div>
      <Header />
      <h3>Cadastrar novo usuário</h3>
      <form>
        <label htmlFor="userName">
          Nome
          <input
            id="userName"
            name="userName"
            placeholder="Nome e sobrenome"
            value={ name }
            data-testid="admin_manage__input-name"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="userEmail">
          Email
          <input
            id="userEmail"
            name="userEmail"
            placeholder="seu-email@site.com.br"
            data-testid="admin_manage__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="userPassword">
          Senha
          <input
            id="userPassword"
            name="userPassword"
            type="password"
            placeholder="●●●●●●"
            value={ password }
            data-testid="admin_manage__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <label htmlFor="userRole">
          Tipo
          <select
            id="userRole"
            name="userRole"
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option
              key="seller"
              value="seller"
              onClick={ ({ target }) => setRole(target.value) }
            >
              seller
            </option>
            <option
              key="customer"
              value="customer"
              onClick={ ({ target }) => setRole(target.value) }
            >
              customer
            </option>
            <option
              key="administrator"
              value="administrator"
              onClick={ ({ target }) => setRole(target.value) }
            >
              administrator
            </option>
          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ !validInputs }
          onClick={ handleRegister }
        >
          CADASTRAR
        </button>
      </form>
      { register.message && (
        <p data-testid="admin_manage__element-invalid-register">
          { register.message }
        </p>
      ) }
    </div>
  );
};

export default Admin;
