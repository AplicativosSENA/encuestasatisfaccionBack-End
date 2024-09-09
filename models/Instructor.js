// models/Instructor.js
const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  Programa: { type: String, required: true },
  Ficha: { type: Number, required: true }, // Cambia a Number si tus datos son numéricos
  'Nom Instructor': { type: String, required: true },
});

const Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;