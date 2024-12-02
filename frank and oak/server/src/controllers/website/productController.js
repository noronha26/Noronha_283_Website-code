const Product = require("../../models/product");


const activeproductsByParentCategory= async (req,res)=>{
    try{

        const data=await Product.find({parent_category:req.params.parent_category,status:true})
        .populate('parent_category')
        //parent_categories
        .populate('product_category')
        //product_categories
        .populate('size')
        //parent_sizes
        .populate('color')
        //parent_color

        const filepath=`${req.protocol}://${req.get('host')}/frank-and-oak-files/`
        res.status(200).json({message:'success',data,filepath});
       
    }

    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'})

    }
};
module.exports={
    activeproductsByParentCategory
}