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

      //   current product
      //   const currentProduct = await Product.findById(req.params.id);
      //   console.log("Prueba majo" + currentProduct)

      //   //build the data object
      //   const data = {
      //     name: req.body.name,
      //     category: req.body.category,
      //     brand: req.body.brand,
      //     color: req.body.color,
      //     size: req.body.size,
      //     price: req.body.price,
      //     quantity: req.body.quantity,
      //     description: req.body.description,
      //   }

      //   //modify image conditionally
      //   if(req.body.image !== ''){
      //     const ImgId = currentProduct.image.public_id;
      //     if (ImgId) {
      //       await cloudinary.uploader.destroy(ImgId);
      //     }

      //     const newImage = await cloudinary.uploader.upload(req.body.image, {
      //       folder: "onlineShop",
      //       width: 1000,
      //       crop: "scale"
      //     });

      //     data.image = {
      //       public_id: newImage.public_id,
      //       url: newImage.secure_url
      //     }
      //   }
      // }

      // const productUpdate = await Product.findOneAndUpdate(req.params.id, data, {new:true})
      // res.status(200).json({
      //   success: true,
      //   productUpdate
      // });
    } 
  }
  catch (error) {
    res.json({message: `Error showing products ${error}`})
  }

  // updateProduct: async(req,res, next)=>{
  //    try {
  //      const currentProduct = await Product.findById(req.params.id);


  //    } catch (error) {
      
  //    }
  //  }
}}

module.exports = controllers;
