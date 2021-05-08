import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from '../../services/auth.service';
import { SocketioService } from '../../services/socketio.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { OyenteService } from 'src/app/services/oyente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // @Input() socket: any;

  // title = 'APP-C2MTWYDM206';
  // suscription$: Subscription;

  // constructor(public socket: SocketioService, private authSvc: AuthService, private router: Router) {
  constructor(private authSvc: AuthService, private router: Router, private oyenteSvc: OyenteService) {
    // this.suscription$ = this.socket.on('broadcast-message').subscribe((payload: any) => {
    //   // console.log(payload);
    //   console.log(payload);
    // });
  }

  // ngOnInit(): void {
  // }

  // public login = () => {
  //   // console.log('intentando logearse');
  //   this.loginSvc.login({ correo: 'sergioivan16@gmail.com', apiKey: environment.API_KEY }).subscribe(async response => {
  //     await this.loginSvc.setlocalStorage(response);
  //     // alert("has iniciado sesión correctamente " + (<any>response).nombreCompleto);
  //     alert("has iniciado sesión correctamente ");
  //     this.router.navigate(['home']);
  //   }, err => {
  //     alert("Inicio de sesión fallida");
  //   });
  // }

  sigIn(provider: string) {
    this.authSvc.loginOAuth2(provider)
      .then((user: any) => {
        this.authSvc.login({ correo: user.email, apiKey: '606cbb0d018cc952deb62e05' }).subscribe(async response => {
          await this.authSvc.setlocalStorage(response);
          console.log("send oyente sendSignIn");
          this.oyenteSvc.sendSignIn({
            fullName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            apiKey: environment.API_KEY
          });
          alert("has iniciado sesión correctamente " + user.displayName);
          this.router.navigate(['home']);
        }, err => {
          // alert("Inicio de sesión fallida");
          alert(err.error.response.msg);
          // alert((<any>err).msg);
          // alert(JSON.stringify(err));
        });
      })
      .catch((error) => {
        return {
          success: false,
          error
        }
      });
  }

  signUp(provider: string) {
    console.log("Autentificado con proveedor");
    this.authSvc.loginOAuth2(provider)
      .then((user: any) => {
        // console.log(user);
        console.log('Autentificado por proveedor correctamente, registrando en nuestra bd...');
        this.oyenteSvc.sendSignUp({
          fullName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          apiKey: environment.API_KEY
        });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        alert("Ha ocurrido un error durante su registro.");
        return {
          success: false,
          error
        }
      });
  }

  // ngOnDestroy(): void {
  //   this.suscription$.unsubscribe();
  // }

}
