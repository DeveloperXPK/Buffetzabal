import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Platos } from '../../interfaces/platos';
import { Comentarios } from '../../interfaces/comentarios';
import { PlatosService } from '../../services/platos.service';
import { CommonModule } from '@angular/common';
import { ComentariosService } from '../../services/comentarios.service';
import { FormsModule } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-plato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5" *ngIf="plato && comentarios">
      <div class="card mb-4 shadow-sm">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="{{ plato.imagen }}"
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
                <strong>Precio:</strong>
                {{
                  plato.precio | currency : 'COP' : 'symbol-narrow' : '1.0-0'
                }}
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
            class="list-group-item list-group-item-action flex-column align-items-start mb-2"
            *ngFor="let comentario of comentarios; trackById"
          >
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">{{ comentario.usuario.username }}</h6>
              <small class="text-muted">{{ comentario.fecha }}</small>
            </div>
            <p class="mb-1">{{ comentario.comentario }}</p>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-outline-danger btn-sm mx-1"
                *ngIf="isOwner(comentario)"
                (click)="eliminarComentario(comentario._id)"
              >
                Eliminar
              </button>
              <button
                class="btn btn-outline-primary btn-sm"
                *ngIf="isOwner(comentario)"
                (click)="verComentario(comentario._id)"
              >
                Editar
              </button>
            </div>
          </div>
        </div>

        <form class="mt-4" (ngSubmit)="crearComentario()">
          <div class="mb-3">
            <label for="comentario" class="form-label">Tu comentario</label>
            <textarea
              class="form-control"
              name="comentario"
              rows="3"
              placeholder="Escribe un comentario"
              [(ngModel)]="comentario"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Enviar comentario
          </button>
          <button class="btn btn-primary mx-3" (click)="volverInicio()">
            Volver
          </button>
        </form>
      </div>
    </div>
  `,
})
export class PlatoComponent implements OnInit {
  plato?: Platos; // Definimos la variable plato como un objeto de tipo Platos
  comentarios: Comentarios[] = []; // Definimos la variable comentarios como un arreglo de objetos de tipo Comentarios

  public comentario: string = ''; // Definimos la variable comentario como un string

  constructor(
    private route: ActivatedRoute, // Para obtener los parametros de la URL por snapshot
    private router: Router,
    private autenticacion: AutenticacionService,
    private platoService: PlatosService,
    private comentarioService: ComentariosService
  ) {}

  ngOnInit() {
    const idPlato = this.route.snapshot.paramMap.get('platoId');

    if (idPlato) {
      this.platoService.getSinglePlatoResponse(idPlato).subscribe({
        next: (res) => {
          this.plato = res.platos;

          /**
           * Mapeamos los comentarios para agregarles un formato de fecha
           * con moment.js. Asi podemos mostrar la fecha en un formato
           * más amigable para el usuario. Ejm: 12/12/2021 12:00
           */
          if (res.Comentarios) {
            this.comentarios = res.Comentarios.map((comentario) => ({
              ...comentario,
              fecha: moment(comentario.fecha).format('DD/MM/YYYY HH:mm'),
            }));
          }

          this.platoService.setPlato(this.plato);
          this.comentarioService.setComentario(this.comentarios);
        },
        error: (err) => {
          console.error('Error al obtener datos', err);
        },
      });
    }
  }

  crearComentario() {
    const idPlato = this.route.snapshot.paramMap.get('platoId');

    const body = {
      comentario: this.comentario,
      usuario: this.autenticacion.getUser(),
      publicacion: this.platoService.getPlato(),
    };

    if (!this.comentario) {
      alert('Debes escribir un comentario');
      return;
    } else if (!this.autenticacion.isAuthenticated()) {
      alert('Debes iniciar sesión para comentar');
      this.router.navigate(['/login']);
    }

    if (idPlato) {
      this.comentarioService.createComentario(idPlato, body).subscribe({
        next: (res) => {
          console.log('Comentario creado', res);
          this.comentario = '';
        },
        error: (err) => {
          console.error('Error al crear comentario', err);
        },
      });
    }
  }

  isOwner(comentario: Comentarios) {
    const user = this.autenticacion.getUser();
    return (
      (user && user._id === comentario.usuario._id) || user.rol === 'admin'
    );
  }

  eliminarComentario(id: string) {
    if (this.plato) {
      this.comentarioService.deleteComentario(id, this.plato._id).subscribe({
        next: (res) => {
          console.log('Comentario eliminado', res);
        },
        error: (err) => {
          console.error('Error al eliminar comentario', err);
        },
      });
    }
  }

  verComentario(idComentario: string) {
    const idPlato = this.route.snapshot.paramMap.get('platoId');
    this.router.navigate(['/plato', idPlato, idComentario]);
  }

  volverInicio() {
    this.router.navigate(['/home']);
  }
}
