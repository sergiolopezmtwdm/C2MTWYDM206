import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from './services/auth.service';
import { SocketioService } from './services/socketio.service';
import { environment } from 'src/environments/environment';
import { OyenteService } from './services/oyente.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'APP-C2MTWYDM206';
  suscription$: Subscription;
  signUpSubscription$: Subscription;
  signInSubscription$: Subscription;
  logOutSubscription$: Subscription;

  // constructor() {

  // }

  constructor(public socket: SocketioService, private authSvc: AuthService, private oyenteSvc: OyenteService) {
    // this.suscription$ = this.socket.on('broadcast-message').subscribe((payload: any) => {
    this.suscription$ = this.socket.on('broadcast-message').subscribe((payload: any) => {
      // console.log(payload);
      console.log(payload);
      this.oyenteSvc.listaUsuarios = payload;
      this.oyenteSvc.sendUserList(payload);
    });
    this.signUpSubscription$ = this.oyenteSvc.onListenSignUp().subscribe((user: any) => {
      // console.log(payload);
      // console.log('signUpSubscription');
      // console.log(`${JSON.stringify(user)}`);
      this.socket.emit('signUp', {
        fullName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        apiKey: environment.API_KEY
      });
      alert("Se ha registrado correctamente.");
    });
    this.signInSubscription$ = this.oyenteSvc.onListenSignIn().subscribe((user: any) => {
      // console.log(payload);
      // console.log('signInSubscription');
      // console.log("on oyente sendSignIn");
      this.socket.emit('signIn', {
        fullName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        apiKey: environment.API_KEY
      });
      this.oyenteSvc.email = user.email;
      // console.log("terminando oyente sendSignIn");
    });
    this.logOutSubscription$ = this.oyenteSvc.onListenLogOut().subscribe((user: any) => {
      // console.log('logOutSubscription');
      // console.log("on oyente sendSignIn");
      this.socket.emit('logOut', {
        email: user.email,
      });
      // console.log("terminando oyente onListenLogOut");
    });
  }

  ngOnInit() {

  }

  // loginOauth2(provider: string) {
  //   console.log('Provider: ', provider);
  //   this.authSvc.loginOAuth2(provider)
  //     .then((user: any) => {
  //       console.log(user);
  //       this.socket.emit('signUp', {
  //         fullName: user.displayName,
  //         email: user.email,
  //         photoUrl: user.photoURL,
  //         apiKey: environment.API_KEY
  //       });
  //     })
  //     .catch((error) => {
  //       return {
  //         success: false,
  //         error
  //       }
  //     });
  // }

  // sendMessage(msg: string) {
  //   // console.log(msg);
  //   this.socket.emit('message', {
  //     client: 'Angular',
  //     msg
  //   });
  // }


  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
    this.signUpSubscription$.unsubscribe();
    this.signInSubscription$.unsubscribe();
    this.logOutSubscription$.unsubscribe();
  }
}
