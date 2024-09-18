const Respuesta = require('../models/Respuesta');

exports.saveRespuestas = async (req, res) => {
  const { Ficha, Nombre, Apellidos, 'Nom Instructor': nomInstructor, Responses } = req.body;

  // Crear un objeto con los campos del esquema
  const respuestas = {
    Ficha,
    Nombre,
    Apellidos,
    'Nom Instructor': nomInstructor
  };

  // Mapear las respuestas a los campos del esquema
  Responses.forEach((respuesta) => {
    const pregunta = respuesta.question;
    const respuestaValue = respuesta.response;

    // Asegurarse de que la pregunta exista en el esquema antes de asignar
    if (respuestas[pregunta]) {
      respuestas[pregunta] = respuestaValue;
    }
  });

  try {
    // Verificar si el aprendiz ya calificó a este instructor
    const calificacionExistente = await Respuesta.findOne({
      Nombre,
      Apellidos,
      'Nom Instructor': nomInstructor
    });

    // Si ya existe una calificación para este aprendiz e instructor, devolver un error
    if (calificacionExistente) {
      return res.status(400).json({ message: 'Este aprendiz ya ha calificado a este instructor.' });
    }

    // Si no existe, guardar la nueva respuesta
    const nuevaRespuesta = new Respuesta(respuestas);
    await nuevaRespuesta.save();
    res.status(201).json({ message: 'Respuestas guardadas exitosamente' });
  } catch (error) {
    console.error('Error al guardar respuestas:', error);
    res.status(500).json({ message: 'Error al guardar respuestas' });
  }
};