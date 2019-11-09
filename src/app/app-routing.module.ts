import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearplantillaComponent } from './components/crearplantilla/crearplantilla.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { HomeComponent } from './components/home/home.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { TablaadminComponent } from './components/tablaadmin/tablaadmin.component';
import { LoginComponent } from './login/login.component';
import { PaginanoencontradaComponent } from './components/paginanoencontrada/paginanoencontrada.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './core/auth.guard';
import { UserResolver } from './user/user.resolver';
import { GrafiComponent } from './components/grafi/grafi.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'pagina-no-encontrada', component: PaginanoencontradaComponent},
 
  { path: 'plantilla', component: CrearplantillaComponent },
  { path: 'criterio', component: CriteriosComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'tabla', component:  TablaComponent },
  { path: 'tablaADMIN', component:  TablaadminComponent },
  { path: 'GrafiComponent', component:  GrafiComponent },
  { path: '**', redirectTo: '/pagina-no-encontrada', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
