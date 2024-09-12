const express = require('express');
const router = express.Router();
const Respuesta = require('../models/Respuesta');

// Obtener todas las respuestas
router.get('/', async (req, res) => {
  try {
    const respuestas = await Respuesta.find();
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las respuestas', error });
  }
});

// Obtener respuestas por ficha
router.get('/respuestas/:ficha', async (req, res) => {
  try {
    const ficha = parseInt(req.params.ficha, 10); // Convertir el parámetro a número entero
    if (isNaN(ficha)) {
      return res.status(400).json({ message: 'Ficha debe ser un número' });
    }
    
    const respuestas = await Respuesta.find({ Ficha: ficha });
    if (respuestas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron respuestas' });
    }
    res.json(respuestas);
  } catch (error) {
    console.error('Error al obtener respuestas:', error);
    res.status(500).json({ message: 'Error al obtener respuestas', error });
  }
});

// Obtener una respuesta por ID
router.get('/:id', async (req, res) => {
  try {
    const respuesta = await Respuesta.findById(req.params.id);
    if (!respuesta) return res.status(404).json({ message: 'Respuesta no encontrada' });
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la respuesta', error });
  }
});

// Crear una nueva respuesta
router.post('/', async (req, res) => {
  const nuevaRespuesta = new Respuesta(req.body);
  try {
    const respuestaGuardada = await nuevaRespuesta.save();
    res.status(201).json(respuestaGuardada);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la respuesta', error });
  }
});

// Actualizar una respuesta por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedResponse = await Respuesta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedResponse) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }

    res.json(updatedResponse);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la respuesta', error });
  }
});

// Eliminar una respuesta por ID
router.delete('/:id', async (req, res) => {
  try {
    const respuestaEliminada = await Respuesta.findByIdAndDelete(req.params.id);
    if (!respuestaEliminada) return res.status(404).json({ message: 'Respuesta no encontrada' });
    res.json({ message: 'Respuesta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la respuesta', error });
  }
});

module.exports = router;
