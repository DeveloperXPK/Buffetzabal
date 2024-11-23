const mongoose = require('mongoose');
const app = require('./app');

const port = 3333 || process.env.PORT;

mongoose.connect('mongodb://127.0.0.1:27017/buffetzabal', { useNewUrlParser: true })
    .then(
        () => {
            console.log('Conexión a la base de datos establecida con éxito');
            app.listen(port, () => {
                console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
            });
        },
        err => {
            console.error('Error al conectar a la base de datos', err);
        }
    )