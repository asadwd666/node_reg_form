const mongoose=require('mongoose');
const fileSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
    cpassword:{type:String,required:true},
})

//////now need to crate collections
// collection varibale ist letter should be uppercase coz of class
// inside model collection name
const Users=new mongoose.model("Register",fileSchema)
module.exports=Users;