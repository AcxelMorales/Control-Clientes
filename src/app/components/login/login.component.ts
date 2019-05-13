import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private _flashMessagesService: FlashMessagesService,
    private _loginService: LoginService
  ) { }

  ngOnInit(): void {
    this._loginService.getAuth()
      .subscribe(auth => {
        if (auth) this.router.navigate(['/'])
      });
  }

  public login(): void {
    this._loginService.login(this.email, this.password)
      .then(resp => this.router.navigate(['/']))
      .catch(err => this._flashMessagesService.show(err.message, { cssClass: 'alert-danger',timeout: 3000 }));
  }

}
