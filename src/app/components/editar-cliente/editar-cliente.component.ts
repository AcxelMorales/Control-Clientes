import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Cliente } from 'src/app/models/Cliente';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styles: []
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };
  id: string;

  constructor(
    private _clientesService: ClientesService,
    private _flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this._clientesService.getCliente(this.id).subscribe(cliente => this.cliente = cliente);
  }

  public update({ value, valid }: { value: Cliente, valid: boolean }): void {
    if (!valid) {
      this._flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    } else {
      value.id = this.id;
      this._clientesService.updateCliente(value);
      this.router.navigate(['/']);
    }
  }

  public delete(): void {
    if (confirm('¿Seguro que desea eliminar el cliente?')) {
      this._clientesService.deleteCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
