const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const authMiddleware = require('../middlewares/authMiddleware')

// @POST /products/create a product

router.post("/products/create", authMiddleware.isLogged, productController.createProduct);

// @GET /products
router.get("/products", productController.getProduct);

// @GET /update
router.put("/products/update/:id", authMiddleware.isLogged, productController.getProduct)



module.exports = router;
