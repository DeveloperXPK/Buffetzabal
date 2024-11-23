// Proposito: Contiene las funciones para crear y editar platos
const Plato = require('../models/platos');


// Funcion para crear un nuevo plato
function createPlate(req, res) {

    // Obtenemos los datos del plato desde el body
    const {
        nombre,
        precio,
        descripcion,
        imagen
    } = req.body;


    // Creamos un nuevo plato con los datos obtenidos
    const newPlate = new Plato({
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        imagen: imagen
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
    const idPlate = req.params.platoId;

    // Obtenemos los datos del plato desde el body
    const {
        nombre,
        precio,
        descripcion,
        imagen
    } = req.body;

    // Editamos el plato con los datos obtenidos
    const updatePlate = new Plato({
        _id: idPlate,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        imagen: imagen
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


module.exports = {
    createPlate,
    uploadPlate
}