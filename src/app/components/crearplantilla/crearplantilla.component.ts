import { Component, OnInit } from '@angular/core';
import { CriterioService } from 'src/app/services/criterio/criterio.service';
import { PlantService} from 'src/app/services/plant/plant.service';
@Component({
  selector: 'app-crearplantilla',
  templateUrl: './crearplantilla.component.html',
  styleUrls: ['./crearplantilla.component.css']
})
export class CrearplantillaComponent implements OnInit {

  criterios: any;
  plantilla: any;

  datospt: any = {
  nombreraiz: '',
  nombrePlantilla: '',
  observaciones: '',
  umbral: '',
  criterios: [],
  }

  datosCriterio: any = {
    criterio: '',
    tipoCriterio: '',
    ponderacion: '',
    desCriterio: '',
  }

  editarCriterio: any = {
    criterio: '',
    tipoCriterio: '',
    ponderacion: '',
    desCriterio: '',
  }

  constructor(private criteriosConexion : CriterioService , private plantConexion : PlantService) {
    this.plantConexion.listaplatillas().subscribe( plantillas => {
      this.plantilla = plantillas;
      console.log(this.plantilla);  
    })
    this.criteriosConexion.listaCriterios().subscribe( criterio => {
      this.criterios = criterio;
      console.log(this.criterios);  
    })
   }


  ngOnInit() {
  }

  agregar(){
    this.criteriosConexion.agregarCriterio(this.datosCriterio);
    this.datosCriterio.criterio = '';
    this.datosCriterio.tipoCriterio = '';
    this.datosCriterio.ponderacion = undefined;
    this.datosCriterio.desCriterio = '';
  }

  agregarpt(){
    this.plantConexion.agregarplanilla(this.datospt);
    this.datospt.nombreraiz = '';
    this.datospt.nombrePlantilla = '';
    this.datospt.observaciones = '';
    this.datospt.umbral = undefined;
    this.datospt.criterios = this.criterios;

    
  }

  eliminar(criterio) {
    this.criteriosConexion.eliminarCriterio(criterio);
  }

  editar(criterio) {
    this.editarCriterio = criterio;
  }

  agregarCriterioEditado(){
    this.criteriosConexion.editarCriterio(this.editarCriterio);
  }


}
