const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

// Obtener todos los instructores de la coordinación "ARTES ESCÉNICAS" sin repetir el nombre (Nom Instructor)
router.get('/Artes_Escenicas', async (req, res) => {
  try {
    // Usamos agregación para filtrar por la coordinación "ARTES ESCÉNICAS" y agrupar por nombre
    const instructoresUnicos = await Instructor.aggregate([
      {
        $match: {
          coordinacion: 'ARTES ESCÉNICAS'  // Filtrar solo los de la coordinación "ARTES ESCÉNICAS"
        }
      },
      {
        $group: {
          _id: '$Nom Instructor',  // Agrupar por el nombre del instructor
          instructor: { $first: '$$ROOT' }  // Seleccionar el primer documento completo para cada grupo
        }
      }
    ]);

    // Comprobamos si no hay resultados
    if (instructoresUnicos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron instructores para la coordinación "ARTES ESCÉNICAS".' });
    }

    // Mapeamos el resultado para devolver solo los datos del instructor
    res.status(200).json(instructoresUnicos.map((i) => i.instructor));
  } catch (error) {
    console.error('Error al obtener instructores únicos:', error);
    res.status(500).json({ message: 'Error al obtener instructores únicos', error: error.message });
  }
});

// Obtener todos los instructores de la coordinación "DEPORTES" sin repetir el nombre (Nom Instructor)
router.get('/Deportes', async (req, res) => {
  try {
    // Usamos agregación para filtrar por la coordinación "DEPORTES" y agrupar por nombre
    const instructoresUnicos = await Instructor.aggregate([
      {
        $match: {
          coordinacion: 'DEPORTES'  // Filtrar solo los de la coordinación "DEPORTES"
        }
      },
      {
        $group: {
          _id: '$Nom Instructor',  // Agrupar por el nombre del instructor
          instructor: { $first: '$$ROOT' }  // Seleccionar el primer documento completo para cada grupo
        }
      }
    ]);

    // Comprobamos si no hay resultados
    if (instructoresUnicos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron instructores para la coordinación "DEPORTES".' });
    }

    // Mapeamos el resultado para devolver solo los datos del instructor
    res.status(200).json(instructoresUnicos.map((i) => i.instructor));
  } catch (error) {
    console.error('Error al obtener instructores únicos:', error);
    res.status(500).json({ message: 'Error al obtener instructores únicos', error: error.message });
  }
});


// Obtener todos los instructores de la coordinación "MUSICA Y AUDIOVISUALES" sin repetir el nombre (Nom Instructor)
router.get('/Musica_Audiovisuales', async (req, res) => {
  try {
    // Usamos agregación para filtrar por la coordinación "MUSICA Y AUDIOVISUALES" y agrupar por nombre
    const instructoresUnicos = await Instructor.aggregate([
      {
        $match: {
          coordinacion: 'MUSICA Y AUDIOVISUALES'  // Filtrar solo los de la coordinación "DEPORTES"
        }
      },
      {
        $group: {
          _id: '$Nom Instructor',  // Agrupar por el nombre del instructor
          instructor: { $first: '$$ROOT' }  // Seleccionar el primer documento completo para cada grupo
        }
      }
    ]);

    // Comprobamos si no hay resultados
    if (instructoresUnicos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron instructores para la coordinación "MUSICA Y AUDIOVISUALES".' });
    }

    // Mapeamos el resultado para devolver solo los datos del instructor
    res.status(200).json(instructoresUnicos.map((i) => i.instructor));
  } catch (error) {
    console.error('Error al obtener instructores únicos:', error);
    res.status(500).json({ message: 'Error al obtener instructores únicos', error: error.message });
  }
});

module.exports = router;
