const express=require('express');
const { generateOtpWeb, registerUser, verifyJwt, userLogin } = require('../../controllers/controller');
const multer=require('multer');


const userRouter=express.Router();

userRouter.post('/genrate-otp',  generateOtpWeb);
userRouter.post('/register-user',registerUser);
userRouter.post('/verify-login',verifyJwt);
userRouter.post('/login-user',multer().none(),userLogin)


module.exports=userRouter;
