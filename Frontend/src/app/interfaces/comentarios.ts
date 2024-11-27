export interface Comentarios {
    // Datos del usuario que comenta
    usuario: {
        _id: string;
        username: string;
        email: string;
    }
    // Datos de la publicación a la que se le comenta
    publicacion: {
        _id: string;
        nombre: string;
        descripcion: string;
        categoria: string;
    }
    // Datos del comentario
    comentario: string;
    fecha: string; // Fecha de creación del comentario
}

export interface comentariosResponse {
    comentarios: Comentarios[];
}

export interface singleComentarioResponse {
    comentario: Comentarios;
}
