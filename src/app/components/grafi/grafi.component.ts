import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { CriterioService } from 'src/app/services/criterio/criterio.service';


@Component({
  selector: 'app-grafi',
  templateUrl: './grafi.component.html',
  styleUrls: ['./grafi.component.css']
})
export class GrafiComponent  implements OnInit {
  criterios: any;

  datosCriterio: any = {
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
		let chart = new CanvasJS.Chart("chartContainer",  {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Grafico de barras de criterios"
		},
		data: [{  
      type: "column",
			dataPoints: [
        { y: 20 , label: "Verdadero"},
        {y: 5 , label: "Falso"}
        
			]
    }]
     
	});
		
 chart.render();
 

  let chart1 = new CanvasJS.Chart("chartContainer11", {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: "Grafico de torta de criterios"
    },
    data: [{
      type: "pie",
      showInLegend: true,
      toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
      indexLabel: "{name} - #percent%",
      dataPoints: [
        { y: 450, name: "Food" },
        { y: 120, name: "Insurance" },
        { y: 300, name: "Traveling" },
        { y: 800, name: "Housing" },
        { y: 150, name: "Education" },
        { y: 150, name: "Shopping"},
        { y: 250, name: "Others" }
      ]
    }]
  });
    
  chart1.render();
    }
    
      
        
}