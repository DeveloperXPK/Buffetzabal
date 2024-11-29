import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlatosService } from '../../services/platos.service';
import { ComentariosService } from '../../services/comentarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { FormsModule } from '@angular/forms';
import { Platos } from '../../interfaces/platos';
import { Comentarios } from '../../interfaces/comentarios';

@Component({
  selector: 'app-crear-editar-comentario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5" *ngIf="plato">
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

      <form class="mt-4" (ngSubmit)="editarComentario()">
        <div class="mb-3">
          <label for="comentarioEditado" class="form-label"
            >Tu comentario</label
          >
          <textarea
            class="form-control"
            name="comentarioEditado"
            rows="3"
            placeholder="{{ comentario[0].comentario }}"
            [(ngModel)]="comentarioEditado"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Editar comentario</button>
      </form>
    </div>
  `,
})
export class CrearEditarComentarioComponent implements OnInit {
  plato?: Platos;
  comentario: Comentarios[] = [];

  public comentarioEditado: string = '';

  constructor(
    private platoService: PlatosService,
    private comentarioService: ComentariosService,
    private route: ActivatedRoute,
    private autenticacion: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit() {
    const idPlato = this.route.snapshot.paramMap.get('platoId');
    const idComentario = this.route.snapshot.paramMap.get('comentarioId');

    if (idPlato) {
      this.platoService.getSinglePlatoResponse(idPlato).subscribe({
        next: (res) => {
          this.plato = res.platos;

          this.platoService.setPlato(this.plato);
          this.comentario = this.comentarioService.getComentarios();
          this.comentario = this.comentario.filter(
            (comentario) => comentario._id === idComentario
          );
          console.log('Comentarios', this.comentario);
        },
        error: (err) => {
          console.error('Error al obtener datos', err);
        },
      });
    }
  }

  editarComentario() {
    const idPlato = this.route.snapshot.paramMap.get('platoId');
    const idComentario = this.route.snapshot.paramMap.get('comentarioId');

    const body = {
      _id: idComentario,
      comentario: this.comentarioEditado,
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

    if (idPlato && idComentario) {
      this.comentarioService
        .editarComentario(idPlato, idComentario, body)
        .subscribe({
          next: (res) => {
            console.log('Comentario editado', res);
            this.router.navigate(['/plato', idPlato]);
          },
          error: (err) => {
            console.error('Error al editar comentario', err);
          },
        });
    }
  }
}
