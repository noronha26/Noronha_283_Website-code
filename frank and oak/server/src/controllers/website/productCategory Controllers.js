const ProductCategory = require("../../models/productCategory");

const activeProductCategoriesWeb = async (req, res) => {
    try {
        const data = await ProductCategory.find({status:true}).populate('parent_category');
     
        const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({ message: 'success', data, filepath });


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })


    }
};
module.exports={
    activeProductCategoriesWeb
}