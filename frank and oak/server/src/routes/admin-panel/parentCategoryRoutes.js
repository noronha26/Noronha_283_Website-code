const express = require('express');
const multer = require('multer');

const { createParentCategory,
     readParentCategories,
     updateParentCategoryStatus,
     deleteParentCategory,
     multideleteteparentCategories
} = require('../../controllers/controller');
const { readParentCategory, updateParentCategory, activeParentCategories, searchParentCategory } = require('../../controllers/admin-panel/parentCategoryControllers');
const parentCategoryRouter = express.Router();
parentCategoryRouter.use(multer().none());


parentCategoryRouter.post('/create-category', createParentCategory
);
parentCategoryRouter.get('/read-categories', readParentCategories);
parentCategoryRouter.put('/updateStatus/:_id', updateParentCategoryStatus);
parentCategoryRouter.delete('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.put('/delete-categories', multideleteteparentCategories);
parentCategoryRouter.get('/read-category/:_id', readParentCategory);
parentCategoryRouter.put('/update-category/:_id', updateParentCategory);
parentCategoryRouter.get('/active-categories', activeParentCategories);
parentCategoryRouter.get('/search-category/:key',searchParentCategory)



module.exports = parentCategoryRouter;