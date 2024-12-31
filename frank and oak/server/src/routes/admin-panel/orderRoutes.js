const express=require('express');
// const multer =require('multer');
const { createOrder, readorder, deleteOrders} = require('../../controllers/controller');
const multerUpload = require('../../middleware/multer');

const orderRouter=express.Router();
// orderRouter.use(multer().none());
orderRouter.post('/create-order',multerUpload, createOrder);
orderRouter.get('/read-order',readorder);
orderRouter.put('/delete-orders',deleteOrders),



module.exports=orderRouter;