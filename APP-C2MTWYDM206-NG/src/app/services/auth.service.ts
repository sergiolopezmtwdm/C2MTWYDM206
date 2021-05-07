import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import 'firebase/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) {
    firebase.initializeApp(environment.FIREBASE_SETTINGS);
    firebase.auth().onAuthStateChanged((user: any) => {
      // console.log('Evento onAuthStateChanged: ', user);
    });
  }

  public login(credenciales: any) {
    console.log('entrando al login del svc con las credenciales', credenciales);
    return this.http.post(`${environment.urlAPI}/loginOAuth2`,
      credenciales, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  public setlocalStorage(response: any) {
    const token = (<any>response).token;
    localStorage.setItem("jwt", token);
  }

  async loginOAuth2(provider: string) {
    let oauth2 = null;
    switch (provider) {
      case 'Google':
        oauth2 = new firebase.auth.GoogleAuthProvider();
        oauth2.setCustomParameters({ prompt: 'select_account' });
        break;
      case 'Microsoft':
        oauth2 = new firebase.auth.OAuthProvider('microsoft.com');
        oauth2.setCustomParameters({ prompt: 'select_account' });
        break;
      case 'Apple':
        oauth2 = new firebase.auth.OAuthProvider('apple.com');
        break;
      case 'Yahoo':
        oauth2 = new firebase.auth.OAuthProvider('yahoo.com');
        oauth2.setCustomParameters({ prompt: 'login' });
        oauth2.addScope('email');
        oauth2.addScope('profile');
        // oauth2.addScope('sdct-r');
        break;
      case 'Facebook':
        oauth2 = new firebase.auth.FacebookAuthProvider;
        break;
      case 'Twitter':
        oauth2 = new firebase.auth.TwitterAuthProvider;
        break;
      default:
        oauth2 = new firebase.auth.GoogleAuthProvider();
        oauth2.setCustomParameters({ prompt: 'select_account' });
        break;
    }

    return await this.fireAuth.signInWithPopup(oauth2)
      .then(() => firebase.auth().currentUser)
      .catch((error: any) => {
        return {
          success: false,
          error
        }
      })
  }
}
