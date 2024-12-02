const ParentCategory = require("../../models/parentCategory");
const ProductCategory = require("../../models/productCategory");

const createProductCategory = async (req, res) => {
    try {
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }
        console.log(data)

        const dataToSave = new ProductCategory(data);
        const response = await dataToSave.save();
        console.log(response);
        res.status(200).json({ message: 'success', data: response });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }

};
const readProductCategories = async (req, res) => {
    try {
        const data = await ProductCategory.find().populate('parent_category');
        const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`
        res.status(200).json({ message: 'success', data, filepath });


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })


    }
};
const updateProductCategoryStatus = async (req, res) => {
    try {
        // console.log(req.params,req.body);
        
        const data = await ProductCategory.updateOne(req.params, {
            $set: req.body
        });

        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })



    }
};

const deleteProductCategory = async (req, res) => {
    try {
        const data = await ProductCategory.deleteOne(req.params);
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })


    }
};

const deleteProductCategories = async (req, res) => {
    try {
        console.log(req.body);
        const data=await ProductCategory.deleteMany({_id:
           {$in:req.body.checkedProductCategories}
        });
        res.status(200).json({ message: 'success' });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })


    }
};
const readProductCategory=async(req,res)=>{
    try{
        const data=await ProductCategory.findOne(req.params);
         const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`
        res.status(200).json({ message: 'success',data,filepath});

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })


    }
    
};

const updateProduct=async(req,res)=>{
    try{
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }
        console.log(data)
        
        const dataToSave = await ProductCategory.updateOne(req.params,
            {$set:data}

            
        );
        //   const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`
        // console.log(filepath)
        res.status(200).json({ message: 'success', data: dataToSave});

        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })


    }

};

const productcategorieByParentCategory = async (req, res) => {
    try {
        console.log(req.params);
        const data = await ProductCategory.find(req.params).populate('parent_category');
        const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`
        res.status(200).json({ message: 'success', data, filepath });


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })


    }
};


module.exports = {
    createProductCategory,
    readProductCategories,
    updateProductCategoryStatus,
    deleteProductCategory,
    deleteProductCategories,
    readProductCategory,
    updateProduct,
    productcategorieByParentCategory
}