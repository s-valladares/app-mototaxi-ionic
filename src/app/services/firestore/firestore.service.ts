import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  public getId(documentId: string) {
    return this.firestore.collection('ubicaciones').doc(documentId).snapshotChanges();
  }

  public getAll() {
    return this.firestore.collection('ubicaciones').snapshotChanges();
  }

  public create(datos) {
    return this.firestore.collection('ubicaciones').add(datos);
  }

  public update(documentId, datos) {
    return this.firestore.collection('ubicaciones').doc(documentId).set(datos);
  }

  public eliminar(documentId) {
    return this.firestore.collection('ubicaciones').doc(documentId).delete();
  }
}
