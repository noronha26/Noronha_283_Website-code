const mongoose = require('mongoose');

const storieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: String,
    secondary_thumbnail: String,
    description: String,

    status:{
        type: Boolean,
        default: true

    },
    created_at: Date,

    updated_at: {
        type: Date,
        default: Date.now
    }
});
storieSchema.pre('save', function () {
    this.created_at = new Date();
});
storieSchema.pre('insertOne', function () {
    this.created_at = new Date();
});
const Storie = mongoose.model('storie',storieSchema);

module.exports = Storie;
