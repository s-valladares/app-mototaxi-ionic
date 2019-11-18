import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

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
