const express=require('express');
const { createCart, readCart, deleteCart, updateCartQuantity } = require('../../controllers/controller');

const cartRouter=express.Router();

cartRouter.post('/create-cart',createCart);
cartRouter.get('/read-cart/:user',readCart);
cartRouter.delete('/deleteCart/:_id',deleteCart);
cartRouter.put('/update-cart/:_id',updateCartQuantity)
module.exports=cartRouter;
