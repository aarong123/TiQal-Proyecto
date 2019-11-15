import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Criterio } from '../criterio/criterio.service';

export interface Plant {

  nombreraiz: string,
  nombrePlantilla: string,
  observaciones: string,
  umbral: number,
  criterios: AngularFirestoreDocument<Criterio>,


}
@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private plantilasCollection: AngularFirestoreCollection<Plant>;
  planti: Observable<Plant[]>;

  private plantillaDoc: AngularFirestoreDocument<Plant>;

  constructor(private afs: AngularFirestore) {
    this.plantilasCollection = afs.collection<Plant>('plant');
  }

  viewPlantilla() {
    this.planti = this.plantilasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Plant;
        const id = a.payload.doc.id;
        console.log(data)
        return { id, ...data };
      }))
    );
    return this.planti;
  }

  listaplatillas(): Observable<any> {
    return this.planti;
  }

  agregarplanilla(item: Plant) {
    this.plantilasCollection.add(item);
  }

  eliminarplanilla(planti) {
    this.plantillaDoc = this.afs.doc<Plant>(`plant/${planti.id}`);
    this.plantillaDoc.delete();
  }

  editarplanilla(planti) {
    this.plantillaDoc = this.afs.doc<Plant>(`plant/${planti.id}`);
    this.plantillaDoc.update(planti);
  }

}
