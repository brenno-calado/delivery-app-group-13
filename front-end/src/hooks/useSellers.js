import { useState, useEffect } from 'react';
import axios from 'axios';

const useSellers = () => {
  const [sellers, setDataSellers] = useState();

  useEffect(() => {
    const setSellers = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3001/users/sellers',
          headers: { Authorization: token },
        });
        setDataSellers(response.data);
      } catch (error) {
        console.log(error.response.data);
        setDataSellers(error.response.data);
      }
    };
    setSellers();
  }, []);

  return [sellers];
};

export default useSellers;
