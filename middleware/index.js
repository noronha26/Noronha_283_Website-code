const express=require('express');
const key='vanitha'

const app=express();
// app.use(express.json());


const m1=(req,res,next)=>{console.log('hello middle')
    // res.send('middle response')
    // console.log(req.params.key);
    if(!req.params.key)return res.status(400).json({message:'please send a key'});
    if(req.params.key!= key)return res.status(401).json({message:'please send a valid  key'});

    next();
    
};
// const m2=(req,res,next)=>{console.log('hello middle 2')
//     // res.send('middle response')
//     next();

// };
app.use(m1);

app.get('/register/:key?',express.json(), m1,(req,res)=>{

    console.log(req.body);
    res.send('welcome to api')
});

app.get('/greet',(req,res)=>{

    res.status(200).json({message:'hello world'});
});

app.listen(5000,()=>{
    console.log('server is running on port 5000')
});