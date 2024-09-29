const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
    Ficha: { type: Number, required: true },
    Nombre: { type: String, required: true },
    Apellidos: { type: String, required: true },
    'Nom Instructor': { type: String, required: true },
    "El Instructor establece relaciones interpersonales cordiales, armoniosas, respetuosas": { type: String, required: true },
    "El Instructor socializa, desarrolla y evalúa la totalidad de los resultados de aprendizaje programados para el semestre": { type: String, required: true },
    "El instructor aplica estrategias participativas de trabajo en equipo que le permiten estar activo permanentemente en su proceso de aprendizaje": { type: String, required: true },
    "El Instructor le orienta su formación mediante un proyecto formativo": { type: String, required: true },
    "El Instructor incentiva al aprendiz a utilizar la plataforma Zajuna en el desarrollo de las actividades de aprendizaje":  { type: String, required: true },
    "El instructor orienta la formación por medio de guías teniendo en cuenta el proyecto formativo": { type: String, required: true },
    "El Instructor es puntual al iniciar las sesiones": { type: String, required: true },
    "El Instructor demuestra dominio técnico": { type: String, required: true },
    "El Instructor le propone fuentes de consulta (bibliografía, webgrafía…) y ayudas que facilitan su proceso de aprendizaje": { type: String, required: true },
    "El instructor brinda apoyo sobre temáticas del FPI (Formación Profesional Integral) cuando el aprendiz lo requiere y es comprensivo frente a dificultades": { type: String, required: true },
    "El Instructor revisa y asesora los planes de mejoramiento": { type: String, required: true },
    "El instructor, contribuye al mejoramiento actitudinal del aprendiz en su proceso de formación o El instructor contribuye al mejoramiento del aprendiz en su proceso de formación": { type: String, required: true },
    Feedback: { type: String, required: false }  // Campo opcional para comentarios adicionales
});

// Crear el modelo en base al esquema
const Respuesta = mongoose.model('Respuesta', RespuestaSchema);

module.exports = Respuesta;