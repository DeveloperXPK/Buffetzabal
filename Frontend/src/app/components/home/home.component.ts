import { Component, OnInit } from '@angular/core';
import { PlatosService } from '../../services/platos.service';
import { Router } from '@angular/router';
import { Platos } from '../../interfaces/platos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <!-- Menú de Platos -->
    <div class="container my-5">
      <h1 class="text-center mb-4">Nuestro Menú</h1>

      <!-- Entradas -->
      <div class="mb-5">
        <h2 class="mb-3">Entradas</h2>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Bruschetta Tradicional</h5>
                <p class="card-text">
                  Pan tostado con ajo, tomates frescos, albahaca y un toque de
                  aceite de oliva.
                </p>
                <p class="fw-bold">Precio: $25,900 COP</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Crema de Calabaza</h5>
                <p class="card-text">
                  Suave crema elaborada con calabaza fresca, un toque de nuez
                  moscada y servida con crotones.
                </p>
                <p class="fw-bold">Precio: $19,500 COP</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Platos Principales -->
      <div class="mb-5">
        <h2 class="mb-3">Platos Principales</h2>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Pasta Alfredo con Pollo</h5>
                <p class="card-text">
                  Pasta al dente en una cremosa salsa Alfredo, acompañada de
                  jugosas tiras de pollo.
                </p>
                <p class="fw-bold">Precio: $56,900 COP</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Lomo Saltado</h5>
                <p class="card-text">
                  Tiras de lomo de res salteadas con cebolla, tomate y especias,
                  servido con papas fritas y arroz.
                </p>
                <p class="fw-bold">Precio: $64,900 COP</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Postres -->
      <div class="mb-5">
        <h2 class="mb-3">Postres</h2>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Tiramisú Clásico</h5>
                <p class="card-text">
                  Capas de bizcocho esponjoso empapadas en café, con mascarpone
                  y un toque de cacao.
                </p>
                <p class="fw-bold">Precio: $22,500 COP</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Cheesecake de Frutos Rojos</h5>
                <p class="card-text">
                  Tarta de queso suave, cubierta con una deliciosa salsa de
                  frutos rojos frescos.
                </p>
                <p class="fw-bold">Precio: $24,900 COP</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bebidas -->
      <div class="mb-5">
        <h2 class="mb-3">Bebidas</h2>
        <div class="row g-4">

          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Limonada Natural</h5>
                <p class="card-text">
                  Refrescante limonada hecha con limones frescos y un toque de
                  menta.
                </p>
                <p class="fw-bold">Precio: $8,900 COP</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Mojito sin Alcohol</h5>
                <p class="card-text">
                  Una mezcla perfecta de hierbabuena, lima, soda y azúcar, ideal
                  para refrescarse.
                </p>
                <p class="fw-bold">Precio: $13,900 COP</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  platos: Platos[] = [];
  constructor(private platosService: PlatosService, private router: Router) {}

  ngOnInit(){
    this.platosService.getPlatosResponse().subscribe({
      next: 
      (res) => {
        console.log(res);
        this.platos = res.platos;
        console.log(this.platos);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
