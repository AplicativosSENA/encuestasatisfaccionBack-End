const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor'); // Ajusta la ruta según tu estructura de archivos
const Administrativo = require('../models/Administrativo'); // Asegúrate de que esta ruta sea correcta
const jwt = require('jsonwebtoken');

// Endpoint para obtener instructores únicos por nombre
router.get('/instructor', async (req, res) => {
  try {
    // Obtenemos instructores únicos por su nombre
    const instructores = await Administrativo.aggregate([
      { $group: { _id: '$Nom Instructor', instructor: { $first: '$$ROOT' } } },
    ]).exec();
    res.status(200).json(instructores.map((i) => i.instructor));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los instructores' });
  }
});

// Ruta para registrar un nuevo administrativo
router.post('/', async (req, res) => {
  const { nombre, correo, contraseña, coordinacion } = req.body;

  try {
    // Crear nuevo administrativo
    const nuevoAdministrativo = new Administrativo({
      nombre,
      correo,
      contraseña, // Esto se encriptará antes de guardarse gracias al pre-save hook
      coordinacion
    });

    // Guardar en la base de datos
    await nuevoAdministrativo.save();
    res.status(201).json({ message: 'Administrativo creado exitosamente' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'El correo ya está registrado' });
    } else {
      res.status(500).json({ message: 'Error al crear el administrativo', error });
    }
  }
});

// Endpoint para obtener todas las fichas del instructor seleccionado por su nombre
router.get('/instructor/ficha/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params; // Obtener el nombre del instructor del parámetro de la URL
    const fichas = await Instructor.find({ 'Nom Instructor': nombre }).select('Ficha').exec();

    if (!fichas.length) {
      return res.status(404).json({ message: 'No se encontraron fichas para este instructor' });
    }

    // Extraer las fichas y devolverlas como un array
    const fichaArray = fichas.map((item) => item.Ficha);
    res.json({ fichas: fichaArray });
  } catch (error) {
    console.error('Error al obtener las fichas del instructor:', error);
    res.status(500).json({ message: 'Error al obtener las fichas del instructor', error });
  }
});


// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Buscar al administrativo por el correo
    const admin = await Administrativo.findOne({ correo });
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    // Comparar la contraseña
    const match = await admin.compararContraseña(contraseña);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear un token JWT que incluya la coordinación
    const token = jwt.sign({ id: admin._id, coordinacion: admin.coordinacion }, 'Erik12345', { expiresIn: '1h' });

    // Imprimir la coordinación en consola para depuración
    console.log('Coordinación del administrativo:', admin.coordinacion);

    let instructores = [];
    // Obtener instructores según la coordinación del administrativo
    if (admin.nombre === "Julio Alejandro Sanabria Vargas") {
      instructores = await Instructor.find().exec(); // Obtén todos los instructores para Julio
    } else {
      instructores = await Instructor.find({ coordinacion: admin.coordinacion }).exec(); // Instructores de su coordinación
    }

    res.status(200).json({ token, instructores });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
});






// Ruta para actualizar un instructor por ID
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
router.delete('/instructor/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByIdAndDelete(id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor no encontrado' });
    }
    res.status(200).json({ message: 'Instructor eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el instructor', error });
  }
});

module.exports = router;
