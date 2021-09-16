import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';
import useRegister from '../hooks/useRegister';
import useRegisterInputs from '../hooks/utils/useRegisterInputs';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setRegister, register] = useRegister();
  const [validInputs, validateInputs] = useRegisterInputs();

  const history = useHistory();

  useEffect(() => {
    if (register.register) {
      history.push('/customer/products');
    }
  }, [register, history]);

  useEffect(() => {
    if (name !== '' && email !== '' && password !== '') {
      validateInputs(name, email, password);
    }
  }, [name, email, password, validateInputs]);

  // const validateInputs = () => {
  //   const MIN_CHARACTERS_PASSWORD = 6;
  //   const MIN_CHARACTERS_NAME = 12;
  //   const check = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  //   if (name.length >= MIN_CHARACTERS_NAME
  //     && password.length >= MIN_CHARACTERS_PASSWORD
  //     && check) {
  //     return true;
  //   }
  //   return false;
  // };

  // const buttonAble = () => {
  //   if (validateInputs()) {
  //     return true;
  //   }
  //   return false;
  // };

  const handleRegister = () => {
    setRegister({ name, email, password, role: 'customer' });
  };

  return (
    <>
      <h4>Cadastro</h4>
      <form>
        <Input
          label="Nome"
          datatestid="common_register__input-name"
          onChange={ ({ target }) => setName(target.value) }
          value={ name }
        />
        <Input
          label="Email"
          datatestid="common_register__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
          value={ email }
        />
        <Input
          label="Password"
          datatestid="common_register__input-password"
          onChange={ ({ target }) => setPassword(target.value) }
          value={ password }
          type="password"
        />
        <Button
          label="CADASTRAR"
          datatestid="common_register__button-register"
          disabled={ !validInputs }
          onClick={ handleRegister }

        />
      </form>
      <span
        data-testid="common_register__element-invalid_register"
        className={ register.message ? 'error-box' : 'hidden' }
      >
        { register.message}
      </span>
    </>
  );
};

export default Register;
