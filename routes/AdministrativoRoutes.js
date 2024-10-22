const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor'); // Ajusta la ruta según tu estructura de archivos
const Administrativo = require('../models/Administrativo'); // Asegúrate de que esta ruta sea correcta
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Asegúrate de importar bcryptjs

// Endpoint para obtener instructores únicos por nombre
router.get('/instructor', async (req, res) => {
  try {
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




// Ruta para obtener todas las fichas de instructores seleccionados por su nombre
router.get('/ficha/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;

    // Buscar todos los instructores que coincidan con el nombre
    const instructores = await Instructor.find({ 'Nom Instructor': nombre });
    
    if (!instructores.length) {
      return res.status(404).json({ message: 'No se encontraron instructores con ese nombre' });
    }

    // Obtener todas las fichas de todos los instructores encontrados
    const todasLasFichas = instructores.flatMap(instructor => instructor.Ficha);

    // Devolver las fichas como un array
    res.json({ nombre: nombre, fichas: todasLasFichas });
  } catch (error) {
    console.error('Error al obtener las fichas de los instructores:', error);
    res.status(500).json({ message: 'Error al obtener las fichas de los instructores', error });
  }
});









// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const usuario = await Administrativo.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verifica la contraseña usando bcryptjs
    const esValido = await usuario.compararContraseña(contraseña);
    if (!esValido) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar un token personalizado
    let token;
    if (usuario.nombre === "Julio Alejandro Sanabria Vargas") {
      token = jwt.sign({ id: usuario._id }, 'clave_secreta_julio', { expiresIn: '1h' });
      return res.json({ token, esAdministrativo: true, coordinacion: usuario.coordinacion });
    } else if (usuario.coordinacion === "ARTES ESCÉNICAS") {
      token = jwt.sign({ id: usuario._id }, 'clave_secreta_artes', { expiresIn: '1h' });
    } else if (usuario.coordinacion === "DEPORTES") {
      token = jwt.sign({ id: usuario._id }, 'clave_secreta_deportes', { expiresIn: '1h' });
    } else if (usuario.coordinacion === "MUSICA Y AUDIOVISUALES") {
      token = jwt.sign({ id: usuario._id }, 'clave_secreta_musica', { expiresIn: '1h' });
    } else {
      // Token genérico para otros coordinadores
      token = jwt.sign({ id: usuario._id }, 'clave_secreta_generica', { expiresIn: '1h' });
    }

    // Retorna el token y la coordinación del usuario
    return res.json({ token, esAdministrativo: false, coordinacion: usuario.coordinacion });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
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
