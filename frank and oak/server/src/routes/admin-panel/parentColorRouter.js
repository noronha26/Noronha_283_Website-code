const express = require('express');
// const multer=require('multer');
const { createParentColor, readParentColor,
     updateParentColorStatus, deleteParentColor,
      deleteAllParentColors, readParentColors, 
      updateParentColors} = require('../../controllers/admin-panel/parentColorControllers');
const parentColorRouter = express.Router();
// parentColorRouter.use(multer().none());


parentColorRouter.post('/create-color', createParentColor
);
parentColorRouter.get('/read-colors', readParentColor
);
parentColorRouter.put('/update-colorupdates/:_id',updateParentColorStatus);
parentColorRouter.delete('/delete-colors/:_id',deleteParentColor);
parentColorRouter.put('/delete-Allcolors', deleteAllParentColors);
parentColorRouter.get('/read-color/:_id',readParentColors);
parentColorRouter.put('/update-colors/:_id',updateParentColors);




module.exports = parentColorRouter;
