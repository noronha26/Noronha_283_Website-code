const express=require('express');

const app =express();

const router1=express.Router();
const router2=express.Router();
const router3=express.Router();

const m1=(req,res,next)=>{
    console.log('middleware 1');
    next();
};
const m2=(req,res,next)=>{
    console.log('middleware 2');
    next();
};
const m3=(req,res,next)=>{
    console.log('middleware 3');
    next();
};

router1.use(m1);
router2.use(m2);
router3.use(m3);


router1.get('/r1',(req,res)=>{
    res.send('Hello from route 1')
});
router1.get('/r2',(req,res)=>{
    res.send('Hello from route 2')
});
router2.get('/r3',(req,res)=>{
    res.send('Hello from route 3')
});
router2.get('/r4',(req,res)=>{
    res.send('Hello from route 4')
});
router3.get('/r5',(req,res)=>{
    res.send('Hello from route 5')
});
router3.get('/r6',(req,res)=>{
    res.send('Hello from route 6')
});
app.use('/path1',router1);
app.use('/path2',router2);
app.use('/path3',router3);

app.listen(4200,()=>{
    console.log('Server is running on port 4200');

});
