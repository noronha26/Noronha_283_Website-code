const mongoose = require('mongoose');


const sliderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    heading: String,
    sub_heading: String,
    thumbnail: String,
    status: {
        type: Boolean,
        default: true
    },
    created_at: Date,

    updated_at: {
        type: Date,
        default: Date.now
    }
})
sliderSchema.pre('save', function () {
    this.created_at = new Date();
});
sliderSchema.pre('insertOne', function () {
    this.created_at = new Date();
});

const Slider = mongoose.model('sliders',sliderSchema);

module.exports = Slider;
