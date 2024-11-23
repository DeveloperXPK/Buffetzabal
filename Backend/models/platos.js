// Proposito: Modelo de platos

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const platoSchema = new Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    imagen: String
});

module.exports = mongoose.model('platos', platoSchema);