import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearplantillaComponent } from './components/crearplantilla/crearplantilla.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { HomeComponent } from './components/home/home.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { TablaadminComponent } from './components/tablaadmin/tablaadmin.component';
import { LoginComponent } from './components/login/login.component';
import { PaginanoencontradaComponent } from './components/paginanoencontrada/paginanoencontrada.component';

const routes: Routes = [
  { path: 'pagina-no-encontrada', component: PaginanoencontradaComponent},
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'plantilla', component: CrearplantillaComponent },
  { path: 'criterio', component: CriteriosComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'tabla', component:  TablaComponent },
  { path: 'tablaADMIN', component:  TablaadminComponent },
  { path: '**', redirectTo: '/pagina-no-encontrada', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
