import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/services/plant/plant.service';

@Component({
  selector: 'app-tablaadmin',
  templateUrl: './tablaadmin.component.html',
  styleUrls: ['./tablaadmin.component.css']
})
export class TablaadminComponent implements OnInit {
  plantilla: any;

  datospt: any = {
  nombreraiz: '',
  nombrePlantilla: '',
  observaciones: '',
  umbral: '',
  criterios: [],
  }

  edit: any = {
    nombreraiz: '',
    nombrePlantilla: '',
    observaciones: '',
    umbral: '',
    criterios: [],
    }

  constructor( private plantConexion : PlantService) {
    this.plantConexion.listaplatillas().subscribe( plantillas => {
      this.plantilla = plantillas;
      console.log(this.plantilla);  
    })
  }
  ngOnInit() {
  }

  eliminar(plantilla) {
    this.plantConexion.eliminarplanilla(plantilla);
  }

  editar(plantilla) {
    this.edit = plantilla;
  }

  agregarPlantillaEditada(){
    this.plantConexion.editarplanilla(this.edit);
  }

}
