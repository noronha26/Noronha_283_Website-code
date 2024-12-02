// const { castObject } = require("../../models/parentCategory");
const ParentSize = require("../../models/parentSize");

const createParentSize=async(req,res)=>{
    try{
        const data=new ParentSize( req.body);
        const response=await data.save();
        res.status(200).json({message:'success',data:response});

    }
 catch(error){
    console.log(error);
     if(error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({message:'category already exists'});
    res.status(500).json({message:'internal server error'});
 }

};
const readParentSize=async(req,res)=>{

    try{
        const data= await ParentSize.find();
        res.status(200).json({message:'success',data})

    }
    catch(error)
{
console.log(error);
res.status(500).json({message:'Internal server error'});
}
};

const updateParentSizesStatus=async(req,res)=>{
    try{
        const data=await ParentSize.updateOne(req.params,{
          $set:  req.body
        });
// console.log(req.params,req.body);
res.status(200).json({message:'success',data});
    }
    catch(error)
{
console.log(error);
res.status(500).json({message:'Internal server error'});
}

};
const deleteParentSize=async(req,res)=>{
    try{
        const data=await ParentSize.deleteOne(req.params);
        res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'});
    }
};
const deleteParentAllSize = async(req,res)=>{
    try{
       console.log(req.body);
       const data=await ParentSize.deleteMany({_id:{$in:req.body.checkedSize}})
        res.status(200).json({message:'success'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'});
    }
};

const readParentSizes=async(req,res)=>{
    try{
        const data=await ParentSize.findOne(req.params);
        res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'});
    }
};
const updateParentSize= async(req,res)=>{
    try{
        // console.log(req.body,req.params);
const data=await ParentSize.updateOne(
    req.params,
    {
        $set:req.body
    }
);
    res.status(200).json({message:'success',data});

    }

    catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'});
    }
        
};

// const activeParentSize=async (req,res)=>{
//     try{
// const data= await ParentSize.findOne({status:true});

// res.status(200).json({message:'success',data:data});
//     }
//     catch(error){
//         console.log(error)
//         res.status(500).json({message:'internal server errror'});

//     }
// };






module.exports={
    createParentSize,
    readParentSize,
    updateParentSizesStatus,
    deleteParentSize,
    deleteParentAllSize,
    readParentSizes,
    updateParentSize,
    // activeParentSize
}