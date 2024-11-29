import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';
import {
  Comentarios,
  comentariosResponse,
  singleComentarioResponse,
} from '../interfaces/comentarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
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

  setComentario(comentario: any): void {
    localStorage.setItem(this.comenatiossKey, JSON.stringify(comentario));
  }

  getComentarios(): any {
    return JSON.parse(localStorage.getItem(this.comenatiossKey) || '{}');
  }

  getComentario(
    platoId: string,
    comentarioId: string
  ): Observable<singleComentarioResponse> {
    return this.http.get<singleComentarioResponse>(
      `${this.urlPlatos}/${platoId}/${comentarioId}`,
      {
        headers: this.autenticacion.getHeaders(),
      }
    );
  }

  getAllComentarios(): Observable<comentariosResponse> {
    return this.http.get<comentariosResponse>(this.url, {
      headers: this.autenticacion.getHeaders(),
    });
  }

  deleteComentario(
    idComentario: string,
    idPlato: string
  ): Observable<singleComentarioResponse> {
    return this.http.delete<singleComentarioResponse>(
      `${this.urlPlatos}/${idPlato}/${idComentario}`,
      {
        headers: this.autenticacion.getHeaders(),
      }
    );
  }

  createComentario(
    platoId: string,
    comentarioInfo: any
  ): Observable<Comentarios> {
    return this.http.post<Comentarios>(
      `${this.urlPlatos}/${platoId}/comentarios`,
      comentarioInfo,
      {
        headers: this.autenticacion.getHeaders(),
      }
    );
  }

  editarComentario(idPlato: string, idComentario: string, body: any): Observable<singleComentarioResponse> {
    return this.http.put<singleComentarioResponse>(`${this.urlPlatos}/${idPlato}/${idComentario}`, body, { headers: this.autenticacion.getHeaders()})

  }
}
