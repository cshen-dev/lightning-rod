import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  authState: any = null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router) {
    this.user = firebaseAuth.authState;
  }

  get currentUserObservable(): any {
    return this.user;
  }

  emailSignUp(email: string , password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
     return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user;
         this.updateUserData();
       })
       .catch(error => console.log(error));
  }

  resetPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }

  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  public logout() {
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['home']);
  }

  private socialSignIn(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user;
        console.log(credential);
        this.updateUserData();
        this.router.navigate(['home']);
      })
      .catch(err => console.log(err));
  }

  private updateUserData(): void {
    // insert user data to db;
    localStorage.setItem('user', JSON.stringify(this.authState));
  }
}
