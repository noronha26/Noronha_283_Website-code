const Product = require("../../models/product")

const activeMenusByProductCategory = async (req, res) => {
    try {
        const data = await Product.find({ parent_category: req.params.parent_category, status: true })
            .populate('parent_category')
            .populate('product_category')
            .populate('size')
            .populate('color')

        const filepath = `${req.protocol}://${req.get('host')}/frank-and-oak-files/`
        res.status(200).json({ message: 'success', data, filepath });

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server' })
    }
};

module.exports = {
    activeMenusByProductCategory
}