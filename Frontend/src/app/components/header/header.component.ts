import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutenticacionService } from '../../services/autenticacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header>
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
              <li *ngIf="!isLogged" class="nav-item">
                <a class="nav-link" routerLink="login">Login</a>
              </li>
              <li *ngIf="!isLogged" class="nav-item">
                <a class="nav-link" routerLink="register">Registro</a>
              </li>
              <li *ngIf="isLogged" class="nav-item">
                <a class="nav-link" (click)="logout()">Cerrar Sesion</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;

  private autenticado!: Subscription;

  constructor(
    private autenticacion: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.autenticado = this.autenticacion.autenticado$.subscribe({
      next: (status) => {
        this.isLogged = status;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  logout() {
    this.autenticacion.clearSession()
    this.router.navigate(['/login']);
  }
}
