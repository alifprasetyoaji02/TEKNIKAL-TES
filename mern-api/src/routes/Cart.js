const express = require('express')

const Router = express.Router()

const cartController = require('../controllers/Cart')

Router.post('/addCart',cartController.insertCart);
Router.post('/getCart',cartController.getCartByUserId);

module.exports = Router;
