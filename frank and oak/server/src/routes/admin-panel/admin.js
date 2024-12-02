const express =require('express');
const { adminLogin, generateOtp, verifyOtp } = require('../../controllers/controller');
const multer = require('multer');
const adminRouter=express.Router();

adminRouter.post('/login',multer().none(),adminLogin);
adminRouter.post('/genrate-otp',generateOtp);
adminRouter.put('/update-email',verifyOtp)


module.exports=adminRouter;