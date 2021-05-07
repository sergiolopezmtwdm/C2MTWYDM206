import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from '../../services/auth.service';
import { SocketioService } from '../../services/socketio.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  suscription$: Subscription;

  constructor(public socket: SocketioService, private authSvc: AuthService, private router: Router, private loginSvc: LoginService) {
    // this.suscription$ = this.socket.on('broadcast-message').subscribe((payload: any) => {
    this.suscription$ = this.socket.on('broadcast-message').subscribe((payload: any) => {
      // console.log(payload);
      console.log(payload);
    });
  }

  ngOnInit(): void {
  }

  public login = () => {
    // console.log('intentando logearse');
    this.loginSvc.login({ correo: 'sergioivan16@gmail.com', apiKey: environment.API_KEY }).subscribe(async response => {
      await this.loginSvc.setlocalStorage(response);
      // alert("has iniciado sesión correctamente " + (<any>response).nombreCompleto);
      alert("has iniciado sesión correctamente ");
      this.router.navigate(['home']);
    }, err => {
      alert("Inicio de sesión fallida");
    });
  }

  loginOauth2(provider: string) {
    // console.log('Provider: ', provider);
    this.authSvc.loginOAuth2(provider)
      .then((user: any) => {
        // console.log(user);
        // console.log('Autentificado correctamente');
        this.socket.emit('signUp', {
          fullName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          apiKey: environment.API_KEY
        });
        this.loginSvc.login({ correo: user.email, apiKey: '606cbb0d018cc952deb62e05' }).subscribe(async response => {
          await this.loginSvc.setlocalStorage(response);
          // alert("has iniciado sesión correctamente " + (<any>response).nombreCompleto);
          alert("has iniciado sesión correctamente " + user.displayName);
          this.router.navigate(['home']);
        }, err => {
          alert("Inicio de sesión fallida");
        });
      })
      .catch((error) => {
        return {
          success: false,
          error
        }
      });
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }

}