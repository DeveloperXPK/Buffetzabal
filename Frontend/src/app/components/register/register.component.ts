import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div
      class="container d-flex align-items-center justify-content-center vh-100"
    >
      <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
        <h3 class="text-center mb-4">Registro</h3>
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Usuario</label>
            <input
              type="text"
              class="form-control"
              name="username"
              placeholder="Ingresa tu usuario"
              [(ngModel)]="username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Ingresa tu email"
              [(ngModel)]="email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Ingresa tu password"
              [(ngModel)]="password"
              required
            />
          </div>
          <div class="mb-3">
            <label for="confirm-password" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              class="form-control"
              name="confirm-password"
              placeholder="Confirma tu password"
              [(ngModel)]="verifyPassword"
              required
            />
          </div>
          <div class="d-grid">
            <button
              type="submit"
              class="btn btn-primary"
              (click)="registrarUsuario()"
            >
              Registrarse
            </button>
          </div>
          <div class="text-center mt-3">
            <p>Ya tienes una cuenta? <a (click)="navigateLogin()">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public verifyPassword: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private autenticacion: AutenticacionService
  ) {}

  navigateLogin() {
    this.router.navigate(['/login']);
  }

  registrarUsuario() {
    const url = 'http://localhost:3333/register';

    const body = {
      username: this.username,
      email: this.email,
      password: this.password,
      rol: 'client',
    };

    if(
      !this.username ||
      !this.email ||
      !this.password ||
      !this.verifyPassword
    ) {
      alert("Todos los campos son requeridos")
      return
    } else if (this.password !== this.verifyPassword) {
      alert("Las passwords no coinciden")
      return
    }

    this.http
      .post(url, body, { headers: this.autenticacion.getHeaders() })
      .subscribe({
        next: (res) => {
          console.log('Respuesta: ', res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Error al crear usuario');
          console.log(err);
        },
      });
  }
}
