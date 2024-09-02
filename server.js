const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware para analizar JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

  
// Importar rutas
const aprendizRoutes = require('./routes/aprendizRoutes');

// Usar las rutas
app.use('/api/aprendices', aprendizRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
