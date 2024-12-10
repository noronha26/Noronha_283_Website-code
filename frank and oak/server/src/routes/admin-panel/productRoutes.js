const express=require('express');
// const multer=require('multer');
const multerUpload = require('../../middleware/multer');
const { createProduct, readProduct, updateProducts, deleteProduct, deleleProducts, readProducts, updateProductProduct } = require('../../controllers/controller');

const productRouter=express.Router();
// productRouter.use(multer().none());
productRouter.post('/create-product',multerUpload,createProduct);
productRouter.get('/read-product',multerUpload,readProduct);
productRouter.put('/updateProduct-status/:_id',updateProducts);
productRouter.delete('/delete-product/:_id', deleteProduct);
productRouter.put('/delete-products',deleleProducts);
productRouter.get('/read-products/:_id',multerUpload,readProducts);
productRouter.put('/updateProduct-Product/:_id',multerUpload, updateProductProduct);
module.exports=productRouter;
