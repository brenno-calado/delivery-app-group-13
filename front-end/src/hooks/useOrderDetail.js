import axios from 'axios';

const useOrderDetail = () => {
  const setOrderDetail = async (token, setShoppingCart, id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:3001/sales/${id}`,
        headers: { Authorization: token },
      });
      const shoppingCart = response.data.products.map((product) => (
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.SaleProduct.quantity,
        }
      ));
      setShoppingCart(shoppingCart);
    } catch (error) {
      setShoppingCart(error.response);
    }
  };

  return [setOrderDetail];
};

export default useOrderDetail;
