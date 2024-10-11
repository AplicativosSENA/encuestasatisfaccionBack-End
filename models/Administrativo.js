const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdministrativoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  coordinacion: { type: String, required: true } // Campo para la Coordinación
});

// Middleware para encriptar la contraseña antes de guardar
AdministrativoSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

// Método para comparar contraseñas
AdministrativoSchema.methods.compararContraseña = async function (inputContraseña) {
  return bcrypt.compare(inputContraseña, this.contraseña);
};

module.exports = mongoose.model('Administrativo', AdministrativoSchema);
