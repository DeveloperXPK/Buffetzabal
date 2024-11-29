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

// ------------- AUTENTICACION ----------------
routes.post('/register', authenticationController.registerUser);
routes.post('/login', authenticationController.loginUser);


// ------------- PLATOS ----------------
// ------- CREAR, EDITAR, ELIMINAR ------------
routes.post('/platos', token.verifyToken, platosController.createPlate); // Crear un nuevo plato
routes.put('/platos/:platoId', token.verifyToken, platosController.uploadPlate); // Editar un plato por su id
routes.delete('/platos/:platoId', token.verifyToken, platosController.deletePlateById); // Eliminar un plato por su id

// ------- OBTENER ------------
routes.get('/platos', platosController.getPlates); // Consultar todos los platos
routes.get('/platos/:platoId', platosController.getPlateById); // Consultar un plato por su id y mostrar sus comentarios
routes.get('/platos/:categoria', platosController.getPlatesByCategory); // Consultar platos por categoria


// ------------- COMENTARIOS ----------------
// ------- CREAR, EDITAR, ELIMINAR ------------
routes.post('/platos/:platoId/comentarios', token.verifyToken, comentariosController.createComment); // Crear un nuevo comentario
routes.put('/platos/:platoId/:comentarioId', token.verifyToken, comentariosController.editComment); // Editar un comentario por su id
routes.delete('/platos/:platoId/:comentarioId', token.verifyToken, comentariosController.deleteComment); // Eliminar un comentario por su id

// ------- OBTENER ------------
routes.get('/comentarios', comentariosController.getComments); // Consultar todos los comentarios
routes.get('/platos/:platoId/:comentarioId', comentariosController.getCommentById); // Consultar un comentario por su id

module.exports = routes;