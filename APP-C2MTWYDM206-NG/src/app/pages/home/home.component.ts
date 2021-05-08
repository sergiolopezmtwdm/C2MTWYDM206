import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OyenteService } from 'src/app/services/oyente.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  usersSubsription$: Subscription;

  listaUsuarios: any[] = [];
  // constructor(private router: Router, public socket: SocketioService) {
  constructor(private router: Router, private oyenteSvc: OyenteService) {
    // this.susbription$ = this.socket.on('broadcast-message').subscribe((userList: any) => {
    //   console.log('broadcast-message, ', userList);
    //   this.listaUsuarios = userList;
    // });
    this.usersSubsription$ = this.oyenteSvc.onListenUserList().subscribe((users: any) => {
      this.listaUsuarios = users;
    });
    this.listaUsuarios = oyenteSvc.listaUsuarios;

  }

  ngOnInit(): void {
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("rol");
    // // this.oyenteSvc.sendRol("anonimo")
    // this.oyenteSvc.sendNombre("");
    // localStorage.removeItem("id");
    // this.sidebarSvc.getItemsAnonimo().subscribe((data: any) => {
    //   this.menuItems = data;
    // });
    this.oyenteSvc.sendLogOut({ email: this.oyenteSvc.email });
    this.router.navigate(["login"]);
    alert("has salido de tu sesión exitosamente");
  }

  ngOnDestroy(): void {
    // this.susbription$.unsubscribe();
  }
}
