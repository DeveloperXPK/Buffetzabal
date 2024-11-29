import { Component, OnInit } from '@angular/core';
import { PlatosService } from '../../services/platos.service';
import { Router } from '@angular/router';
import { Platos } from '../../interfaces/platos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Menú de Platos -->
    <div class="container my-5">
      <h1 class="text-center mb-4">Nuestro Menú</h1>

      <!-- Entradas -->
      <div class="my-5">
        <h2 class="mb-3">Entradas</h2>
        @for (plato of platos; track plato.categoria) { @if (plato.categoria ==
        'Entrada') {
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-body" (click)="verPlato(plato._id)">
              <h5 class="card-title">{{ plato.nombre }}</h5>
              <p class="card-text">
                {{ plato.descripcion }}
              </p>
              <p class="fw-bold">
                Precio:
                {{
                  plato.precio | currency : 'COP' : 'symbol-narrow' : '1.0-0'
                }}
              </p>
            </div>
          </div>
        </div>

        } }
      </div>

      <!-- Platos Principales -->
      <div class="my-5">
        <h2 class="mb-3">Platos Fuertes</h2>
        @for (plato of platos; track plato.categoria) { @if (plato.categoria ==
        'Plato fuerte') {
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-body" (click)="verPlato(plato._id)">
              <h5 class="card-title">{{ plato.nombre }}</h5>
              <p class="card-text">
                {{ plato.descripcion }}
              </p>
              <p class="fw-bold">
                Precio:
                {{
                  plato.precio | currency : 'COP' : 'symbol-narrow' : '1.0-0'
                }}
              </p>
            </div>
          </div>
        </div>

        } }
      </div>

      <!-- Postres -->
      <div class="my-5">
        <h2 class="mb-3">Postres</h2>
        <div class="row g-4">
          @for (plato of platos; track plato.categoria) { @if (plato.categoria
          == 'Postre') {
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body" (click)="verPlato(plato._id)">
                <h5 class="card-title">{{ plato.nombre }}</h5>
                <p class="card-text">
                  {{ plato.descripcion }}
                </p>
                <p class="fw-bold">
                  Precio:
                  {{
                    plato.precio | currency : 'COP' : 'symbol-narrow' : '1.0-0'
                  }}
                </p>
              </div>
            </div>
          </div>

          } }
        </div>

        <!-- Bebidas -->
        <div class="my-5">
          <h2 class="mb-3">Bebidas</h2>
          @for (plato of platos; track plato.categoria) { @if (plato.categoria
          == 'Bebida') {
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body" (click)="verPlato(plato._id)">
                <h5 class="card-title">{{ plato.nombre }}</h5>
                <p class="card-text">
                  {{ plato.descripcion }}
                </p>
                <p class="fw-bold">
                  Precio:
                  {{
                    plato.precio | currency : 'COP' : 'symbol-narrow' : '1.0-0'
                  }}
                </p>
              </div>
            </div>
          </div>

          } }
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  platos: Platos[] = [];
  constructor(private platosService: PlatosService, private router: Router) {}

  ngOnInit() {
    this.platosService.getPlatosResponse().subscribe({
      next: (res) => {
        this.platos = res.platos;
        console.log(this.platos);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  verPlato(idPlato: string) {
    this.router.navigate(['/plato', idPlato]);
  }
}
