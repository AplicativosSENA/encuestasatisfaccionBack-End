const express = require('express');
const router = express.Router();
const Aprendiz = require('../models/Aprendiz');

// Obtener todos los aprendices
router.get('/', async (req, res) => {
  try {
    const aprendices = await Aprendiz.find();
    res.status(200).json(aprendices);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los aprendices' });
  }
});

// Ruta para actualizar un aprendiz
router.put('/:id', async (req, res) => {
  try {
    const updatedAprendiz = await Aprendiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAprendiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar un aprendiz
router.put('/aprendiz/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAprendiz = await Aprendiz.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedAprendiz) {
      return res.status(404).json({ message: "Aprendiz no encontrado" });
    }
    res.json(updatedAprendiz);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el aprendiz", error });
  }
});

// Eliminar un aprendiz por ID
router.delete('/:id', async (req, res) => {
  try {
    await Aprendiz.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Aprendiz eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el aprendiz', error });
  }
});

module.exports = router;
