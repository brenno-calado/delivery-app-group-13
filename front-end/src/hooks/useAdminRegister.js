import { useState } from 'react';
import axios from 'axios';

const initialData = {};

export default function useAdminRegister() {
  const [data, setData] = useState(initialData);

  async function setRegister(payload) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      await axios({
        headers: { Authorization: token },
        method: 'post',
        url: 'http://localhost:3001/users/register',
        data: payload,
      });
      setData({ register: true });
    } catch (error) {
      setData(error.response.data);
    }
  }

  return [setRegister, data];
}
