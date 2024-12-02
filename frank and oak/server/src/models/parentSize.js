const mongoose=require('mongoose');
const sizeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true

    },
    size:String,
    status:{
        type:Boolean,
         default:true
    },
    created_at:Date,
    updated_at:{
        type:Date,
        default:Date.now
    }
});
sizeSchema.pre('save',function(){
    this.created_at=new Date();


})
sizeSchema.pre('insertOne',function(){
    this.created_at=new Date();


})
const ParentSize=mongoose.model('parent_sizes',sizeSchema);
module.exports=ParentSize;