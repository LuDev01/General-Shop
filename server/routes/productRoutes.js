const express=require('express');
const router=express.Router();
const productController=require('../controllers/productsController');

// @POST /products/create

router.post("/products/create",productController.createProduct);

module.exports=router;