import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlatoComponent } from './components/plato/plato.component';
import { CrearPlatoComponent } from './components/crear-plato/crear-plato.component';
import { CrearEditarComentarioComponent } from './components/crear-editar-comentario/crear-editar-comentario.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'plato/:platoId', component: PlatoComponent},
    {path: 'plato/:platoId/:comentarioId', component: CrearEditarComentarioComponent},
    {path: 'nuevo', component: CrearPlatoComponent}
];
