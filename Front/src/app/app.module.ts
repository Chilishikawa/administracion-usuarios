import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../app/components/inicio/inicio.component'
import { AdminUsuariosComponent } from '../app/components/admin-usuarios/admin-usuarios.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'admin-usuarios', component: AdminUsuariosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AdminUsuariosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

