const express = require('express');

const Router = express.Router();

const productController = require('../controllers/Product');

Router.get('/allProduct',productController.getAllProducts);
Router.get('/productById/:postId',productController.getProductById);

Router.post('/createProduct',productController.createProducts); 
Router.post('/updateProduct',productController.updateProduct);
Router.post('/deleteProduct',productController.deleteProduct);

module.exports = Router 