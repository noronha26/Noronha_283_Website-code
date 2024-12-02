const nodemailer =require('nodemailer');
const User = require('../../models/user');
const jwt=require('jsonwebtoken');
const otpStore=new Map();
const generateOtpWeb=async(req,res)=>{

    try{
        const otp =Math.floor(Math.random()*1000000);
        otpStore.set(req.body.email,otp);
        setTimeout(()=>{
            otpStore.delete(req.body.email)

        },120000);

        const transport=nodemailer.createTransport({
            service:'gmail',

            auth:{
                user:process.env.APP_EMAIL,
                pass:process.env.APP_PASSWORD

            }
        });
        const options={
            from:process.env.APP_EMAIL,
            to:req.body.email,
            subject:'OTP',
            text:`Your OTP is${otp}`

        };
        transport.sendMail(options,(error,decode)=>{
            if(error) return res.status(500).json({message:'error'});
            res.status(200).json({message:'otp sent'});


    })
}
    catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'});

    }
};
const registerUser= async(req,res)=>{

    try{
        const{otp, ...dataWithoutOtp}=req.body;
        const sentOtp=otpStore.get(req.body.email);
        if( Number(req.body.otp)!==sentOtp) return res.status(401).json({message:'invalid otp'});

        const datatoSave=new User(dataWithoutOtp);
        const data=await datatoSave.save();
        jwt.sign(data._doc,process.env.JWT_KEY,{expiresIn:'10d'},(error, token)=>{
            if(error)console.log(error);
            if(error)res.status(500).json({message:'try after some time'})
                // console.log(token);

                res.status(200).json({message:'Success',auth:token});
            })

     

    }
    catch(error)
    {
        console.log(error);
        if(error.code===11000&&error.keyPattern&&error.keyPattern.email===1) return
        res.status(400).json({message:'email already registerd '});
        res.status(500).json({message:'internal server error'});
    }
};
const verifyJwt=async(req,res)=>{
    try{
       console.log('verify called')
       jwt.verify(req.body.auth,process.env.JWT_KEY,(error,decode)=>{
        if(error)return res.status(401).json({message:'invalid tokrn'});
        res.status(200).json({message:'success',data:decode});
        console.log(decode);
       })
       
    }
catch(error){
    console.log(error);
    res.status(500).json({message:'Internal server error'});
}
}
module.exports={
    generateOtpWeb,
    registerUser,
    verifyJwt
};
