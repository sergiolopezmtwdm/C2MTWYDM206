import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpClient) {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {

  }

  async canActivate() {
    // console.log("canActivate")
    const token = localStorage.getItem("jwt");

    // if (token && !this.jwtHelper.isTokenExpired) {
    if (token) {
      // console.log("existe token");
      // console.log(this.jwtHelper.decodeToken(token));
      console.log(`token: ${JSON.stringify(token)}`);
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    this.router.navigate(["login"]);
    return false;
    // const isRefreshSuccess = await this.tryRefreshingToken(token));
    // if (!isRefreshSuccess) {
    //   this.router.navigate(["login"]);
    // }
    // return isRefreshSuccess;
  }
  // private async tryRefreshingToken(token: string): Promise<boolean> {
  //   const refreshToken: string = localStorage.getItem("refreshToken");
  //   const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

  //   let isRefreshSuccess: boolean;
  //   try {
  //     // const response = await this.http.post("https://localhost:44378/api/token/refresh", credentials, {
  //     const response = await this.http.post("https://apimtwdmfinalproject.azurewebsites.net/api/token/refresh", credentials, {
  //       headers: new HttpHeaders({
  //         "Content-Type": "application/json"
  //       }),
  //       observe: 'response'
  //     }).toPromise();
  //     // If token refresh is successful, set new tokens in local storage.
  //     const newToken = (<any>response).body.accessToken;
  //     const newRefreshToken = (<any>response).body.refreshToken;
  //     localStorage.setItem("jwt", newToken);
  //     localStorage.setItem("refreshToken", newRefreshToken);
  //     isRefreshSuccess = true;
  //   }
  //   catch (ex) {
  //     isRefreshSuccess = false;
  //   }
  //   return isRefreshSuccess;
  // }

}

