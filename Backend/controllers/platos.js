// Proposito: Contiene las funciones para crear y editar platos
const { default: mongoose } = require('mongoose');
const comentarios = require('../models/comentarios');
const Plato = require('../models/platos');


// Funcion para crear un nuevo plato
function createPlate(req, res) {

    // Creamos un nuevo plato con los datos obtenidos
    const newPlate = new Plato({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        imagen: req.body.imagen
    });

    // Guardamos el plato en la base de datos
    newPlate.save()
        .then(
            // Si se guardo correctamente, enviamos un mensaje de exito
            (newPlate) => {
                res.status(201).send({
                    "Plato Creado": newPlate
                });
            },
            // Si hubo un error, enviamos un mensaje de error
            (err) => {
                res.status(500).send({
                    "Error": "No se pudo crear el plato",
                    message: err
                })
            }
        )
}

// Funcion para editar un plato
function uploadPlate(req, res) {

    // Obtenemos el ID del plato desde los parametros (URL)
    const idPlate = req.params.platoId;

    // Editamos el plato con los datos obtenidos
    const updatePlate = new Plato({
        _id: idPlate,
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
    });

    // Buscamos el plato por su id y lo editamos
    Plato.findByIdAndUpdate(idPlate, updatePlate, { new: true })
        .then(
            // Si se edito correctamente, enviamos un mensaje de exito
            (updatedPlate) => {
                res.status(201).send({
                    "Plato Editado": updatedPlate
                });
            },
            // Si hubo un error, enviamos un mensaje de error
            (err) => {
                res.status(500).send({
                    "Error": "No se pudo editar el plato",
                    message: err
                })
            }
        )
}

// Funcion para obtener todos los platos
function getPlates(req, res) {
    Plato.find() // Buscamos todos los platos
        .then(
            (plates) => {
                res.status(200).send({ Platos: plates });

            },
            (err) => {
                res.status(500).send({
                    "Error": "No se pudieron obtener los platos",
                    message: err
                })
            }
        )
}

// Funcion para obtener un plato por su ID
function getPlateById(req, res) {
    const idPlato = req.params.platoId // Obtenemos el id del plato desde los parametros (URL)

    Plato.findById(idPlato) // Buscamos el plato por su id
        .then(
            (plate) => {

                /**
                 * Al obtener el plato, buscamos los comentarios asociados a ese plato
                 * mediante su objectId
                 */
                comentarios.find({ "publicacion._id": mongoose.Types.ObjectId(idPlato) })
                    .then(
                        (comments) => {
                            res.status(200).send({ Plato: plate, Comentarios: comments });
                        },
                        (err) => {
                            res.status(500).send({
                                "Error": "No se pudieron obtener los comentarios",
                                message: err
                            })
                        }
                    )
            },
            (err) => {
                res.status(500).send({
                    "Error": "No se pudo obtener el plato",
                    message: err
                })
            }
        )
}

// Funcion para obtener platos por categoria
function getPlatesByCategory(req, res) {
    const categoria = req.params.categoria // Obtenemos la categoria desde los parametros (URL)

    Plato.find({ categoria: categoria }) // Buscamos los platos por categoria
        .then(
            (plates) => {
                res.status(200).send({ Platos: plates });
            },
            (err) => {
                res.status(500).send({
                    "Error": "No se pudieron obtener los platos",
                    message: err
                })
            }
        )
}

// Funcion para eliminar un plato por su ID 
function deletePlateById(req, res) {

    // Obtenemos el id del plato desde los parametros (URL)
    const idPlato = req.params.platoId

    // Buscamos el plato por su id y lo eliminamos
    Plato.findByIdAndDelete(idPlato)
        .then(
            (plate) => {
                res.status(200).send({
                    Accion: 'Plato eliminado',
                    Plato: plate
                });
            },
            err => {
                res.status(500).send({
                    Error: 'No se pudo eliminar el plato',
                    message: err
                });
            }
        )
}

module.exports = {
    createPlate,
    uploadPlate,
    getPlates,
    getPlateById,
    getPlatesByCategory,
    deletePlateById
}