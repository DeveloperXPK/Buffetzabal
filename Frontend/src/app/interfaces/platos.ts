import { comentariosResponse } from "./comentarios";

export interface Platos {
    _id: string;
    nombre: string;
    precio: number;
    descripcion: string;
    categoria: string;
    imagen: string;
}

export interface platosResponse {
    Plato: Platos[];
}

export interface singlePlatoResponse {
    Plato: Platos;

    /**
     * Se debe utilizar la sintaxis de comentariosResponse["comentarios"] para acceder a los comentarios
     * de la publicación.
     * Si se accede sola con comentariosResponse, se obtiene un error de tipo.
     */
    Comentarios: comentariosResponse["comentarios"];

}
