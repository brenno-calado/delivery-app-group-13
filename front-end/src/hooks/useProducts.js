import { useState } from 'react';
import axios from 'axios';

const useProducts = () => {
  const [products, setProductList] = useState([]);

  const setProducts = async (token) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3001/products',
        headers: { Authorization: token },
      });
      setProductList(response.data);
    } catch (error) {
      setProductList(error.response.data);
    }
  };

  return [products, setProducts];
};

export default useProducts;
