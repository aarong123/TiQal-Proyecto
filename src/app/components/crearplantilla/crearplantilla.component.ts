import { Component, OnInit } from '@angular/core';
import { CriterioService } from 'src/app/services/criterio/criterio.service';

@Component({
  selector: 'app-crearplantilla',
  templateUrl: './crearplantilla.component.html',
  styleUrls: ['./crearplantilla.component.css']
})
export class CrearplantillaComponent implements OnInit {

  criterios: any;

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

  constructor(private criteriosConexion : CriterioService) {
    this.criteriosConexion.listaCriterios().subscribe(criterio => {
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
