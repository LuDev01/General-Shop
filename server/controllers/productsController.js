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
  // createProduct: async (req, res) => {

  //   try {
  //     const { name, buffer, originalname } = req.file;
  //     if (!originalname.match(/\.(jpg|jpeg|png)$/)) {
  //       return res
  //         .status(400)
  //         .json({ error: "Por favor, sube una imagen JPG, JPEG o PNG." });
  //     }
  //     const maxSize = 1 * 1024 * 1024; // 1 MB
  //     if (buffer.length > maxSize) {
  //       return res
  //         .status(400)
  //         .json({
  //           error:
  //             "La imagen es demasiado grande. El tamaño máximo permitido es 1 MB.",
  //         });
  //     }
  //     // Convert buffer to a string
  //     const cloudinaryResponse = await cloudinary.uploader.upload_stream(
  //       { folder: "onlineShop", resource_type: "image" },
  //       (error, result) => {
  //         if (error) {
  //           console.error("Error al subir la imagen a Cloudinary", error);
  //           return res
  //             .status(500)
  //             .json({ error: "Error al subir la imagen a Cloudinary" });
  //         }
  //         const newProduct = new Product({
  //           name,
  //           category,
  //           brand,
  //           color,
  //           size,
  //           price,
  //           quantity,
  //           description,
  //           userId,
  //           imageUrl: cloudinaryResponse.url,

  //         });
  //         newProduct.save();

  //         res.json({ message: "Producto guardado con éxito" });
  //       }
  //     );
  //     const stream = cloudinaryResponse(req.file.originalname);
  //     stream.end(req.file.buffer);
  //   } catch (error) {
  //     console.error("Error al guardar el producto", error);
  //     res.status(500).json({ error: "Error al guardar el producto" });
  //   }
  // },
  //------------------------------------------------------------NEW Controller
  createProduct: async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    // console.log(req.file);
    console.log(req.body.userId);
    const {
      name,
      category,
      brand,
      color,
      size,
      price,
      quantity,
      description,
    } = req.body;

    
    try {
      // req.file is the 'image' file
      const { originalname, mimetype, buffer } = req.file;
    
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

  getProductFilter: async (req, res) => {
    try {
      const query = req.query.query;

      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { brand: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
          { color: { $regex: query, $options: "i" } },
          { size: { $regex: query, $options: "i" } },
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
    try {
      let updatedFields = { ...req.body };
      // Ensure 'image' field is initialized with an empty object
      updatedFields.image = updatedFields.image || {};
      // Check if a new image is uploaded
      if (
        typeof req.body.image === "string" &&
        req.body.image.startsWith("data:image")
      ) {
        // Upload the new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.body.image, {
          folder: "onlineShop",
        });

        // Update the image field with the new public_id and url
        updatedFields.image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );

      if (product) {
        res.status(200).json({ message: "Updated Successfully", product });
      }
    } catch (error) {
      res.json({ message: `Error updating product ${error}` });
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
};

module.exports = controllers;
