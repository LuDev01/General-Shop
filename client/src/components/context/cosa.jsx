// Endpoint para subir una imagen a Cloudinary y guardar el producto en MongoDB
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { name, buffer, originalname } = req.file;

    // Validar el tipo de archivo
    if (!originalname.match(/\.(jpg|jpeg|png)$/)) {
      return res
        .status(400)
        .json({ error: "Por favor, sube una imagen JPG, JPEG o PNG." });
    }

    // Validar el tamaño del archivo (aquí, se establece un límite de 1 MB)
    const maxSize = 1 * 1024 * 1024; // 1 MB
    if (buffer.length > maxSize) {
      return res
        .status(400)
        .json({
          error:
            "La imagen es demasiado grande. El tamaño máximo permitido es 1 MB.",
        });
    }

    // Subir la imagen a Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload_stream(
      { folder: "tu_carpeta_en_cloudinary", resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("Error al subir la imagen a Cloudinary", error);
          return res
            .status(500)
            .json({ error: "Error al subir la imagen a Cloudinary" });
        }

        // Guardar el producto en MongoDB con la URL de la imagen de Cloudinary
        const newProduct = new Product({
          name,
          imageUrl: result.secure_url,
          // Otros campos...
        });

        newProduct.save();

        res.json({ message: "Producto guardado con éxito" });
      }
    );

    // Poner la imagen en el stream para Cloudinary
    const stream = cloudinaryResponse(req.file.originalname);
    stream.end(req.file.buffer);
  } catch (error) {
    console.error("Error al guardar el producto", error);
    res.status(500).json({ error: "Error al guardar el producto" });
  }
});
