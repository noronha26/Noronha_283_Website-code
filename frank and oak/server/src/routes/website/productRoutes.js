const express =require('express');
const { activeproductsByParentCategory } = require('../../controllers/controller');

const productRouterWeb=express.Router();
productRouterWeb.get('/active-products/:parent_category',activeproductsByParentCategory)

module.exports= productRouterWeb;