const mongoose=require('mongoose');

const colorSchema=new mongoose.Schema({
    color:{
        type:String,
        required:true,
        unique:true
    },
    color_code:String,

    color_picker:{
        type:String,
        default:true

    },
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
colorSchema.pre('save',function(){
    this.created_at=new Date();
});
colorSchema.pre('insertOne',function(){
    this.created_at=new Date();
});
const ParentColor=mongoose.model('parent_color',colorSchema);

module.exports=ParentColor;