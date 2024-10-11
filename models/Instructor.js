const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  Programa: { type: String, required: true },
  Ficha: { type: Number, required: true }, // Mantiene el tipo numérico para "Ficha"
  'Nom Instructor': { type: String, required: true }, // Mantiene el nombre del instructor
  Cordinacion: { type: String, required: true } // Nuevo campo para "Cordinacion"
});

const Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;
