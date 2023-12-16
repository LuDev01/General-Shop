const mongoose=require('mongoose');

const productsSchema=new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        default:()=>new mongoose.Types.ObjectId()
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      }

});

const Products=mongoose.model('Products',productsSchema);
module.exports=Products;