import { Component, OnInit } from '@angular/core';
import { Resume, Experience, Education, Skill } from './resume';
import { ScriptService } from './script.service';
import { PlantillaService } from '../../services/plantilla/plantilla.service'

declare let pdfMake: any;
var d = new Date();
var ano = d.getFullYear();

var month = new Array();
month[0] = "Enero";
month[1] = "Febrero";
month[2] = "Marzo";
month[3] = "Abril";
month[4] = "Mayo";
month[5] = "Junio";
month[6] = "Julio";
month[7] = "Agosto";
month[8] = "Septiembre";
month[9] = "Octubre";
month[10] = "Noviembre";
month[11] = "Diciembre";

var mes = month[d.getMonth()];
var dia = d.getDate();

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

var h = addZero(d.getHours());
var m = addZero(d.getMinutes());
var s = addZero(d.getSeconds());


@Component({
  selector: 'app-reportepdf',
  templateUrl: './reportepdf.component.html',
  styleUrls: ['./reportepdf.component.css']
})
export class ReportepdfComponent implements OnInit {

  planillas: Array<any>;

  datosplantilla: any = {
    valo1: '',
    valo2: '',
    valo3: '',
    valo4: '',
    planilla: '',
    nombreLista: '',
    observaciones: '',
    referencias: '',
  }

  ngOnInit() {
    this.planillas = new Array<any>();
    this.viewData()
  }

  viewData() {
    this.PlantillaService.viewLista().subscribe((elements) => {
      this.planillas.push(...elements);
    })
  }

  agregar() {
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

  agregarCriterioEditado() {
    this.PlantillaService.editarplanilla(this.datosplantilla);
  }

  resume = new Resume();

  anos = [ano];
  meses = [mes];
  dias = [dia];
  horas = [h + ":" + m + ":" + s];

  constructor(private PlantillaService: PlantillaService, private scriptService: ScriptService) {

    this.resume = JSON.parse(sessionStorage.getItem('Check list')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }

    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  addExperience() {
    this.resume.experiences.push(new Experience());
  }

  addEducation() {
    this.resume.educations.push(new Education());
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.resume = new Resume();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('Check list', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: 'Resultados de la revisión de la lista de chequeo',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: 'Nombre de la lista: ' + this.resume.name,
              bold: true,
            },
            {
              text: 'Número consecutivo: ' + this.resume.contactNo,
              bold: true,
            },
            {
              text: 'Observaciones: ' + this.resume.address,
              bold: true,
            },
            {
              text: 'Referencia : ' + this.resume.email,
              bold: true,
            },
         
              /* {
                 text: 'Cargo: ' + this.resume.socialProfile,
                 link: this.resume.socialProfile,
                 color: 'blue',
               }*/
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        /*{
          text: 'Plantilla',
          style: 'header'
        },*/
        {
          columns: [
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },
        /*{
          text: 'Experencia',
          style: 'header'
        },
        this.getExperienceObject(this.resume.experiences),
        */
        {
          text: 'Fecha de diligenciamiento',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        /*{
          text: 'Otros detalles',
          style: 'header'
        },*/
        {
          text: this.resume.otherDetails
        },
        {
          text: 'Nombre de la lista de chequeo:',
          bold: true,
          style: 'sign'
        },
        {
          columns: [
            { qr: 'Nombre de la lista de chequeo: ' + this.resume.name + ', Numero consecutivo : ' + this.resume.contactNo, fit: 100 },
            {
              text: `${this.resume.name}`,
              alignment: 'right',
            }
          ]
        }
      ],
      info: {
        title: this.resume.name + '_Resultados de la revisión',
        author: this.resume.name,
        subject: 'Check list ',
        keywords: 'Check list, ONLINE RESUME',
      },
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }

  getExperienceObject(experiences: Experience[]) {

    const exs = [];

    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'Experencia'
            },
            {
              text: experience.employer,
            },
            {
              text: experience.jobDescription,
            }],
            {
              text: 'Duracion : ' + experience.experience + ' Meses',
              alignment: 'right'
            }
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getEducationObject(educations: Education[]) {
    return {
      margin: [0, 10, 0, 0],
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Año',
            style: 'tableHeader'
          },
          {
            text: 'Mes',
            style: 'tableHeader'
          },
          {
            text: 'Día',
            style: 'tableHeader'
          },
          {
            text: 'Hora',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [this.anos, this.meses, this.dias, this.horas];
          })
        ]
      }
    };
  }

  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic,
        width: 75,
        alignment: 'right'
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  addSkill() {
    this.resume.skills.push(new Skill());
  }

} 