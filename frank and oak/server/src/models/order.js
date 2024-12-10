const mongoose = require('mongoose');

const oderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    item: Object,
    customer: Object,
    session: Object,
    amount: Number,
    status: {
        type: String,
        enum: ['pending', 'failed', 'successfull'],
        default: 'pending',
    },
    createdAt: {
        type: Date

    },
    updatedAt: {
        type: Date,
        default: Date.now
    }


});


oderSchema.pre('save', function () {
    this.createdAt = Date.now;
});
const Order = mongoose.model('orders', oderSchema);

module.exports = Order;