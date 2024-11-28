import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private token: string = 'token_session';
  private usuario: string = 'usuario_session';
  private autenticado = new BehaviorSubject<boolean>(this.isAuthenticated());

  autenticado$ = this.autenticado.asObservable();

  constructor() { }

  // Enviamos el token al sessionStorage
  setToken(token: string): void {
    sessionStorage.setItem(this.token, token);

    // Se establece true en el BehaviorSubject y asi cuando se loguee se actualiza el header
    this.autenticado.next(true); 
  }

  // Obtenemos el token del sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem(this.token);
  }

  // Enviamos el usuario al sessionStorage
  setUser(usuario: string): void {
    sessionStorage.setItem(this.usuario, JSON.stringify(usuario));
  }

  // Obtenemos el usuario del sessionStorage
  getUser(): string | null {
    return sessionStorage.getItem(this.usuario);
  }

  // Necesitamos un metodo para obtener los headers
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  }

  // Verificamos si el usuario esta autenticado (si tiene un token)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  // Metodo para cerrar sesion
  clearSession(): void {
    sessionStorage.removeItem(this.token);
    sessionStorage.removeItem(this.usuario);
    localStorage.removeItem('session_platos');
    this.autenticado.next(false);
  }
}
