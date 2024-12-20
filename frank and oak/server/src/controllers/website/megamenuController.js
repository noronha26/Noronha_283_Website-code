const ProductCategory = require("../../models/productCategory");

const activeMegaMenuWeb = async (req, res) => {
    // try {
    //     const data = await ProductCategory.find({ status: true })
    //     res.status(200).json({ message: 'success', data });
    // }
    try {
        console.log(req.params);
        const data = await ProductCategory.find(req.params).populate('parent_category');
        const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`
        res.status(200).json({ message: 'success', data, filepath });


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server' })
    }
};

module.exports = {
    activeMegaMenuWeb

}