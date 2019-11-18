import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  public create(colection, datos) {
    return this.firestore.collection(colection).add(datos);
  }
}
