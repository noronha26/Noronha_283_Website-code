const express=require('express');
// const multer=require('multer');
const { createProductCategory, readProductCategories, 
    updateProductCategoryStatus, deleteProductCategory, 
    deleteProductCategories,
    readProductCategory,
    updateProduct,
    productcategorieByParentCategory} = require('../../controllers/controller');

const multerUpload = require('../../middleware/multer');



const productCategoryRouter=express.Router();
// productCategoryRouter.use(multer().none());

productCategoryRouter.post('/create-category',multerUpload, createProductCategory);
productCategoryRouter.get('/read-categories',readProductCategories);
productCategoryRouter.put('/update-product-status/:_id',updateProductCategoryStatus)
productCategoryRouter.delete('/delete-productCategory/:_id',deleteProductCategory);
productCategoryRouter.put('/delete-productCategories',deleteProductCategories);
productCategoryRouter.get('/read-category/:_id',readProductCategory);
productCategoryRouter.put('/update-product/:_id',multerUpload,updateProduct);
productCategoryRouter.get('/category-by-parent-category/:parent_category',productcategorieByParentCategory)


module.exports=productCategoryRouter;