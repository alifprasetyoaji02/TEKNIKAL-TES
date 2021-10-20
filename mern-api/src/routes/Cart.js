const express = require('express')

const Router = express.Router()

const cartController = require('../controllers/Cart')

Router.post('/addCart',cartController.insertCart);
Router.get('/getCart/:userId',cartController.getCartByUserId);
 
module.exports = Router;
