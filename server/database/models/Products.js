const mongoose=require('mongoose');

const productsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
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
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'userRole',
        ref: 'Users'
    }
});

const Products=mongoose.model('Products',productsSchema);
module.exports=Products;