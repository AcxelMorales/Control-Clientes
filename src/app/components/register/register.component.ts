import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

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

  registry(): void {
    this._loginService.registry(this.email, this.password)
      .then(resp => this.router.navigate(['/']))
      .catch(err => this._flashMessagesService.show(err.message, { cssClass: 'alert-danger', timeout: 3000 }));
  }

}
