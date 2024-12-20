const express=require('express');
// const multer =require('multer');

const { createStory, readStory, updateStorieStatus, deleteStories, deleteAllStories, readStories, updateStories } = require('../../controllers/controller');
const multerUpload = require('../../middleware/multer');

const storieRouter=express.Router();
// storieRouter.use(multer().none());


storieRouter.post('/create-storie',multerUpload,createStory);
storieRouter.get('/read-story',readStory);
storieRouter.put('/update-StorieStatus/:_id',updateStorieStatus);
storieRouter.delete('/delete-storie/:_id',deleteStories);
storieRouter.put('/delete-stories', deleteAllStories);
storieRouter.get('/read-stories/:_id',multerUpload,readStories),
storieRouter.put('/update-storie/:_id',multerUpload,updateStories)


module.exports=storieRouter;