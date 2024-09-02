// models/Instructor.js
const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  area: { type: String },
  correoElectronico: { type: String, required: true },
  numeroDocumento: { type: Number, required: true, unique: true },
  celular: { type: Number },
});

module.exports = mongoose.model('Instructor', InstructorSchema);
