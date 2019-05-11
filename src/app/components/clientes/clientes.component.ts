import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ClientesService } from 'src/app/services/clientes.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Cliente } from 'src/app/models/Cliente';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  @ViewChild('f') form: NgForm;
  @ViewChild('close') close: ElementRef;

  constructor(
    private _clientesService: ClientesService,
    private _flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this._clientesService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  public getSaldo(): number {
    let total: number = 0;

    if (this.clientes) {
      this.clientes.forEach(value => total += value.saldo);
    }

    return total;
  }

  public add({ value, valid }: { value: Cliente, valid: boolean }): void {
    if (!valid) {
      this._flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    } else {
      this._clientesService.addCliente(value);
      this.form.resetForm();
      this.closeModal();
    }
  }

  private closeModal(): void {
    this.close.nativeElement.click();
  }

}
