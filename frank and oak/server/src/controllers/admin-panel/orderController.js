const Order = require("../../models/order");

const createOrder = async (req, res) => {
    try {
        const data = new Order(req.body);
        const response = await data.save();
        res.status(200).json({ message: 'success' });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal serfver error' });
    };
};

const readorder = async (req, res) => {
    try {
        const data =await Order.find();
       const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`
       res.status(200).json({ message: 'success', data,filepath });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal serfver error' });
    }
};
const deleteOrders=async(req,res)=>{
    try{
        console.log(req.body)
        const data=await Order.deleteMany({_id:{$in:req.body.checkedOrder}});
        res.status(200).json({ message: 'success'});
    }
    catch(error){
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal serfver error' });
    }

}
module.exports = {
    createOrder,
    readorder,
    deleteOrders
}