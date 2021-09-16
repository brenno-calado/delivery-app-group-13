import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, name, label, onChange, value, placeholder, type, datatestid }) => (
  <label htmlFor={ name }>
    { label }
    <input
      id={ id }
      data-testid={ datatestid }
      name={ name }
      onChange={ onChange }
      value={ value }
      placeholder={ placeholder }
      type={ type }
    />
  </label>
);

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  datatestid: PropTypes.string.isRequired,
};

Input.defaultProps = {
  placeholder: '',
  label: '',
  value: '',
  name: '',
  id: '',
  type: 'text',
  onChange: null,
};

export default Input;
