import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from './services/auth.service';
import { SocketioService } from './services/socketio.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'APP-C2MTWYDM206';
  // suscription$: Subscription;


  constructor() {

  }

  // constructor(public socket: SocketioService, private authSvc: AuthService) {
  //   // this.suscription$ = this.socket.on('broadcast-message').subscribe((payload: any) => {
  //   this.suscription$ = this.socket.on('broadcast-message').subscribe((payload: any) => {
  //     // console.log(payload);
  //     console.log(payload);
  //   });
  // }

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
    // this.suscription$.unsubscribe();
  }
}
