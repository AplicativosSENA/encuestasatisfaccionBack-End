const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const AprendizRouter = require('./controllers/Aprendiz');
// const InstructorRouter = require('./controllers/Instructor');

const app = express();

// Conectar a la base de datos MongoDB
const mongoURI = 'mongodb+srv://cerikdamian:g75TJEQ6zsu6Lswd@example.brptd.mongodb.net/Aprendices';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado a MongoDB...');
})
.catch(err => {
    console.error('No se pudo conectar con MongoDB:', err);
    process.exit(1); // Salir del proceso en caso de error
});

// Middlewares para el manejo de solicitudes JSON y CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Endpoint de prueba para verificar la conexión
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Conexión establecida con el frontend' });
});

// Rutas de la API
app.use('/api/aprendices', AprendizRouter);
// app.use('/api/instructor', InstructorRouter);

// Puerto de escucha
const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`API REST en funcionamiento en el puerto: ${port}`);
});
