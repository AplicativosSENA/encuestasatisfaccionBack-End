const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  Programa: { type: String, required: true },
  Ficha: [{ type: Number, required: true }], // Ficha como un array
  'Nom Instructor': { type: String, required: true },
  coordinacion: { type: String, required: true } // Campo para la Coordinación
});

const Instructor = mongoose.model('Instructor', InstructorSchema);
module.exports = Instructor;
