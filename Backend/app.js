// Importamos las librerias a utilizar
const express = require('express'); // Framework de Node.js que permite crear servidores web
const bodyParser = require('body-parser'); // Permite leer los datos enviados por el cliente
const routes = require('./routes/routes'); // Rutas de la API
const cors = require('cors'); // Cors permite que el servidor acepte peticiones de cualquier origen

const app = express(); // Inicializamos el servidor

// Configuramos el servidor
app.use(bodyParser.urlencoded({ extended: false })); // Permite leer los datos enviados por el cliente
app.use(bodyParser.json()); // Obtiene los datos enviados por el cliente en formato JSON a través de la petición HTTP
app.use(cors()); // Permite que el servidor acepte peticiones de cualquier origen
app.use(routes); // Utilizamos las rutas de la API

// Exportamos el servidor
module.exports = app;