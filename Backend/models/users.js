// Propósito: Definir el modelo de la colección de usuarios

const mongoose = require('mongoose'); // Importamos la librería mongoose
const Schema = mongoose.Schema; // Importamos el constructor de esquemas de mongoose

// Definimos el esquema de la colección de usuarios
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    rol: String // admin, client, employee
})

// Exportamos el modelo
module.exports = mongoose.model('usuarios', userSchema);