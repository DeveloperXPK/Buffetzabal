// Proposito: Modelo de comentarios

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({

    // Asociamos el comentario con el usuario que lo realizo
    usuario: {
        _id: { type: Schema.Types.ObjectId, ref: 'usuarios' },
        nombre: String,
        email: String
    },

    // Asociamos el comentario con la publicacion a la que pertenece
    publicacion: {
        _id: { type: Schema.Types.ObjectId, ref: 'platos' },
        nombre: String,
        descripcion: String
    },

    // Definimos el contenido del comentario
    comentario: {
        type: String,
        required: true
    },

    // Definimos la fecha de creacion del comentario
    fecha: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('comentarios', comentarioSchema);