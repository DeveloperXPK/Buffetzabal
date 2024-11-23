const Comentario = require('../models/comentarios');

// Funcion para crear un nuevo comentario
function createComment(req, res) {

    // Obtenemos los datos del comentario desde el body
    const {
        comentario
    } = req.body;


    const {
        _id,
        username,
        email
    } = req.user;


    // Creamos un nuevo comentario con los datos obtenidos
    const newComment = new Comentario({
        usuario: {
            _id: _id,
            username: username,
            email: email
        }
    });

    // Guardamos el comentario en la base de datos
    newComment.save()
        .then(
            // Si se guardo correctamente, enviamos un mensaje de exito
            (newComment) => {
                res.status(201).send({
                    "Comentario Creado": newComment
                });
            },
            // Si hubo un error, enviamos un mensaje de error
            (err) => {
                res.status(500).send({
                    "Error": "No se pudo crear el comentario",
                    message: err
                })
            }
        )
}

// Funcion para editar un comentario
function editComment(req, res) {
    const idComment = req.params.comentarioId;

    // Obtenemos los datos del comentario desde el body
    const {
        comentario
    } = req.body;

    // Editamos el comentario con los datos obtenidos
    const updateComment = new Comentario({
        _id: idComment,
        comentario: comentario
    });

    Comentario.findByIdAndUpdate(idComment, updateComment, { new: true })
        .then(
            // Si se edito correctamente, enviamos un mensaje de exito
            (updateComment) => {
                res.status(201).send({
                    "Comentario Editado": updateComment
                });
            },
            // Si hubo un error, enviamos un mensaje de error
            (err) => {
                res.status(500).send({
                    "Error": "No se pudo editar el comentario",
                    message: err
                })
            }
        )
}

module.exports = {
    createComment,
    editComment
}