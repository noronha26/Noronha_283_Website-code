//This is a Insert api


const {MongoClient} = require('mongodb');
const express=require('express');
const multer=require('multer');
const path =require('path');



const app=express();
app.use('/files',express.static('./uploads'));


const url='mongodb://localhost:27017';
const dbname='Noronha_283_Website_code';

const client= new MongoClient(url);

const connect=async()=>{
    await client.connect();
    const db = client.db(dbname);
    const collection=db.collection('brands');

    return collection;
   
};
//use multer to show 
const diskStorage=multer.diskStorage({
    destination:(req,file,next)=>{
        next(null,'./uploads');
    },
    filename:(req,file,next)=>{
        next(null, Date.now()+Math.floor(Math.random()*9999999)+path.extname(file.originalname));

    }
})
// const diskStorage=multer.diskStorage

const uploads=multer({storage:diskStorage}).fields([
    {
        name:'thumbnail',maxCount:1
    },
    {
        name:'images',maxCount:10
    }
]);
//rout
app.post('/insert-product',uploads,async(req,res)=>{
    //to handel the expection
    try{
        const data=req.body;
        // console.log(req.body);
        // console.log(req.files);
        if(req.files){
            if(req.files.thumbnail)data.tumbnail=req.files.thumbnail[0].filename;
            if(req.files.images)data.images=req.files.images.map((file)=>file.filename);
        }
        // console.log(data);
        const collection=await connect();
        const response=await collection.insertOne(data);


        res.status(200).json({message:'success',data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
})

app.get('/read-products',async(req,res)=>{
    try{
        const collection =await connect();
        const response=await collection.find().toArray();
        const filepath=`${req.protocol}://${req.get('host')}/files/`

       const dataWithPath= response.map((product)=>{
            product.thumbnail=filepath+product.thumbnail;
            product.images=product.images.map((img)=>filepath+img);
            return product;
        })
        //this is a filepath
        
        res.status(200).json({message:'success',data:dataWithPath,filepath})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'});


    }

})

//This is the port
app .listen(5200,()=>{
    console.log('server is running on port 5200')
});