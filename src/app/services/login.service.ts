import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _authService: AngularFireAuth
  ) { }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._authService.auth.signInWithEmailAndPassword(email, password)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  getAuth(): Observable<any> {
    return this._authService.authState.pipe(
      map(auth => auth)
    );
  }

  logOut(): void {
    this._authService.auth.signOut();
  }

  registry(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._authService.auth.createUserWithEmailAndPassword(email, password)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });    
  }

}
