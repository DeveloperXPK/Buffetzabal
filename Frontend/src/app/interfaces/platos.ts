export interface Platos {
    _id: string;
    nombre: string;
    precio: number;
    descripcion: string;
}

export interface Platos {
    publicaciones: Platos[];
}

export interface Plato {
    publicacion: Platos;
}
