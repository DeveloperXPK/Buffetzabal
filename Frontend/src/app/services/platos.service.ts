import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';
import { platosResponse, singlePlatoResponse } from '../interfaces/platos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatosService {
  private platosKey: string = 'session_platos'; // Key para almacenar los platos en el localStorage
  private url: string = 'http://localhost:3333/platos'; // URL de la API

  constructor(
    private http: HttpClient,
    private router: Router,
    private autenticacion: AutenticacionService
  ) {}

  // Metodo para obtener un plato de acuerdo a su id
  getPlato(platoId: string): Observable<singlePlatoResponse> {
    // Declaramos la interfaz que vamos a utilizar en este caso singlePlatoResponse
    return this.http.get<singlePlatoResponse>(`${this.url}/${platoId}`, {
      headers: this.autenticacion.getHeaders(),
    });
  }

  // Metodo para obtener todos los platos registrados
  getPlatos(): Observable<platosResponse> {
    return this.http.get<platosResponse>(this.url, {
      headers: this.autenticacion.getHeaders(),
    });
  }

  deletePost(id: string): Observable<singlePlatoResponse> {
    return this.http.delete<singlePlatoResponse>(`${this.url}/${id}`, {
      headers: this.autenticacion.getHeaders(),
    });
  }
}
