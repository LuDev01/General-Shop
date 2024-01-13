const Product = require("../database/models/Products");
const cloudinary = require("../middlewares/cloudinary");

const controllers = {
  
  // createProduct: async (req, res) => {
  //   try {
  //     const { userId } = req.body.userId;
  //     console.log(userId);
  //     console.log(req.body);
  //     delete req.body.userId;
  //     console.log(req.body);
  //     const newProduct = await Product.create({
  //       ...req.body,
  //       userId,
  //     });
  //     console.log(newProduct)
  //     return res
  //       .status(200)
  //       .json({ message: "Product created successfully!", newProduct });
  //   } catch (error) {
  //     res.status(400).json({ message: "User not logged" });
  //   }
  // },

    //CLOUDINARY
    createProduct: async (req, res) => {
      const {name, category, brand, color, size, price, quantity, description, image, userId} = req.body;
      try {
        // const result = await cloudinary.uploader.upload(image, {
        //   await cloudinary.uploader.upload(image, {
        //     upload_preset: "onlineShop",
        //     width: 300,
        //     crop: "scale"
        // })
        // const { secure_url } = await cloudinary.uploader.upload(image , {
        //   // public_id: session.user.id,
        //   folder: "onlineShop",
        //   overwrite: true,
        //   invalidate: true,        
        // })
        const result = await cloudinary.uploader.upload(image, {
          folder: "onlineShop"
        });
      
      
        const product = await Product.create({
          name, 
          category, 
          brand, 
          color, 
          size, 
          price, 
          quantity, 
          description, 
          image: {
            public_id: result.public_id,
            url: result.secure_url
          }
        });
         res.status(201).json({
            message: "Product created successfully!",
            success:true,
            product 
         })
      } catch (error) {
        console.log("Error creating the product", error);
      }
    },

  
  getProduct: async(req,res)=>{
    try {
      const products= await Product.find();
      if(products){
        res.status(200).json({products});
      }
    } catch (error) {
      res.json({message: `Error showing products ${error}`})
    }
  },

  getProductFilter:async(req,res)=>{
    try {
      const query = req.query.query;

      const products = await Product.find({
        $or: [
          {name: {$regex: query, $options: 'i'}},
          {brand: {$regex: query, $options: 'i'}},
          {category: {$regex: query, $options: 'i'}},
          {color: {$regex: query, $options: 'i'}},
          {size:{$regex:query,$options:'i'}},
          {description:{$regex:query,$options:'i'}},      
        ]
      });
  
      if (products) { 
        res.status(200).json({products});
      }
    } catch (error) {
      res.json({message: `Error showing products ${error}`});
    }
  },

  editProduct: async(req,res)=>{
    try {
      const product=await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
      );
      if(product){
        res.status(200).json({ message: "Updated Successfully" });
      }
    } catch (error) {
      res.json({ message: `Error updating product ${error}` });
    }
  },
  deleteProduct:async(req,res)=>{
    try {
      const deleted = await Product.findByIdAndRemove(req.params.id);
      if (deleted) {
          res.status(200).json({ message: "Deleted Successfully" });
      } else {
          res.status(404).json({ message: "product not found" });
      }
  } catch (error) {
      res.json({ message: `Error deleting product ${error}` });
  }
  }
};

module.exports = controllers;
