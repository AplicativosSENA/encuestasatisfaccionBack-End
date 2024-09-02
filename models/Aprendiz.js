const mongoose = require('mongoose');

const aprendizSchema = new mongoose.Schema({
  ficha: { type: Number, required: true },
  sede: { type: String, required: true },
  jornada: { type: String, required: true },
  Numero_De_Documento: {
    type: String,
    required: true,
    unique: true
},
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  celular: { type: Number, required: true },
  correoElectronico: { type: String, required: true },
  relacionInterpersonal: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  socializacionResultados: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  estrategiasParticipativas: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  orientacionFormacion: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  incentivoPlataforma: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  orientacionGuias: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  puntualidadSesiones: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  dominioTecnico: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  fuentesConsulta: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  apoyoFPI: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  asesoriaPlanes: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  },
  mejoramientoActitudinal: { 
    type: String, 
    enum: ['Muy Satisfecho', 'Satisfecho', 'Neutro', 'Insatisfecho', 'Muy Insatisfecho'], 
    required: true 
  }
});

module.exports = mongoose.model('Aprendiz', aprendizSchema);
