const express = require('express')

const Router = express.Router()

const categoryController = require('../controllers/Category')

Router.post('/createCategory',categoryController.createCategory);
Router.get('/getCategory',categoryController.getAllCategory);
Router.post('/deleteCategory',categoryController.deleteCategory);
Router.post('/updateCategory',categoryController.updateCategory);
Router.get('/categoryById/:postId',categoryController.getCategoryById);

module.exports = Router