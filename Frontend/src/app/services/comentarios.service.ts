import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';
import { comentariosResponse, singleComentarioResponse } from '../interfaces/comentarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private comenatiossKey: string = 'session_comentario'; // Key para almacenar los platos en el localStorage
  private url: string = 'http://localhost:3333/comentarios'; // URL de la API
  private urlPlatos: string = 'http://localhost:3333/platos'; // URL de la API

  constructor(
    private http: HttpClient,
    private router: Router,
    private autenticacion: AutenticacionService
  ) {}

  getComentario(platoId: string, comentarioId: string): Observable<singleComentarioResponse> {
    return this.http.get<singleComentarioResponse>(`${this.urlPlatos}/${platoId}/${comentarioId}`, {
      headers: this.autenticacion.getHeaders(),
    });
  }

  getAllComentarios(): Observable<comentariosResponse> {
    return this.http.get<comentariosResponse>(this.url, {
      headers: this.autenticacion.getHeaders(),
    });
  }

  deletePost(id: string): Observable<singleComentarioResponse> {
    return this.http.delete<singleComentarioResponse>(`${this.url}/${id}`, {
      headers: this.autenticacion.getHeaders(),
    });
  }
}
