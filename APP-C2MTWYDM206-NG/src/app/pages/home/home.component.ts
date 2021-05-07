import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

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
    this.router.navigate(["login"]);
    alert("has salido de tu sesión exitosamente");
  }

}
