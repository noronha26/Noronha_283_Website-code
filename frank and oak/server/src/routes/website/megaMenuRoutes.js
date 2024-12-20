const express=require('express');
const { activeMegaMenuWeb } = require('../../controllers/controller');

const megaMenuRouterWeb=express.Router();


megaMenuRouterWeb.get('/activeMegaMenu',activeMegaMenuWeb)


module.exports= megaMenuRouterWeb;