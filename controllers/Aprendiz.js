const express = require('express');
const router = express.Router();
const logic = require('../logic/Aprendiz_logic');
const nodemailer = require('nodemailer');

// Endpoint to send a password reset email
router.post('/send-email', async (req, res) => {
    const { email } = req.body;

    try {
        const aprendizExists = await logic.checkAprendizExists(email);
        if (!aprendizExists) {
            return res.status(404).json({ error: 'Aprendiz no encontrado' });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Restablecimiento de contraseña',
            text: 'Hola, has solicitado restablecer tu contraseña. Por favor, dirígete al siguiente enlace para restablecer la contraseña: http://localhost:3000/resetPassword.'
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(400).json({ error: 'No se pudo enviar el correo electrónico' });
    }
});

// Check if an Aprendiz exists
router.post('/check-account', async (req, res) => {
    try {
        const { email } = req.body;
        const exists = await logic.checkAprendizExists(email);
        res.json({ aprendizExists: exists });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint to authenticate an Aprendiz
router.post('/auth', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await logic.authenticateAprendiz(email, password);

        if (result.error) {
            return res.status(401).json({ message: 'failed', error: result.error });
        }

        res.json({ message: 'success', aprendizType: result.aprendizType, aprendiz: result.aprendiz });
    } catch (error) {
        console.error('Error al autenticar aprendiz:', error);
        res.status(500).json({ message: 'failed', error: 'Error al autenticar aprendiz. Por favor, inténtalo de nuevo más tarde.' });
    }
});

// Get all active Aprendices
router.get('/', async (req, res) => {
    try {
        const aprendices = await logic.listActiveAprendices();
        res.json(aprendices);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an Aprendiz
router.put('/update', async (req, res) => {
    try {
        const { correoElectronico, data } = req.body;
        const updatedAprendiz = await logic.updateAprendiz(correoElectronico, data);
        res.json(updatedAprendiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Deactivate an Aprendiz
router.post('/deactivate', async (req, res) => {
    try {
        const { correoElectronico } = req.body;
        const result = await logic.deactivateAprendiz(correoElectronico);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create an Aprendiz
router.post('/create', async (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body); // Debugging line

    try {
        const aprendiz = await logic.createAprendiz(req.body);
        res.json({ aprendiz });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
