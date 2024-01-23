import React, { useState, useEffect } from "react";

const FormularioEdicion = () => {
  // Estado local para almacenar la información del formulario, incluida la ruta de la imagen
  const [formData, setFormData] = useState({
    imagen: "", // Ruta de la imagen
    // Otros campos del formulario
  });

  // Simula la obtención de la información del registro desde la base de datos
  const obtenerInformacionDeRegistro = () => {
    // Lógica para obtener la información del registro, incluida la ruta de la imagen
    // Puedes usar fetch o axios para hacer una solicitud a tu servidor
    // y obtener los datos del registro que estás editando.
    // Ejemplo:
    // fetch('/api/obtenerInformacionDeRegistro')
    // .then(response => response.json())
    // .then(data => {
    // setFormData({
    // ...data,
    // imagen: data.rutaDeImagen,
    // });
    // });

    // Supongamos una ruta de imagen de ejemplo
    const rutaDeImagenEjemplo = "ruta/de/ejemplo.jpg"; //servidor claudinary
    setFormData({
      ...formData,
      imagen: rutaDeImagenEjemplo,
    });
  };

  // Efecto para cargar la información del registro al montar el componente
  useEffect(() => {
    obtenerInformacionDeRegistro();
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente

  // Maneja los cambios en el campo de la imagen
  const handleImagenChange = (event) => {
    setFormData({
      ...formData,
      imagen: event.target.value,
    });
  };

  return (
    <form>
      {/* Otros campos del formulario */}
      <div>
        <label htmlFor="imagen">Imagen:</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleImagenChange}
        />
        <img src={formData.imagen} alt="Vista previa de la imagen" />
      </div>
      {/* Resto del formulario y botón de envío */}
    </form>
  );
};

export default FormularioEdicion;

///BACKEND
// Supongamos que tienes un modelo de formulario en MongoDB
const mongoose = require("mongoose");

const formularioSchema = new mongoose.Schema({
  // Otros campos del formulario
  imagenId: { type: String, required: true }, // ID de la imagen en Cloudinary asociada a este formulario
});

const Formulario = mongoose.model("Formulario", formularioSchema);

module.exports = Formulario;

const express = require("express");
const Formulario = require("../models/Formulario");

const router = express.Router();

// Ruta para obtener información del formulario por ID
router.get("/formulario/:id", async (req, res) => {
  try {
    const formulario = await Formulario.findById(req.params.id);

    if (!formulario) {
      return res.status(404).json({ message: "Formulario no encontrado" });
    }

    // Aquí podrías construir la URL de Cloudinary utilizando el ID de la imagen
    const cloudinaryURL = `https://res.cloudinary.com/tu-cuenta/image/upload/${formulario.imagenId}/ejemplo.jpg`;

    // Devuelve la información del formulario, incluida la URL de la imagen
    res.json({ formulario, imagenURL: cloudinaryURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
