import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsuariosComponent } from '../app/components/admin-usuarios/admin-usuarios.component'; // Asegúrate de importar el componente correcto
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  { path: 'admin-usuarios', component: AdminUsuariosComponent },
  { path: '', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
