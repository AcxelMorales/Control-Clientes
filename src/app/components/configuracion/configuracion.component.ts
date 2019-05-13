import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from 'src/app/services/config.service';

import { Configuracion } from 'src/app/models/Configuracion';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styles: []
})
export class ConfiguracionComponent implements OnInit {

  permitir: boolean = false;

  constructor(
    private router: Router,
    private _configService: ConfigService
  ) { }

  ngOnInit(): void {
    this._configService.getConfiguracion()
      .subscribe((config: Configuracion) => this.permitir = config.permitir);
  }

  save(): void {
    let configuracion = { permitir: this.permitir };
    this._configService.setConfiguracion(configuracion);
    this.router.navigate(['/']);
  }

}
