import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private token: string = 'token_session';
  private usuario: string = 'usuario_session';

  constructor() { }

  // Enviamos el token al sessionStorage
  setToken(token: string): void {
    sessionStorage.setItem(this.token, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.token);
  }

  setUser(usuario: string): void {
    sessionStorage.setItem(this.usuario, usuario);
  }

  // Necesitamos un metodo para obtener los headers
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  }
}
