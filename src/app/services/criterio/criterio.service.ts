import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Criterio { 
  criterio: string,
  tipoCriterio: string,
  ponderacion: number,
  desCriterio: string
}

@Injectable({
  providedIn: 'root'
})

export class CriterioService {

  private criteriosCollection: AngularFirestoreCollection<Criterio>;
  criterios: Observable<Criterio[]>;

  private criterioDoc: AngularFirestoreDocument<Criterio>;

  constructor(private afs: AngularFirestore) {
    this.criteriosCollection = afs.collection<Criterio>('criterios');
   
   }

   viewCriterio(){
    this.criterios = this.criteriosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Criterio;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.criterios;
   }

   
   listaCriterios(){
     return this.criterios;
   }

   agregarCriterio(item: Criterio) {
    this.criteriosCollection.add(item);
  }

  eliminarCriterio(criterio){
    this.criterioDoc = this.afs.doc<Criterio>(`criterios/${criterio.id}`);
    this.criterioDoc.delete();
  }

  editarCriterio(criterio){
    this.criterioDoc = this.afs.doc<Criterio>(`criterios/${criterio.id}`);
    this.criterioDoc.update(criterio);
  }
}
