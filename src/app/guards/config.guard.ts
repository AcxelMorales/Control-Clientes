import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';

import { ConfigService } from '../services/config.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private _configService: ConfigService
  ) { }

  canActivate(): Observable<boolean> {
    return this._configService.getConfiguracion().pipe(
      map(config => {
        if (config.permitir) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
  
}
