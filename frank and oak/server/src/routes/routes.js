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
const paymentRouter = require('./website/payment');
const storieRouter = require('./admin-panel/storyRouts');
const sliderRouter = require('./admin-panel/sliderRouts');
const megaMenuRouterWeb = require('./website/megaMenuRoutes');
const megaProductRouterWeb = require('./website/megaProductRoutes');
const orderRouter = require('./admin-panel/orderRoutes');

const adminPanelRouter=express.Router();
const websiteRouter=express.Router();
const appRouter=express.Router();


adminPanelRouter.use('/parent-category',parentCategoryRouter);
adminPanelRouter.use('/parent-size',parentSizeRouter);
adminPanelRouter.use('/parent-color',parentColorRouter);
adminPanelRouter.use('/product-category',productCategoryRouter);
adminPanelRouter.use('/admin',adminRouter);
adminPanelRouter.use('/product',productRouter);
adminPanelRouter.use('/story',storieRouter);
adminPanelRouter.use('/slider',sliderRouter)
adminPanelRouter.use('/order',orderRouter)


websiteRouter.use('/users',userRouter);
websiteRouter.use('/parent-category',parentCategoryRouterWeb);
websiteRouter.use('/product-category',productCatoryRouterWeb);
websiteRouter.use('/products',productRouterWeb);
websiteRouter.use('/cart',cartRouter);
websiteRouter.use('/payment',paymentRouter);
websiteRouter.use('/mega-menu',megaMenuRouterWeb);
websiteRouter.use('/megaProducts',megaProductRouterWeb);

module.exports={adminPanelRouter,
    websiteRouter,
    appRouter
}