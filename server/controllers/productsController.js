const Product = require("../database/models/Products");

const controllers = {
  createProduct: async (req, res) => {
    try {
      const { userId } = req.body.userId;
      console.log(userId);
      console.log(req.body);
      delete req.body.userId;
      console.log(req.body);
      const newProduct = await Product.create({
        ...req.body,
        userId,
      });
      console.log(newProduct)
      return res
        .status(200)
        .json({ message: "Product created successfully!", newProduct });
    } catch (error) {
      res.status(400).json({ message: "User not logged" });
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
  }
};

module.exports = controllers;
