const express=require('express');
const { activeProductCategoriesWeb } = require('../../controllers/controller');

const productCatoryRouterWeb=express.Router();


productCatoryRouterWeb.get('/active-categories',activeProductCategoriesWeb)


module.exports=productCatoryRouterWeb;