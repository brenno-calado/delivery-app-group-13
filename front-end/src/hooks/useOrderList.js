import axios from 'axios';
import { useEffect, useState } from 'react';

const useOrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getOrderList = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3001/sales',
          headers: { Authorization: token },
        });
        setOrderList(response.data);
      } catch (error) {
        setOrderList(error.response);
      }
    };
    getOrderList();
  }, []);
  return [orderList];
};

export default useOrderList;
