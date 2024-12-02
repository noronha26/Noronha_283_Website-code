const express=require('express');
const parentCategoryRouter = require('./admin-panel/parentCategoryRoutes');
const parentSizeRouter = require('./admin-panel/parentSizeRouter');
const parentColorRouter = require('./admin-panel/parentColorRouter');
const productCategoryRouter = require('./admin-panel/productCategoryRoutes');
const adminRouter = require('./admin-panel/admin');
const productRouter = require('./admin-panel/productRoutes');
const userRouter = require('./website/userRoutes');

const parentCategoryRouterWeb = require('./website/parentcategory');
const productCatoryRouterWeb = require('./website/productCatgory');
const productRouterWeb = require('./website/productRoutes');
const cartRouter = require('./website/cart');

const adminPanelRouter=express.Router();
const websiteRouter=express.Router();
const appRouter=express.Router();


adminPanelRouter.use('/parent-category',parentCategoryRouter);
adminPanelRouter.use('/parent-size',parentSizeRouter);
adminPanelRouter.use('/parent-color',parentColorRouter);
adminPanelRouter.use('/product-category',productCategoryRouter);
adminPanelRouter.use('/admin',adminRouter);
adminPanelRouter.use('/product',productRouter);


websiteRouter.use('/users',userRouter);
websiteRouter.use('/parent-category',parentCategoryRouterWeb);
websiteRouter.use('/product-category',productCatoryRouterWeb);
websiteRouter.use('/products',productRouterWeb);
websiteRouter.use('/cart',cartRouter)

module.exports={adminPanelRouter,
    websiteRouter,
    appRouter
}