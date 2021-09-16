import { useState } from 'react';

export default function useRegisterInputs() {
  const [validInputs, setValidInputs] = useState(false);
  const validateInputs = (name, email, password) => {
    const MIN_CHARACTERS_PASSWORD = 6;
    const MIN_CHARACTERS_NAME = 12;
    const check = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
    if (name.length >= MIN_CHARACTERS_NAME
      && password.length >= MIN_CHARACTERS_PASSWORD
      && check) {
      setValidInputs(true);
    } else {
      setValidInputs(false);
    }
  };
  return [validInputs, validateInputs];
}
