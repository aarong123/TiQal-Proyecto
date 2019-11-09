import { Component } from '@angular/core';
import { Resume, Experience, Education, Skill } from './resume';
import { ScriptService } from './script.service';
import { PlantillaService } from '../../services/plantilla/plantilla.service'

declare let pdfMake: any ;
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent  {

 
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

  resume = new Resume();

  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];

  constructor(private PlantillaService : PlantillaService, private scriptService: ScriptService) {
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

    this.PlantillaService.listaplatillas().subscribe(planilla => {
      this.planillas = planilla;
      console.log(this.planillas);  
    })
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
          text: 'Check list',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.resume.name,
              style: 'Nombre'
            },
            {
              text: this.resume.address
            },
            {
              text: 'Correo : ' + this.resume.email,
            },
            {
              text: 'Numero de telefono ' + this.resume.contactNo,
            },
            {
              text: 'Cargo: ' + this.resume.socialProfile,
              link: this.resume.socialProfile,
              color: 'blue',
            }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        {
          text: 'Platilla',
          style: 'header'
        },
        {
          columns : [
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },
        {
          text: 'Experencia',
          style: 'header'
        },
        this.getExperienceObject(this.resume.experiences),

        {
          text: 'Empresa',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'Otros detalles',
          style: 'header'
        },
        {
          text: this.resume.otherDetails
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
              { qr: this.resume.name + ', Numero de telefono : ' + this.resume.contactNo, fit : 100 },
              {
              text: `(${this.resume.name})`,
              alignment: 'right',
              }
          ]
        }
      ],
      info: {
        title: this.resume.name + '_Check list',
        author: this.resume.name,
        subject: 'Check list ',
        keywords: 'Check list, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
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
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Trabajo',
            style: 'tableHeader'
          },
          {
            text: 'Mes',
            style: 'tableHeader'
          },
          {
            text: 'Feche inicio',
            style: 'tableHeader'
          },
          {
            text: 'Fecha fin',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          })
        ]
      }
    };
  }

  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 75,
        alignment : 'right'
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