const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el middleware cors
require('dotenv').config();

const RespuestaController = require('./controllers/RespuestaController');

const app = express();
const port = process.env.PORT || 5000;

// Middleware para analizar JSON
app.use(express.json());

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000', // Permite solicitudes desde tu frontend en el puerto 3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

  app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
  });

  
// Importar rutas
const aprendizRoutes = require('./routes/aprendizRoutes');
const instructorRoutes = require('./routes/instructorRoutes'); // Asegúrate de este path
const RespuestasRoutes = require('./routes/RespuestasRoutes'); // Asegúrate de este path
const AdministrativoRoutes = require('./routes/AdministrativoRoutes'); // Asegúrate de este path

// Usar las rutas
app.use('/api/aprendices', aprendizRoutes);
app.use('/api/instructor', instructorRoutes); // Asegúrate de usar el path correcto y que no haya errores tipográficos
app.use('/api/respuestas', RespuestasRoutes); // Asegúrate de usar el path correcto y que no haya errores tipográficos
app.use('/api/administrativo', AdministrativoRoutes); // Asegúrate de usar el path correcto y que no haya errores tipográficos

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
