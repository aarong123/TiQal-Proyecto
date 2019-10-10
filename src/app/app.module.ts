import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

//Rutas
import { MenuComponent } from './components/menu/menu.component';
import { CrearplantillaComponent } from './components/crearplantilla/crearplantilla.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { HomeComponent } from './components/home/home.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { TablaadminComponent } from './components/tablaadmin/tablaadmin.component';
import { LoginComponent } from './components/login/login.component';
import { PaginanoencontradaComponent } from './components/paginanoencontrada/paginanoencontrada.component';

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
    CriteriosComponent,
    HomeComponent,
    TablaComponent,
    TablaadminComponent,
    LoginComponent,
    PaginanoencontradaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [CriterioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
