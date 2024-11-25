const Comentario = require('../models/comentarios');
const Plato = require('../models/platos');

// Funcion para crear un nuevo comentario
function createComment(req, res) {

    // Buscamos el plato al que pertenece el comentario por su id
    Plato.findById(req.params.platoId)
        .then(
            plato => {
                const newComment = new Comentario({

                    // Asociamos el comentario con el usuario que lo realizo
                    // los datos del usuario se obtienen del token de autenticacion
                    // que se encuentra en req.user
                    usuario: req.user,

                    // Asociamos el comentario con la publicacion a la que pertenece
                    // los datos de la publicacion se obtienen del body de la peticion
                    publicacion: plato,

                    // Definimos el contenido del comentario
                    comentario: req.body.comentario,

                    // Definimos la fecha de creacion del comentario
                    fecha: Date.now()
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
        )

}

// Funcion para editar un comentario
function editComment(req, res) {

    // Obtenemos el id del comentario a editar desde la url
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

// Eliminacion de comentario
function deleteComment(req, res) {

    // Obtenemos el id del comentario a eliminar desde la url
    const idComment = req.params.comentarioId;

    Comentario.findByIdAndDelete(idComment)
        .then(
            comentario => {
                res.status(200).send({
                    "Comentario Eliminado": comentario
                });
            },
            err => {
                res.status(500).send({
                    "Error": "No se pudo eliminar el comentario",
                    message: err
                })
            }
        )
}

// Obtengamos todos los comentarios
function getComments(req, res) {
    Comentario.find()
        .then(
            comentarios => {
                res.status(200).send({ Comentarios: comentarios });
            },
            err => {
                res.status(500).send({
                    "Error": "No se pudieron obtener los comentarios",
                    message: err
                })
            }
        )
}

// Obtengamos un comentario por su ID
function getCommentById(req, res) {

    const idComment = req.params.comentarioId

    Comentario.findById(idComment)
        .then(
            comentario => {
                res.status(200).send({ Comentario: comentario });
            },
            err => {
                res.status(500).send({
                    "Error": "No se pudo obtener el comentario",
                    message: err
                })
            }
        )
}

module.exports = {
    createComment,
    editComment,
    deleteComment,
    getComments,
    getCommentById
}