const express=require('express');
const { generateOtpWeb, registerUser, verifyJwt } = require('../../controllers/controller');

const userRouter=express.Router();

userRouter.post('/genrate-otp',  generateOtpWeb);
userRouter.post('/register-user',registerUser);
userRouter.post('/verify-login',verifyJwt)

module.exports=userRouter;
