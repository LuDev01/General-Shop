const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();
const productController = require("../controllers/productsController");
// const authMiddleware = require('../middlewares/authMiddleware');
const controllers = require("../controllers/productsController");

// @POST /products/create a product

// router.post("/products/create", authMiddleware.isLogged, productController.createProduct);
router.post("/products/create", upload.single('image'), productController.createProduct);

//@POST /products/decreaseQuantity
router.post("/products/:id/decreaseProductQuantity",productController.decreaseProductQuantity);

// @GET /products
router.get("/products", productController.getProduct);

// @GET /productsbyid
router.get("/products/:id",controllers.getProductById)

// @GET /getProductFilter
router.get("/searchbyproducts",controllers.getProductFilter)

// @PUT /products/edit
router.put("/products/:id/edit",upload.single('image'),productController.editProduct)

// @DELETE /products/:id/delete
router.delete("/products/:id/delete",productController.deleteProduct)

module.exports = router;
