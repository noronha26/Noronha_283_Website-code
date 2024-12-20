const Storie = require("../../models/stories");

const createStory = async (req, res) => {
    try {
        console.log(req.body)
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.secondary_thumbnail) data.secondary_thumbnail = req.files.secondary_thumbnail[0].filename;
        }


        const dataTosave = new Storie(data);
        const response = await dataTosave.save()
        console.log(response)
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }
};

const readStory = async (req, res) => {
    try {
        console.log(req.body)



        const data = await Storie.find();
        const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`

        res.status(200).json({ message: 'success', data, filepath })

    }
    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }
};

const updateStorieStatus = async (req, res) => {
    try {
        console.log(req.params, req.body)
        const data = await Storie.updateOne(req.params,
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
const deleteStories = async (req, res) => {
    try {
        const data = await Storie.deleteOne(
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

const deleteAllStories = async (req, res) => {
    try {
        console.log(req.body);
        const data = await Storie.deleteMany({
            _id: { $in: req.body.checkedStorie }
        });
        res.status(200).json({ message: 'success' });
    }
    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }
};

const readStories = async (req, res) => {
    try {

        const data = await Storie.findOne(req.params);
        const filepath = ` ${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`
        res.status(200).json({ message: 'success', data, filepath });
    }
    catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' });
        res.status(500).json({ message: 'internal server error' });
    }
};
const updateStories = async (req, res) => {

    try {
        const data = req.body;

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.secondary_thumbnail) data.secondary_thumbnail = req.files.secondary_thumbnail[0].filename;


        }

        const dataTosave = await Storie.updateOne(

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
    createStory,
    readStory,
    updateStorieStatus,
    deleteStories,
    deleteAllStories,
    readStories,
    updateStories

}