const express = require('express');

const Router = express.Router();

const authController = require('../controllers/Auth');

Router.post('/register',authController.register);
Router.get('/allUser',authController.getAllUser);
Router.post('/login',authController.login);

module.exports = Router;

