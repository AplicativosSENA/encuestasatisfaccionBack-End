// routes/instructorRoutes.js
const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

// Obtener todos los instructores
router.get('/', async (req, res) => {
  try {
    const instructores = await Instructor.find();
    res.json(instructores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un instructor por ID
router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: 'Instructor no encontrado' });
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo instructor
router.post('/', async (req, res) => {
  const instructor = new Instructor(req.body);
  try {
    const nuevoInstructor = await instructor.save();
    res.status(201).json(nuevoInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un instructor
router.put('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!instructor) return res.status(404).json({ message: 'Instructor no encontrado' });
    res.json(instructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un instructor
router.delete('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) return res.status(404).json({ message: 'Instructor no encontrado' });
    res.json({ message: 'Instructor eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
