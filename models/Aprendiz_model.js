const mongoose = require('mongoose');

const AprendizSchema = new mongoose.Schema({
    Ficha: {
        type: String,
        required: true
    },
    Sede: {
        type: String,
        required: true
    },
    Jornada: {
        type: String,
        required: true
    },
    Numero_De_Documento: {
        type: String,
        required: true,
        unique: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Apellidos: {
        type: String,
        required: true
    },
    Celular: {
        type: String,
        required: true
    },
    Correo_Electronico: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Aprendiz', AprendizSchema);
