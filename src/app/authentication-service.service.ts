import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from './interface/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userData: any;
  private userSessionAlive = new BehaviorSubject<boolean>(false);

  constructor(public angularFireStore: AngularFirestore, public angularFireAuth: AngularFireAuth, public router: Router,
    public ngZone: NgZone) { 
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        sessionStorage.setItem('wallUser', JSON.stringify(this.userData));
        this.router.navigate(['home']);
        this.userSessionAlive.next(true);
      } else {
        sessionStorage.setItem('wallUser', null);
      }
    })
  }

  isUserSessionAlive(): Observable<boolean> {
    return this.userSessionAlive.asObservable();
  }

  getAuthentication():boolean {
    let userSession = sessionStorage.getItem('wallUser');
    return userSession !== undefined && userSession !== null && userSession!=="null";
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['home']);
       })
      this.setUserData(result.user);
      this.userSessionAlive.next(true);
    }).catch((error) => {
      window.alert(error)
    })
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${user.uid}`);
    const userData: User = {
      userId: user.uid,
      email: user.email,
      fullName: user.displayName,
      password: null,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, { merge: true })
  }

  authLogout() {
    return this.angularFireAuth.auth.signOut().then(() => {
      sessionStorage.removeItem('wallUser');
      this.userSessionAlive.next(false);
    })
  }

}
