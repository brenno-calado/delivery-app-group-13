const routes = require('express').Router();
const rescue = require('express-rescue');
const logins = require('./controllers/loginController');
const users = require('./controllers/userController');
const products = require('./controllers/productController');
const images = require('./controllers/imageController');
const sales = require('./controllers/saleController');

routes.post('/login', rescue(logins.login));

routes.post('/users/register', rescue(users.create));
routes.get('/users/sellers', rescue(users.getSellers));

routes.get('/products', rescue(products.findAll));
routes.get('/images/:image', rescue(images.getImage));

routes.post('/sales', rescue(sales.create));
routes.get('/sales', rescue(sales.findAll));
routes.get('/sales/:id', rescue(sales.findById));
routes.put('/sales/status', rescue(sales.updateStatus));

module.exports = routes;