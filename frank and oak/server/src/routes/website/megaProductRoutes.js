const express=require('express');
const { activeMenusByProductCategory } = require('../../controllers/controller');

const megaProductRouterWeb=express.Router();

megaProductRouterWeb.get('/megaActive-products/:parent_category', activeMenusByProductCategory);

module.exports=megaProductRouterWeb;