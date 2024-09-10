const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
    Ficha: { type: Number, required: true },
    Nombre: { type: String, required: true },
    Apellidos: { type: String, required: true },
    'Nom Instructor': { type: String, required: true },
    "El Instructor establece relaciones interpersonales cordiales, armoniosas, respetuosas": { type: String },
    "El Instructor socializa, desarrolla y evalúa la totalidad de los resultados de aprendizaje programados para el semestre": { type: String },
    "El instructor aplica estrategias participativas de trabajo en equipo que le permiten estar activo permanentemente en su proceso de aprendizaje": { type: String },
    "El Instructor le orienta su formación mediante un proyecto formativo": { type: String },
    "El Instructor incentiva al aprendiz a utilizar la plataforma Territorium en el desarrollo de las actividades de aprendizaje": { type: String },
    "El instructor orienta la formación por medio de guías teniendo en cuenta el proyecto formativo": { type: String },
    "El Instructor es puntual al iniciar las sesiones": { type: String },
    "El Instructor demuestra dominio técnico": { type: String },
    "El Instructor le propone fuentes de consulta (bibliografía, webgrafía…) y ayudas que facilitan su proceso de aprendizaje": { type: String },
    "El instructor brinda apoyo sobre temáticas del FPI cuando el aprendiz lo requiere y es comprensivo frente a dificultades personales direccionando al área competente": { type: String },
    "El Instructor revisa y asesora los planes de mejoramiento": { type: String },
    "El instructor, contribuye al mejoramiento actitudinal del aprendiz en su proceso de formación o El instructor contribuye al mejoramiento del aprendiz en su proceso de formación": { type: String }
});

const Respuesta = mongoose.model('Respuesta', RespuestaSchema);

module.exports = Respuesta;
