export interface Platos {
    _id: string;
    nombre: string;
    precio: number;
    descripcion: string;
    categoria: string;
}

export interface platosResponse {
    Plato: Platos[];
}

export interface singlePlatoResponse {
    Plato: Platos;
}
