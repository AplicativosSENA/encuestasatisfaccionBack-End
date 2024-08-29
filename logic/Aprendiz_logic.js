const Aprendiz = require('../models/Aprendiz_model');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = Joi.object({
    Ficha: Joi.string().required(),
    Sede: Joi.string().min(3).max(30).required(),
    Jornada: Joi.string().required(),
    Numero_De_Documento: Joi.string().required(),
    Nombre: Joi.string().required(),
    Apellidos: Joi.string().min(3).max(30).required(),
    Celular: Joi.string().required(),
    Correo_Electronico: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } }).required(),
    password: Joi.string().required()
});

// Create Aprendiz
async function createAprendiz(data) {
    try {
        const emailExists = await checkAprendizExists(data.Correo_Electronico);
        if (emailExists) {
            throw new Error('Este correo electrónico ya está registrado');
        }

        const validatedData = await Schema.validateAsync(data);
        validatedData.password = await bcrypt.hash(data.password, 10);

        const aprendiz = new Aprendiz(validatedData);
        return await aprendiz.save();
    } catch (error) {
        throw new Error("Error creando aprendiz: " + error.message);
    }
}

// Update Aprendiz
async function updateAprendiz(correoElectronico, data) {
    try {
        const aprendiz = await Aprendiz.findOne({ Correo_Electronico: correoElectronico });
        if (!aprendiz) {
            throw new Error("Aprendiz no encontrado");
        }

        for (const key in data) {
            if (data[key]) {
                aprendiz[key] = data[key];
            }
        }
        return await aprendiz.save();
    } catch (error) {
        throw new Error("Error actualizando aprendiz: " + error.message);
    }
}

// Check if an Aprendiz Exists
async function checkAprendizExists(identifier) {
    try {
        const aprendiz = await Aprendiz.findOne({
            $or: [{ Correo_Electronico: identifier }, { Numero_De_Documento: identifier }]
        });
        return !!aprendiz;
    } catch (error) {
        throw new Error('Error verificando la existencia del aprendiz: ' + error.message);
    }
}

// Deactivate Aprendiz
async function deactivateAprendiz(correoElectronico) {
    try {
        return await Aprendiz.findOneAndUpdate({ Correo_Electronico: correoElectronico }, { estado: false }, { new: true });
    } catch (error) {
        throw new Error("Error desactivando aprendiz: " + error.message);
    }
}

// List Active Aprendiz
async function listActiveAprendices() {
    try {
        const aprendices = await Aprendiz.find({ estado: true });
        return aprendices;
    } catch (error) {
        throw new Error("Error listando aprendices activos: " + error.message);
    }
}

// Authenticate Aprendiz
async function authenticateAprendiz(correoElectronico, numeroDocumento) {
    try {
        const aprendiz = await Aprendiz.findOne({ Correo_Electronico: correoElectronico });
        if (!aprendiz) {
            return { error: 'Aprendiz no encontrado' };
        }

        const isMatch = aprendiz.Numero_De_Documento === numeroDocumento;
        if (!isMatch) {
            return { error: 'Documento incorrecto' };
        }

        return { message: 'success', aprendiz };
    } catch (error) {
        throw new Error("Error autenticando aprendiz: " + error.message);
    }
}

// Reset Password
async function resetAprendizPassword(identifier, newPassword) {
    try {
        let aprendiz = validator.isEmail(identifier) 
            ? await Aprendiz.findOne({ Correo_Electronico: identifier })
            : await Aprendiz.findOne({ Numero_De_Documento: identifier });

        if (!aprendiz) return false;

        aprendiz.password = await bcrypt.hash(newPassword, 10);
        await aprendiz.save();

        return true;
    } catch (error) {
        throw new Error('Error restableciendo contraseña del aprendiz: ' + error.message);
    }
}

module.exports = {
    createAprendiz,
    updateAprendiz,
    deactivateAprendiz,
    listActiveAprendices,
    checkAprendizExists,
    authenticateAprendiz,
    resetAprendizPassword
};
