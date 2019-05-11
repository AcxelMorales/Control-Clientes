import { Injectable } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import { Cliente } from '../models/Cliente';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientesCollection: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(
    private _db: AngularFirestore
  ) {
    // Asignamos la colección de Firebase a la propiedad.
    this.clientesCollection = this._db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
  }

  getClientes(): Observable<Cliente[]> {
    // Obtenemos los clientes
    this.clientes = this.clientesCollection.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );

    return this.clientes;
  }

  getCliente(id: string): Observable<Cliente> {
    this.clienteDoc = this._db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map(act => {
        if (act.payload.exists === false) {
          return null;
        } else {
          const datos = act.payload.data() as Cliente;
          datos.id = act.payload.id;
          return datos;
        }
      })
    );

    return this.cliente;
  }

  addCliente(cliente: Cliente): void {
    this.clientesCollection.add(cliente);
  }

  updateCliente(cliente: Cliente): void {
    this.clienteDoc = this._db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  deleteCliente(cliente: Cliente): void {
    this.clienteDoc = this._db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }

}
