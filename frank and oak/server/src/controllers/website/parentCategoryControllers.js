const ParentCategory = require("../../models/parentCategory");

const activeParentCategoriesWeb=async(req,res)=>{
    try{
        const data = await ParentCategory.find({ status: true })
        res.status(200).json({ message: 'success', data });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server'})
    }
};

module.exports={activeParentCategoriesWeb

}