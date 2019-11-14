import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/services/plant/plant.service';

@Component({
  selector: 'app-tablaadmin',
  templateUrl: './tablaadmin.component.html',
  styleUrls: ['./tablaadmin.component.css']
})
export class TablaadminComponent implements OnInit {
  plantilla: Array<any>;

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

  constructor(private plantConexion: PlantService) {
  }

  ngOnInit() {
    this.plantilla = new Array<any>();
    this.viewData()
  }

  viewData() {
    this.plantConexion.viewPlantilla().subscribe((elements) => {
      this.plantilla.push(...elements)
    })
  }

  eliminar(plantilla) {
    this.plantConexion.eliminarplanilla(plantilla);
  }

  editar(plantilla) {
    this.edit = plantilla;
  }

  agregarPlantillaEditada() {
    this.plantConexion.editarplanilla(this.edit);
  }

}
