import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearplantillaComponent } from './components/crearplantilla/crearplantilla.component';
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
import { ReportepdfComponent} from './components/reportepdf/reportepdf.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'pagina-no-encontrada', component: PaginanoencontradaComponent},
  { path: 'plantilla', component: CrearplantillaComponent ,  resolve: { data: UserResolver} },
  { path: 'home', component:  HomeComponent ,  resolve: { data: UserResolver}},
  { path: 'tabla', component:  TablaComponent ,  resolve: { data: UserResolver}},
  { path: 'tablaADMIN', component:  TablaadminComponent ,  resolve: { data: UserResolver}},
  { path: 'GrafiComponent', component:  GrafiComponent ,  resolve: { data: UserResolver}},
  { path: 'reportepdf', component: ReportepdfComponent, resolve: { data: UserResolver} },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
