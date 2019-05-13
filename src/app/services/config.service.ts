import { Injectable } from '@angular/core';

import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import { Configuracion } from '../models/Configuracion';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configuracionDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<Configuracion>;

  id: string = '1';

  constructor(
    private _db: AngularFirestore
  ) { }

  getConfiguracion(): Observable<Configuracion> {
    this.configuracionDoc = this._db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracion = this.configuracionDoc.valueChanges();
    return this.configuracion;
  }
  
  setConfiguracion(configuracion: Configuracion): void {
    this.configuracionDoc = this._db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracionDoc.update(configuracion);
  }

}
