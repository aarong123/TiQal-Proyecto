import { Component, OnInit } from '@angular/core';
import { PlantillaService } from '../../services/plantilla/plantilla.service'

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  planillas: any;

  datosplantilla: any = {
  valo1:'',
  valo2: '',
  valo3:'',
  valo4: '',
  planilla : '',
  nombreLista:'',
  observaciones : '',
  referencias  : '',
}

constructor(private PlantillaService : PlantillaService) {
  this.PlantillaService.listaplatillas().subscribe(planilla => {
    this.planillas = planilla;
    console.log(this.planillas);  
  })
 }
  ngOnInit() {
    
  }

  
  agregar(){
    this.PlantillaService.agregarplanilla(this.datosplantilla);
    this.datosplantilla.planilla = '';
    this.datosplantilla.nombreLista = '';
    this.datosplantilla.observaciones = '';
    this.datosplantilla.referencias = '';
    this.datosplantilla.valo1 = undefined;
    this.datosplantilla.valo2 = undefined;
    this.datosplantilla.valo3 = undefined;
    this.datosplantilla.valo4 = undefined;
   
  }

  eliminar(planilla) {
    this.PlantillaService.eliminarplanilla(planilla);
  }

  editar(planilla) {
    this.datosplantilla = planilla;
  }

  agregarCriterioEditado(){
    this.PlantillaService.editarplanilla(this.datosplantilla);
  }



}