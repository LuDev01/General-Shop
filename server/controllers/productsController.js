const Product=require("../database/models/Products");

const controllers={
    createProduct:async(req,res)=>{
        // console.log('body:',req.body);
        console.log(req.session);
        try {
            if(true){
                const newProduct=await Product.create({
                    ...req.body,
                    // userId:req.session.user._id
                    userId: '657d144893c7949cbfada30c'
                })
                return res.status(200).json({message:'Product created successfully!',newProduct})
            }

        } catch (error) {
            res.status(400).json({message:'User not logged'});
        }
    }
}

module.exports=controllers;