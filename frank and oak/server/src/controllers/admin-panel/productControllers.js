const Product = require("../../models/product");

const createProduct = async (req, res) => {
    try {
        const data = req.body;
        // data.sizes=JSON.parse(data.sizes);
        // data.colors=JSON.parse(data.colors);

        // console.log(req.body);
        // console.log(req.files)
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.thumbnail) data.secondary_thumbnail = req.files.secondary_thumbnail[0].filename;
            if (req.files.images) data.images = req.files.images.map((image) => image.filename);


        }


        const dataTosave = new Product(data);
        const response = await dataTosave.save();



        res.status(200).json({ message: 'success', data: response });

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }

};
const readProduct = async (req, res) => {
    try {

        //    const data = await ProductCategory.find().populate('parent_category');


        const data = await Product.find().populate('parent_category');
        const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`
        res.status(200).json({ message: 'success', data, filepath })

    }
    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'internal server errorr' })

    }
};

const updateProducts = async (req, res) => {
    try {
        console.log(req.params, req.body);

        const data = await Product.updateOne(req.params,
            {
                $set:req.body

            })

        res.status(200).json({ message: 'success',data})

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })

    }
};

const deleteProduct=async(req,res)=>{
try{

    const data=await Product.deleteOne(req.params);
    res.status(200).json({message:'success',data});

}
catch (error) {
    console.log(error);
    res.status(500).json({ message: 'internal server error' })

}
};
module.exports = {
    createProduct,
    readProduct,
    updateProducts,
    deleteProduct

}