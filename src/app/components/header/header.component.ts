import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  isLog: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(
    private _loginService: LoginService,
    private router: Router,
    private _configService: ConfigService
  ) { }

  ngOnInit(): void {
    this._loginService.getAuth()
      .subscribe(auth => {
        if (auth) {
          this.isLog = true;
          this.loggedInUser = auth.email
        } else {
          this.isLog = false;
        }
      });
    
    this._configService.getConfiguracion()
      .subscribe(config => this.permitirRegistro = config.permitir);
  }

  logOut(): void {
    this._loginService.logOut();
    this.isLog = false;
    this.router.navigate(['/login']);
  }

}
