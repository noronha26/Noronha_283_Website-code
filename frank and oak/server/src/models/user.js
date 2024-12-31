const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{
      type:String,
      unique:true  
    },
    facebook:String,
    google:String,

    password:String,
    created_at:Date,

  updated_at:{
        type:Date,
        default:Date.now
    }


});
userSchema.pre('save',function(){
    this.created_at=Date.now;
});

const User=mongoose.model('users',userSchema);
module.exports=User;