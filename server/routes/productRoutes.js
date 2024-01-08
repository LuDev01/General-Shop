const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const authMiddleware = require('../middlewares/authMiddleware')

// @POST /products/create

router.post("/products/create", authMiddleware.isLogged, productController.createProduct);

// @GET /products
router.get("/products",productController.getProduct);

// @PUT /products/edit
router.put("/products/:id/edit",productController.editProduct)

// @DELETE /products/:id/delete
router.delete("/products/:id/delete",productController.deleteProduct)

module.exports = router;
