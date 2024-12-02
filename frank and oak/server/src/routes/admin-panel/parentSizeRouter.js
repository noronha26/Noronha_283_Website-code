const express=require('express');
const multer=require('multer');
const { createParentSize, 
    readParentSize, 
    updateParentSizesStatus,
    deleteParentSize,
    deleteParentAllSize,
    readParentSizes,
    updateParentSize,
    activeParentSize} = require('../../controllers/admin-panel/parentSizeControllers');



const parentSizeRouter=express.Router();
parentSizeRouter.use(multer().none());

parentSizeRouter.post('/create-size',createParentSize);
parentSizeRouter.get('/read-size',readParentSize);
parentSizeRouter.put('/update-size-status/:_id',updateParentSizesStatus);
parentSizeRouter.delete('/deleteParentSize/:_id',deleteParentSize);
parentSizeRouter.put('/deleteParentAll-size',deleteParentAllSize);
parentSizeRouter.get('/read-sizes/:_id',readParentSizes);
parentSizeRouter.put('/update-size/:_id',updateParentSize);
// parentSizeRouter.get('/active-size',activeParentSize)

module.exports=parentSizeRouter;