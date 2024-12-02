// const { response } = require("express");

const Admin = require("../../models/admin");
const nodemailer =require('nodemailer');

const otpStore=new Map();

const registerAdmin=async()=>{
    try{
        const adminData=await Admin.find();

        if(adminData.length !==0) return console.log(adminData[0])
        console.log(adminData)

    const newAdmin= new Admin({
        email:process.env.ADMIN_EMAIL,
        password:process.env.ADMIN_PASSWORD,


    });
     const response =await newAdmin.save();
    console.log('admin registered',response);
    }
    catch(error)
    {
        console.log(error);
        // request.response(200).json({message:'network error'})

    }
};
const adminLogin=async(req,res)=>{
    try{
        console.log(req.body);
        const adminData=await Admin.findOne({email:req.body.email});
        if(!adminData) return res.status(401).json({message:'invalid email'});
        if(adminData.password!==req.body.password)return res.status(401).json({message:'invalid password'})
        res.status(200).json({message:'success',data:adminData});
    }
    catch(error){
        console.log(error);

    }
};
const generateOtp=async(req,res)=>{

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
const verifyOtp= async(req,res)=>{

    try{
        const sentOtp=otpStore.get(req.body.email);
        if( Number(req.body.otp)!==sentOtp) return res.status(401).json({message:'invalid otp'});
        const data = await Admin.updateOne({
            email:req.body.email,
        },
            {
                $set:{
                    email:req.body.newemail
                }
            });
        res.status(200).json({message:'Success'})

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
}

module.exports={registerAdmin,
    adminLogin,
    generateOtp,
    verifyOtp

};