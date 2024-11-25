const jwt = require('jwt-simple'); // Se usa para manejar la autenticación de usuarios (tokens)
const moment = require('moment'); // Se usa para manejar el tiempo de expiración del token

// Establecemos una clave secreta para firmar los tokens
const SECRET = 'e8b4ee60bfc5c707c94de471'


// Funcion para crear un token
function generateToken(usuario) {

    // Establecemos la información que queremos guardar en el token
    const payload = {
        sub: usuario._id,
        username: usuario.username,
        email: usuario.email,
        rol: usuario.rol,

        // Fecha de creación del token
        iat: moment.unix(),

        // Fecha de expiración del token
        exp: moment().add(10, 'minutes').unix()
    }

    // Devolvemos el token generado codificado en base64
    return jwt.encode(payload, SECRET);
}

// Función para decodificar un token y verificar si es válido
function verifyToken(req, res, next) {
    // Verificamos que el token se haya enviado
    try {

        // Extraemos el token de la cabecera de la petición
        const token = req.headers.authorization.split(' ')[1];

        // Decodificamos el token
        const payload = jwt.decode(token, SECRET);

        // Guardamos el id y el rol en el header
        req.user = {
            _id: payload.sub,
            username: payload.username,
            email: payload.email,
            rol: payload.rol
        }

        // Contimuamos con la ejecución
        next();

    } catch {
        res.status(403).send({ message: 'Error al iniciar sesion' })
    };
};

// Validar permiso mediante rol
function verifyRol(rolesPermitidos) {

    // Retornamos una funcion que se ejecuta en la ruta
    return (req, res, next) => {
        // Verificamos los roles permitidos en la cabecera
        if (rolesPermitidos.includes(req.header.usuarioRol)) {

            // Continuamos con la peticion
            next();
        } else {

            // Retornamos un mensaje de que no tiene permiso
            res.status(403).send({ message: 'No tienes permiso para realizar esta acción' })
        };
    };
};

// Exportamos las funciones
module.exports = {
    generateToken,
    verifyToken,
    verifyRol
}