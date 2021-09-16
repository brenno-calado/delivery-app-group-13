import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function useOrder() {
  const History = useHistory();
  const [order, setOrderData] = useState({});

  async function setOrder(payload) {
    const { token, ...data } = payload;
    console.log(data);
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/sales',
        headers: { Authorization: token },
        data,
      });
      setOrderData(response.data);
    } catch (error) {
      setOrderData(error.response);
    }
  }

  useEffect(() => {
    if (order.saleId) {
      History.push(`/customer/orders/${order.saleId}`);
    }
  });

  return [setOrder];
}
