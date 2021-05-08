import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment";

// const endPoint: string = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) { }

  public login(credenciales: any) {
    // console.log('entrando al login del svc con las credenciales', credenciales);
    // console.log(`en la uri: ${environment.urlAPI}/loginOAuth2`)
    // return this.http.post(`${endPoint}/loginOAuth2`,
    return this.http.post(`${environment.urlAPI}/loginOAuth2`,
      credenciales, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  public setlocalStorage(response: any) {
    // console.log("token: ", (<any>response).jwt);
    // console.log("refresToken: ", (<any>response).refreshToken);
    // console.log("todo: ", (<any>response));
    const token = (<any>response).token;
    // const refreshToken = (<any>response).refreshToken;
    // const rol = (<any>response).rol;
    // this.oyenteSvc.sendRol(rol);
    // this.oyenteSvc.sendNombre((<any>response).nombreCompleto);
    // const id = (<any>response).id;
    localStorage.setItem("jwt", token);
    // localStorage.setItem("refreshToken", refreshToken);
    // localStorage.setItem("rol", rol);
    // localStorage.setItem("id", id);
  }
}
