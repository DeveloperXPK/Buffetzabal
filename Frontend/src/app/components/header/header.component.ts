import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-primary shadow-sm">
      <div class="container">
        <a class="navbar-brand text-light" routerLink="home">Buffetzabal</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="home">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="register">Registro</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class HeaderComponent {}
