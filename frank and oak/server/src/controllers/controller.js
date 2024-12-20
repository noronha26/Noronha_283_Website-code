//admin panel controller
//admin

//parent category
const ProductCategory = require("../models/productCategory");
const { registerAdmin,
    adminLogin,
    generateOtp,
    verifyOtp } = require("./admin-panel/adminControllers");
const { createOrder, readorder, deleteOrders } = require("./admin-panel/orderController");


const { createParentCategory,
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory,
    multideleteteparentCategories,
    updateParentCategory,
    activeParentCategories,
    searchParentCategory } = require("./admin-panel/parentCategoryControllers");
//Parent color
const { readParentColor,
    createParentColor,
    updateParentColorStatus,
    deleteParentColor,
    deleteAllParentColors,
    readParentColors,
    updateParentColors } = require("./admin-panel/parentColorControllers");
//parent size
const { createParentSize,
    readParentSize,
    updateParentSizesStatus,
    deleteParentSize,
    deleteParentAllSize,
    readParentSizes,
    updateParentSize,
    activeParentSize } = require("./admin-panel/parentSizeControllers");

//product category
const { createProductCategory,
    readProductCategories,
    updateProductCategoryStatus,
    deleteProductCategory,
    deleteProductCategories,
    readProductCategory,
    updateProduct,
    productcategorieByParentCategory } = require("./admin-panel/productCategoryController");

//product controllers
const { createProduct, readProduct,
    updateProducts, deleteProduct, deleleProducts,
    readProducts,
    updateProductProduct } = require("./admin-panel/productControllers");
const { createSlider, readSlider, updateSliderStatus, deleteSlider, deleteAllSlider, readSliders, updateSlider } = require("./admin-panel/sliderControllers");

//This is for story
const { createStory,
    readStory,
    updateStorieStatus,
    deleteStories,
    deleteAllStories, 
    readStories,
    updateStories} = require("./admin-panel/storieController");

//Cart controller
const { createCart, readCart, deleteCart, updateCartQuantity } = require("./website/cartControllers");
const { activeMegaMenuWeb } = require("./website/megamenuController");
const { activeMenusByProductCategory } = require("./website/menuControllers");

//Website controller
const { activeParentCategoriesWeb } = require("./website/parentCategoryControllers");
const { createCheckout, setPaymentStatus } = require("./website/paymentController");
const { activeProductCategoriesWeb } = require("./website/productCategory Controllers");
const { activeproductsByParentCategory } = require("./website/productController");

//user
const { generateOtpWeb, registerUser, verifyJwt } = require("./website/userControllers");




module.exports = {
    createParentCategory,
    createParentSize,
    readParentCategories,
    updateParentCategoryStatus,
    readParentSize,
    deleteParentCategory,
    multideleteteparentCategories,
    updateParentCategory,
    activeParentCategories,
    createProductCategory,
    readProductCategories,
    registerAdmin,
    adminLogin,
    generateOtp,
    verifyOtp,
    updateParentSizesStatus,
    readParentColor,
    createParentColor,
    updateParentColorStatus,
    deleteParentColor,
    deleteParentSize,
    deleteAllParentColors,
    deleteParentAllSize,
    readParentSizes,
    updateParentSize,
    readParentColors,
    updateParentColors,
    activeParentSize,
    updateProductCategoryStatus,
    deleteProductCategory,
    deleteProductCategories,
    readProductCategory,
    updateProduct,
    productcategorieByParentCategory,
    createProduct,
    generateOtpWeb,
    registerUser,
    verifyJwt,
    activeParentCategoriesWeb,
    activeProductCategoriesWeb,
    activeproductsByParentCategory,
    readProduct,
    createCart,
    updateProducts,
    deleteProduct,
    readCart,
    deleleProducts,
    readProducts,
    updateProductProduct,
    deleteCart,
    updateCartQuantity,
    createCheckout,
    setPaymentStatus,
    searchParentCategory,
    createStory,
    readStory,
    updateStorieStatus,
    deleteStories,
    deleteAllStories,
    readStories,
    updateStories,
    createSlider,
    readSlider,
    updateSliderStatus,
    deleteSlider,
    deleteAllSlider,
    readSliders,
    updateSlider,
    activeMegaMenuWeb,
    activeMenusByProductCategory,
    createOrder,
    readorder,
    deleteOrders





}