const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el middleware cors
require('dotenv').config();

const RespuestaController = require('./controllers/RespuestaController');

const app = express();
const port = process.env.PORT || 5000;

// Middleware para analizar JSON
app.use(express.json());

// Configuración de CORS para permitir solicitudes solo desde Netlify
app.use(cors({
  origin: ['http://localhost:3000', 'https://main--magical-gumption-afc4f8.netlify.app', 'https://main--glistening-marzipan-sena.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Ruta principal
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Importar rutas
const aprendizRoutes = require('./routes/aprendizRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const RespuestasRoutes = require('./routes/RespuestasRoutes');
const AdministrativoRoutes = require('./routes/AdministrativoRoutes');

// Usar las rutas
app.use('/api/aprendices', aprendizRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/respuestas', RespuestasRoutes);
app.use('/api/administrativo', AdministrativoRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
