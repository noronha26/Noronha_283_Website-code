const express=require('express');
// const multer=require('multer');
const multerUpload = require('../../middleware/multer');
const { createProduct, readProduct, updateProducts, deleteProduct } = require('../../controllers/controller');

const productRouter=express.Router();
// productRouter.use(multer().none());
productRouter.post('/create-product',multerUpload,createProduct);
productRouter.get('/read-product',multerUpload,readProduct);
productRouter.put('/updateProduct-status/:_id',updateProducts);
productRouter.delete('/delete-product/:_id', deleteProduct)

module.exports=productRouter;
