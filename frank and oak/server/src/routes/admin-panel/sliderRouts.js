const express = require('express');
// const multer=require('multer');
const { createSlider, readSlider, updateSliderStatus, deleteSlider, deleteAllSlider, readSliders, updateSlider } = require('../../controllers/controller');
const multerUpload = require('../../middleware/multer');


const sliderRouter = express.Router();
// sliderRouter.use(multer().none());
sliderRouter.post('/create-slider', multerUpload, createSlider);
    sliderRouter.get('/read-sliders', readSlider);
    sliderRouter.put('/update-SliderStaus/:_id',updateSliderStatus);
    sliderRouter.delete('/delete-slider/:_id',deleteSlider);
    sliderRouter.put('/delete-Allslider', deleteAllSlider);
    sliderRouter.get('/read-slider/:_id',multerUpload, readSliders);
    sliderRouter.put('/update-slider/:_id',multerUpload,updateSlider)


module.exports = sliderRouter;