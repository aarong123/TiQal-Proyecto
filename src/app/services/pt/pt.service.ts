import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pt {
 
    nombreraiz: string,
  nombrePlantilla: string,
  observaciones: string,
  umbral: number,
  criterio1: string,
 

}
@Injectable({
  providedIn: 'root'
})
export class PtService {

  private plantilasCollection: AngularFirestoreCollection<Pt>;
  plant: Observable<Pt[]>;

  private plantillaDoc: AngularFirestoreDocument<Pt>;

  constructor(private afs: AngularFirestore) {
      this.plantilasCollection = afs.collection<Pt>('plant');
      this.plant = this.plantilasCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Pt;
              const id = a.payload.doc.id;
              return { id, ...data };
          }))
      );
  }

  listaplatillas() {
      return this.plant;
  }

  agregarplanilla(item: Pt) {
      this.plantilasCollection.add(item);
  }

  eliminarplanilla(plant) {
      this.plantillaDoc = this.afs.doc<Pt>(`plant/${plant.id}`);
      this.plantillaDoc.delete();
  }

  editarplanilla(plant) {
      this.plantillaDoc = this.afs.doc<Pt>(`plant/${plant.id}`);
      this.plantillaDoc.update(plant);
  }
 
}
