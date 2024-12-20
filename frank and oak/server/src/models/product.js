const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    short_description: String,
    thumbnail: String,
    secondary_thumbnail: String,
    images: Object,
    price: Number,
    mrp: Number,
    parent_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_categories'
    },
    
    product_category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_categories'
    }],

    size:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_sizes'
    }],

    color:[{
    type: mongoose.Schema.Types.ObjectId,
     ref: 'parent_color'
    }],
    ifStock:String,

    brand:String,
    
    status:{
        type: Boolean,
        default: true

    },
    created_at: Date,
    updated_at:{
        type: Date,
        default: Date.now
    }

});
productSchema.pre('save', function () {
    this.created_at = Date.now;
});
const Product = mongoose.model('products', productSchema);
module.exports = Product;