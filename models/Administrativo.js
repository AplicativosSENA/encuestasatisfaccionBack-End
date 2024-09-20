const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdministrativoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true }
});

// Encriptar la contraseña antes de guardar el documento
AdministrativoSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
AdministrativoSchema.methods.compararContraseña = async function(contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

const Administrativo = mongoose.model('Administrativo', AdministrativoSchema);

module.exports = Administrativo;
