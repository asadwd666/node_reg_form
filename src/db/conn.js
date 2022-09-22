const mongoose=require('mongoose');

 
mongoose.connect("mongodb://localhost:27017/EMR_REgistration").then(()=>{
    console.log('success');
}).catch((err)=>{
console.log(err);
})
