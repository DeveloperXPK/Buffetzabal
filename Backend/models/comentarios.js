// Proposito: Modelo de comentarios

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    usuario: {
        _id: { type: Schema.Types.ObjectId, ref: 'Usuario' },
        nombre: String,
        email: String
    },
    publicacion: {
        _id: { type: Schema.Types.ObjectId, ref: 'Plato' },
        nombre: String,
        descripcion: String
    },
    comentario: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('comentarios', comentarioSchema);