import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OyenteService {

  private subject$ = new Subject<string>();
  private subscription$ = new Subject<any>();
  private signInSubscription$ = new Subject<any>();
  private logOutSubscription$ = new Subject<any>();
  private userListSubscription$ = new Subject<any>();

  listaUsuarios: any[] = [];
  email: string;

  constructor(private router: Router) { }

  /**
   * Método para publicación de Observable
   * @param criterio
   */
  async sendCriterio(criterio: string) {
    console.log(`criterio: ${criterio}`);
    await this.router.navigate(['componentes/allgames']);
    this.subject$.next(criterio);
  }

  /**
   * Método para subscribiernos al observable
   */
  onListenCriterio(): Observable<string> {
    return this.subject$.asObservable();
  }

  sendSignUp(sign: any) {
    this.subscription$.next(sign);
  }

  onListenSignUp(): Observable<any> {
    return this.subscription$.asObservable();
  }

  sendSignIn(sign: any) {
    this.signInSubscription$.next(sign);
  }

  onListenSignIn(): Observable<any> {
    return this.signInSubscription$.asObservable();
  }

  sendLogOut(sign: any) {
    this.logOutSubscription$.next(sign);
  }

  onListenLogOut(): Observable<any> {
    return this.logOutSubscription$.asObservable();
  }

  sendUserList(sign: any) {
    this.userListSubscription$.next(sign);
  }

  onListenUserList(): Observable<any> {
    return this.userListSubscription$.asObservable();
  }
}
