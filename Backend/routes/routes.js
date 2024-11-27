// Propósito: Definir las rutas de la aplicación
const express = require('express');
const routes = express.Router();

// Importamos el controlador de autenticacion
const authenticationController = require('../controllers/authentication');
const token = require('../helpers/authentication');

// Importamos el controlador de platos
const platosController = require('../controllers/platos');

// Importamos el controlador de comentarios
const comentariosController = require('../controllers/comentarios');

// Definimos las rutas para la autenticacion y el registro de usuarios
routes.post('/register', authenticationController.registerUser);
routes.post('/login', authenticationController.loginUser);


// Definimos la ruta de los platos
routes.post('/platos', token.verifyToken, platosController.createPlate); // Creamos un nuevo plato
routes.put('/platos/:platoId', token.verifyToken, platosController.uploadPlate); // Editamos un plato por su id
routes.get('/platos/:platoId', platosController.getPlateById); // Obtenemos un plato por su id
routes.get('/platos', platosController.getPlates); // Obtenemos todos los platos
routes.delete('/platos/:platoId', token.verifyToken, platosController.deletePlateById); // Eliminamos un plato por su id

// Definimos la ruta de los comentarios
routes.delete('/platos/:platoId/:comentarioId', token.verifyToken, comentariosController.deleteComment);
routes.post('/platos/:platoId/comentarios', token.verifyToken, comentariosController.createComment);
routes.put('/platos/:platoId/comentarios/:comentarioId', token.verifyToken, comentariosController.editComment);
routes.get('/platos/:platoId', comentariosController.getComments);
routes.get('/platos/:platoId/:comentarioId', comentariosController.getCommentById);

module.exports = routes;