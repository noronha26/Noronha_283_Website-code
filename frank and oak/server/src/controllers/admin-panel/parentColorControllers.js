const ParentColor = require("../../models/parentColor");


const createParentColor = async (req, res) => {
    // res.status(200).json({message:'success create category'});

    try {

        const data = new ParentColor(req.body);
        const response = await data.save();
        res.status(201).json({ message: 'success', data: response });
    }
    catch (error) {
        console.log(error)

        // if(error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({message:'category already exists'});
        res.status(500).json({ message: 'internal server error' });
    }

};
const readParentColor = async (req, res) => {
    try {
        const data = await ParentColor.find();
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const updateParentColorStatus = async (req, res) => {
    try {
        const data = await ParentColor.updateOne(req.params, {
            $set: req.body
        });
        console.log(data);
        res.status(200).json({ message: 'success', data });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });

    }
};
const deleteParentColor = async (req, res) => {
    try {
        const data = await ParentColor.deleteOne(req.params);
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};
const deleteAllParentColors = async (req, res) => {
    try {
        console.log(req.body);
        const data = await ParentColor.deleteMany({
            _id: { $in: req.body.checkedColors }
        })
        res.status(200).json({ message: 'success' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }

};
const readParentColors = async (req, res) => {
    try { 
        const data=await ParentColor.findOne(req.params);
        res.status(200).json({message:'success',data});
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal error' })
    }
};

const updateParentColors=async(req,res)=>{
    try{
        // console.log(req.body, req.params);
        const data = await ParentColor.updateOne(req.params,
            {
                $set: req.body
            }
        );

res.status(200).json({message:'success',data});
    }
    
        catch (error) {
            console.log(error)
            res.status(500).json({ message: 'internal error' })
        }
    
}



module.exports = {
    createParentColor,
    readParentColor,
    updateParentColorStatus,
    deleteParentColor,
    deleteAllParentColors,
    readParentColors,
    updateParentColors
}