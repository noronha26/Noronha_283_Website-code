//admin panel controller
//admin

//parent category
const{ registerAdmin,
     adminLogin,
     generateOtp,
     verifyOtp} = require("./admin-panel/adminControllers");
const { createParentCategory, 
    readParentCategories, 
    updateParentCategoryStatus, 
    deleteParentCategory,
    multideleteteparentCategories,
    updateParentCategory,
    activeParentCategories} = require("./admin-panel/parentCategoryControllers");
//Parent color
    const { readParentColor,
     createParentColor, 
     updateParentColorStatus,
     deleteParentColor,
     deleteAllParentColors,
     readParentColors,
     updateParentColors} = require("./admin-panel/parentColorControllers");
//parent size
const { createParentSize, 
    readParentSize, 
    updateParentSizesStatus,
    deleteParentSize,
    deleteParentAllSize,
    readParentSizes,
    updateParentSize,
    activeParentSize} = require("./admin-panel/parentSizeControllers");

//product category
const { createProductCategory, 
    readProductCategories, 
    updateProductCategoryStatus,
    deleteProductCategory,
    deleteProductCategories,
    readProductCategory,
    updateProduct,
  productcategorieByParentCategory} = require("./admin-panel/productCategoryController");

//product controllers
  const { createProduct, readProduct, updateProducts, deleteProduct } = require("./admin-panel/productControllers");
const { createCart } = require("./website/cartControllers");

//Website controller
const { activeParentCategoriesWeb } = require("./website/parentCategoryControllers");
const { activeProductCategoriesWeb } = require("./website/productCategory Controllers");
const { activeproductsByParentCategory } = require("./website/productController");

//user
const { generateOtpWeb, registerUser, verifyJwt } = require("./website/userControllers");




module.exports={
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
    deleteProduct
    
   
    
}