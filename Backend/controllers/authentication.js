// Proposito: Controlador para la autenticación de usuarios

const bcrypt = require('bcrypt');
const token = require('../helpers/authentication');
const User = require('../models/users');

// Funcion para registrar nuevos usuarios
function registerUser(req, res) {

    // Obtenemos los datos del usuario desde el body
    const {
        username,
        email,
        password,
        rol
    } = req.body;

    // Creamos el hash de la contraseña
    const salt = bcrypt.genSaltSync(10);
    const passwordHASH = bcrypt.hashSync(password, salt);

    // Creamos un nuevo usuario con los datos obtenidos y
    // la contraseña encriptada
    const user = new User({
        username: username,
        email: email,
        password: passwordHASH,
        rol: rol
    });


    // Guardamos el usuario en la base de datos
    user.save()
        .then(
            // Si se guardo correctamente, enviamos un mensaje de exito
            (newUser) => {
                res.status(201).send({
                    "Usuario Creado": newUser
                });
            },
            // Si hubo un error, enviamos un mensaje de error
            (err) => {
                res.status(500).send({
                    "Error": "No se pudo crear el usuario",
                    message: err
                })
            }
        )
}

// Funcion para loguear un usuario
function loginUser(req, res) {

    // Obtenemos los datos del usuario desde el body
    const {
        email,
        password
    } = req.body;

    // Buscamos al usuario en la base de datos
    User.findOne({
        email: email
    })
        .then(
            // Si se encontro al usuario, comparamos la contraseña
            (user) => {
                if (bcrypt.compareSync(password, user.password)) {
                    // Si la contraseña es correcta, generamos un token
                    const tokenUser = token.generateToken(user);
                    res.status(200).send({
                        "Token": tokenUser
                    });
                } else {
                    // Si la contraseña es incorrecta, enviamos un mensaje de error
                    res.status(401).send({
                        "Error": "Contraseña incorrecta"
                    });
                }
            },
            // Si hubo un error, enviamos un mensaje de error
            (err) => {
                res.status(404).send({
                    "Error": "Usuario no encontrado",
                    message: err
                });
            }
        )
}

module.exports = {
    registerUser,
    loginUser
}