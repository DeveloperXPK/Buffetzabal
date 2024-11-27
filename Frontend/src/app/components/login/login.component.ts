import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div
      class="container d-flex align-items-center justify-content-center vh-100"
    >
      <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
        <h3 class="text-center mb-4">Login</h3>
        <form>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              [(ngModel)]="email"
              placeholder="Ingresa tu email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              [(ngModel)]="password"
              placeholder="Ingresa password"
              required
            />
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary" (click)="login()">
              Ingresar
            </button>
          </div>
          <div class="text-center mt-3">
            <p>
              No tienes una cuenta?
              <a (click)="navigateRegister()">Registrate</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private autenticacion: AutenticacionService
  ) {}

  navigateRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    const url = 'http://localhost:3333/login';

    const body = {
      email: this.email,
      password: this.password,
    };

    if (!this.email || !this.password) {
      alert('Todos los campos son requeridos');
    }

    this.http
      .post(url, body, { headers: this.autenticacion.getHeaders() })
      .subscribe({
        next: (res: any) => {
          const token = res.token;
          const usuario = res.usuario;

          this.autenticacion.setUser(usuario);
          this.autenticacion.setToken(token);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Error: ', err);
          alert('Credenciales incorrectas');
        },
      });
  }
}
