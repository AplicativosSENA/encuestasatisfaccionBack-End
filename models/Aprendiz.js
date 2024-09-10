const mongoose = require('mongoose');

const aprendizSchema = new mongoose.Schema({
  Ficha: { type: Number, required: true },
  Sede: { type: String, required: true },
  Jornada: { type: String, required: true },
  Número_de_Documento: { type: Number, required: true, unique: true },
  Nombre: { type: String, required: true },
  Apellidos: { type: String, required: true },
  Celular: { type: Number, required: true },
  Correo_Electrónico: { type: String, required: true },
});

const Aprendiz = mongoose.model('Aprendiz', aprendizSchema);

module.exports = Aprendiz;
