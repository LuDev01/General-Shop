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
