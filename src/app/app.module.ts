import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule } from '@angular/forms';

//Rutas
import { MenuComponent } from './components/menu/menu.component';
import { CrearplantillaComponent } from './components/crearplantilla/crearplantilla.component';
import { HomeComponent } from './components/home/home.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { TablaadminComponent } from './components/tablaadmin/tablaadmin.component';
import { LoginComponent } from './login/login.component';
import { PaginanoencontradaComponent } from './components/paginanoencontrada/paginanoencontrada.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { GrafiComponent } from './components/grafi/grafi.component';
import { ReportepdfComponent } from './components/reportepdf/reportepdf.component';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

//Servicios
import { CriterioService } from './services/criterio/criterio.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CrearplantillaComponent,
    HomeComponent,
    TablaComponent,
    TablaadminComponent,
    LoginComponent,
    PaginanoencontradaComponent,
    UserComponent,
    RegisterComponent,
    GrafiComponent,
    ReportepdfComponent,

  ],
  imports: [
    BrowserModule,ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
    
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard,CriterioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
