import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Platos } from '../../interfaces/platos';
import { Comentarios } from '../../interfaces/comentarios';
import { PlatosService } from '../../services/platos.service';
import { CommonModule } from '@angular/common';
import { ComentariosService } from '../../services/comentarios.service';

@Component({
  selector: 'app-plato',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5" *ngIf="plato && comentarios">
      <div class="card">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="{{plato.imagen}}"
              class="img-fluid rounded-start"
              alt="Imagen del plato"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title text-primary">{{ plato.nombre }}</h5>
              <p class="card-text">
                <strong>Categoría:</strong> {{ plato.categoria }}
              </p>
              <p class="card-text">
                <strong>Precio:</strong> {{ plato.precio }}
              </p>
              <p class="card-text">
                <strong>Descripción:</strong> {{ plato.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h4 class="text-secondary">Comentarios</h4>
        <!-- Comentarios Existentes -->
        <div class="list-group">
          <div
            class="list-group-item"
            *ngFor="let comentario of comentarios; trackById"
          >
            <h6>
              {{ comentario.usuario.username }}
              <small class="text-muted">- {{ comentario.fecha }}</small>
            </h6>
            <p>{{comentario.comentario}}</p>
          </div>
        </div>

        <form class="mt-4">
          <div class="mb-3">
            <label for="nombre" class="form-label">Tu nombre</label>
            <input
              type="text"
              class="form-control"
              id="nombre"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div class="mb-3">
            <label for="comentario" class="form-label">Tu comentario</label>
            <textarea
              class="form-control"
              id="comentario"
              rows="3"
              placeholder="Escribe tu comentario"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Enviar comentario
          </button>
        </form>
      </div>
    </div>
  `,
})
export class PlatoComponent implements OnInit {
  plato?: Platos; // Definimos la variable plato como un objeto de tipo Platos
  comentarios: Comentarios[] = []; // Definimos la variable comentarios como un arreglo de objetos de tipo Comentarios

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private autenticacion: AutenticacionService,
    private platoService: PlatosService,
    private comentarioService: ComentariosService
  ) {}

  ngOnInit() {
    const idPlato = this.route.snapshot.paramMap.get('platoId');

    if (idPlato) {
      this.platoService.getPlato(idPlato).subscribe({
        next: (res) => {
          this.plato = res.Plato;
          this.comentarios = res.Comentarios;
          console.log('Plato', this.plato);
          console.log('Comentarios', this.comentarios);
        },
        error: (err) => {
          console.error('Error al obtener datos', err);
        },
      });
    }
  }
}
