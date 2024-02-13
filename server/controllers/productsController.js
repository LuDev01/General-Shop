const Product = require("../database/models/Products");
const cloudinary = require("../middlewares/cloudinary");

const controllers = {
  createProduct: async (req, res) => {
    console.log(req.body.userId);
    const {
      name,
      category,
      brand,
      color,
      sizes,
      price,
      quantity,
      description,
    } = req.body;
    try {
      const { originalname, buffer } = req.file;
      // Check file type
      if (!originalname.match(/\.(jpg|jpeg|png)$/)) {
        return res
          .status(400)
          .json({ error: "Por favor, sube una imagen JPG, JPEG o PNG." });
      }

      // Check file size
      const maxSize = 1 * 1024 * 1024; // 1 MB
      if (buffer.length > maxSize) {
        return res.status(400).json({
          error:
            "La imagen es demasiado grande. El tamaño máximo permitido es 1 MB.",
        });
      }
      // Convert buffer to a stream
      const stream = require("stream");
      const bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);

      // Upload stream to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const cloudStream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "onlineShop" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        bufferStream.pipe(cloudStream);
      });
      // Parse 'sizes' back into a JavaScript object
      const sizesObj = JSON.parse(sizes);
      const product = await Product.create({
        name,
        category,
        brand,
        color,
        sizes: sizesObj,
        price,
        quantity,
        description,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      res.status(201).json({
        message: "Product created successfully!",
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error creating the product", error);
      res.status(500).json({ error: "Error creating the product" });
    }
  },

  getProduct: async (req, res) => {
    try {
      const products = await Product.find();
      if (products) {
        res.status(200).json({ products });
      }
    } catch (error) {
      res.json({ message: `Error showing products ${error}` });
    }
  },

  getProductById: async (req, res) => {
    try {
      const productById = await Product.findById(req.params.id);
      if (productById) {
        res.status(200).json({ productById });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.json({ message: `Error showing product ${error}` });
    }
  },
  getProductFilter: async (req, res) => {
    try {
      const query = req.query.query;

      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { brand: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
          { color: { $regex: query, $options: "i" } },
          { sizes: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      });

      if (products) {
        res.status(200).json({ products });
      }
    } catch (error) {
      res.json({ message: `Error showing products ${error}` });
    }
  },

  editProduct: async (req, res) => {
    // console.log(req.file);
    try {
      let updatedFields = { ...req.body };
      console.log("answer:", updatedFields.image);
      if (req.file) {
        const { originalname, buffer } = req.file;

        if (!originalname.match(/\.(jpg|jpeg|png)$/)) {
          return res
            .status(400)
            .json({ error: "Por favor, sube una imagen JPG, JPEG o PNG." });
        }
        const maxSize = 1 * 1024 * 1024; // 1 MB
        if (buffer.length > maxSize) {
          return res.status(400).json({
            error:
              "La imagen es demasiado grande. El tamaño máximo permitido es 1 MB.",
          });
        }
        const stream = require("stream");
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);

        const result = await new Promise((resolve, reject) => {
          const cloudStream = cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "onlineShop" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          bufferStream.pipe(cloudStream);
        });

        updatedFields.image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
      updatedFields.sizes = JSON.parse(updatedFields.sizes);

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );

      if (product) {
        res.status(200).json({ message: "Updated Successfully", product });
      }
    } catch (error) {
      console.error("Error updating the product", error);
      res.status(500).json({ error: "Error updating the product" });
    }
  },

  deleteProduct: async (req, res) => {
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
  },

  decreaseProductQuantity: async (req, res) => {
    const { productId, size, quantity } = req.body;
    try {
      // Fetch the product and update it in one go
      const product = await Product.findByIdAndUpdate(
        productId,
        { $inc: { [`sizes.${size}`]: -quantity } },
        { new: true }  // This option makes sure the updated document is returned
    );
    if (product && product.sizes[size] !== undefined) {
      if (product.sizes[size] >= 0) {
          // The product quantity was successfully updated
          res.status(200).json({ message: 'Product quantity updated' });
      } else {
          // The product quantity went below zero, revert the update
          await Product.findByIdAndUpdate(
              productId,
              { $inc: { [`sizes.${size}`]: quantity } }
          );
          res.status(400).json({ message: 'Not enough product in stock' });
      }
  } else {
      res.status(404).json({ message: 'Product not found' });
  }
      
    } catch (error) {
         res.json({ message: `Error updating product quantity: ${error}` });
    }
  },
};

module.exports = controllers;
