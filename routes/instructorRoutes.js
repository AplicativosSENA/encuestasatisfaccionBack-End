const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');
const Aprendiz = require('../models/Aprendiz');

// Obtener todos los instructores
router.get('/', async (req, res) => {
  try {
    const instructores = await Instructor.find();
    res.status(200).json(instructores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los instructores' });
  }
});

// routes/instructorRoutes.js
router.get('/ficha/:ficha', async (req, res) => {
  const { ficha } = req.params;
  console.log('Ficha solicitada:', ficha); // Verifica el valor recibido

  try {
    // Encuentra el aprendiz con la ficha proporcionada
    const aprendiz = await Aprendiz.findOne({ Ficha: parseInt(ficha, 10) });
    if (!aprendiz) {
      return res.status(404).json({ message: 'Aprendiz no encontrado para la ficha proporcionada' });
    }

    // Encuentra los instructores relacionados con la ficha del aprendiz
    const instructores = await Instructor.find({ Ficha: parseInt(ficha, 10) });
    console.log('Instructores encontrados:', instructores); // Verifica los instructores encontrados
    if (instructores.length === 0) {
      return res.status(404).json({ message: 'No se encontraron instructores para la ficha proporcionada' });
    }
    
    res.status(200).json(instructores);
  } catch (error) {
    console.error('Error al obtener los instructores:', error);
    res.status(500).json({ message: 'Error al obtener los instructores', error: error.message });
  }
});



// Ruta para actualizar un instructor por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInstructor) {
      return res.status(404).json({ message: 'Instructor no encontrado' });
    }
    res.json(updatedInstructor);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el instructor', error });
  }
});

// Ruta alternativa para actualizar un instructor por ID
router.put('/instructor/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedInstructor = await Instructor.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedInstructor) {
      return res.status(404).json({ message: 'Instructor no encontrado' });
    }
    res.json(updatedInstructor);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el instructor', error });
  }
});

// Eliminar un instructor por ID
router.delete('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor no encontrado' });
    }
    res.status(200).json({ message: 'Instructor eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el instructor', error });
  }
});

module.exports = router;
