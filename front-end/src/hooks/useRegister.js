import { useState } from 'react';
import axios from 'axios';

const initialData = {};

export default function useRegister() {
  const [data, setData] = useState(initialData);

  async function setRegister(payload) {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/users/register',
        data: payload,
      });
      setData({ register: true });
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      setData(error.response.data);
    }
  }

  return [setRegister, data];
}
