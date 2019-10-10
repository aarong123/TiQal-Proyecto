import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Planilla {
    valo1: number,
    valo2: number,
    valo3: number,
    valo4: number,
    planilla: string,
    nombreLista: string,
    observaciones: string,
    referencias: string,
}

@Injectable({
    providedIn: 'root'
})

export class PlantillaService {


    private plantilasCollection: AngularFirestoreCollection<Planilla>;
    planillas: Observable<Planilla[]>;

    private plantillaDoc: AngularFirestoreDocument<Planilla>;

    constructor(private afs: AngularFirestore) {
        this.plantilasCollection = afs.collection<Planilla>('planillas');
        this.planillas = this.plantilasCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Planilla;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    listaplatillas() {
        return this.planillas;
    }

    agregarplanilla(item: Planilla) {
        this.plantilasCollection.add(item);
    }

    eliminarplanilla(planilla) {
        this.plantillaDoc = this.afs.doc<Planilla>(`planillas/${planilla.id}`);
        this.plantillaDoc.delete();
    }

    editarplanilla(planilla) {
        this.plantillaDoc = this.afs.doc<Planilla>(`planillas/${planilla.id}`);
        this.plantillaDoc.update(planilla);
    }
}
