import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { PaginanoencontradaComponent } from './components/paginanoencontrada/paginanoencontrada.component';
import { CrearplantillaComponent } from './components/crearplantilla/crearplantilla.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { HomeComponent } from './components/home/home.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { TablaadminComponent } from './components/tablaadmin/tablaadmin.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'pagina-no-encontrada', component: PaginanoencontradaComponent},
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'plantilla', component: CrearplantillaComponent },
  { path: 'criterio', component: CriteriosComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'tabla', component:  TablaComponent },
  { path: 'tablaADMIN', component:  TablaadminComponent },
  { path: '**', redirectTo: '/pagina-no-encontrada', pathMatch: 'full' }
  
];
