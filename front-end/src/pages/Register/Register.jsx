import React, { useState } from 'react';
import api from '../../service/axiosApi';

function Register() {
  const [input, setInput] = useState({});

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    const data = input;

    // console.log(data);
    // api.post('/register', data);

    api.post('/register', data)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    console.log('click!');
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Seu nome"
            onChange={ handleInputChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            placeholder="seu-email@site.com"
            onChange={ handleInputChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            onChange={ handleInputChange }
          />
        </label>
        <button type="submit" onClick={ handleInputSubmit }>Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;