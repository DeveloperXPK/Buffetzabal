import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatosService } from '../../services/platos.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-plato',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Crear Plato</h2>
      <form>
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre del Plato</label>
          <input
            type="text"
            name="nombre"
            class="form-control"
            [(ngModel)]="nombre"
            placeholder="Ej. Jugo de maracuyá"
          />
        </div>
        <div class="mb-3">
          <label for="precio" class="form-label">Precio</label>
          <input
            type="number"
            name="precio"
            class="form-control"
            [(ngModel)]="precio"
            placeholder="Ej. 18000"
          />
        </div>
        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripción</label>
          <textarea
            name="descripcion"
            class="form-control"
            [(ngModel)]="descripcion"
            placeholder="Describe el plato"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="categoria" class="form-label">Categoría</label>
          <select name="categoria" class="form-control" [(ngModel)]="categoria">
            <option value="">Seleccionar</option>
            <option value="Entrada">Entradas</option>
            <option value="Bebida">Bebidas</option>
            <option value="Postre">Postres</option>
            <option value="Plato fuerte">Plato fuerte</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" (click)="crearPlato()">Crear Plato</button>
        <button class="btn btn-primary mx-3" (click)="volver()">Volver</button>
      </form>
    </div>
  `,
})
export class CrearPlatoComponent {
  public nombre: string = '';
  public precio: string = '';
  public descripcion: string = '';
  public categoria: string = '';
  public imagen: string = 'default';

  constructor(
    private platoService: PlatosService,
    private router: Router,
    private autenticacion: AutenticacionService,
    private http: HttpClient
  ) {}

  crearPlato(): void {
    const body = {
      nombre: this.nombre,
      precio: this.precio,
      descripcion: this.descripcion,
      categoria: this.categoria,
      imagen: this.imagen,
    };

    this.platoService.crearPlato(body).subscribe({
      next: (res) => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
    
  }

  volver(){
    this.router.navigate(['home']);
  }
}
