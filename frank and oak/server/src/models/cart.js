const mongoose=require('mongoose');
const cartschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    size:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'parent_sizes'
    },
    color:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'parent_color'},

        quantity:{
            type:Number,
            default:1
        }

});
const Cart=mongoose.model('cart',cartschema);

module.exports=Cart;