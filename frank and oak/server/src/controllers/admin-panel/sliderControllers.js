const Slider = require("../../models/slider");


const createSlider = async (req, res) => {

    try {
        console.log(req.body)

        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }
        const dataTosave = new Slider(data);

        const response = await dataTosave.save();

        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ messge: 'internal server error' })
    }
};

const readSlider = async (req, res) => {
    try {
        console.log(req.body)



        const data = await Slider.find();
        const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`

        res.status(200).json({ message: 'success', data, filepath })

    }
    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }
};

const updateSliderStatus = async (req, res) => {
    try {
        console.log(req.params, req.body)
        const data = await Slider.updateOne(req.params,
            {

                $set: req.body
            }
        )
        res.status(200).json({ message: 'success', data })
    }

    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }
};
const deleteSlider = async (req, res) => {
    try {
        const data = await Slider.deleteOne(
            req.params
        )

        res.status(200).json({ message: 'success', data })

    }

    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }
};
const deleteAllSlider = async (req, res) => {
    try {
        console.log(req.body);
        const data = await Slider.deleteMany({
            _id: { $in: req.body.checkedSlider }
        });
        res.status(200).json({ message: 'success' });
    }
    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }
};

const readSliders = async (req, res) => {
    try {
   


        const data = await Slider.findOne(req.params);
        const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`
        res.status(200).json({ message: 'success', data, filepath });
      
    }
   
    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }
};
const updateSlider = async (req, res) => {

    try {
        const data = req.body;

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            


        }

        const dataTosave = await Slider.updateOne(

            req.params,
            {
                $set: data

            }
        );


        res.status(200).json({ message: 'success', data: dataTosave });
    }

    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }

};

module.exports = {
    createSlider,
    readSlider,
    updateSliderStatus,
    deleteSlider,
    deleteAllSlider,
    readSliders,
    updateSlider
}