import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from "./pages/login/login.component";
// import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



const routes: Routes = [
  // { path: '', redirectTo: '/carrito', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  // { path: 'customers', component: CustomersComponent },
  // { path: 'carrito', component: CarritoComponent },
  // { path: 'perfil', component: PerfilComponent },
  // { path: 'juegos', component: AllgamesComponent },
  // => (return)

  // { path: 'componentes', loadChildren: () => import('./pages/componentes/componentes.module').then(module => module.ComponentesModule)},
  // { path: 'productos', loadChildren: () => import('./pages/productos/productos.module').then(module => module.ProductosModule) },
  // { path: 'codigos', loadChildren: () => import('./pages/codigos/codigos.module').then(module => module.CodigosModule) },
  // { path: 'clientes', loadChildren: () => import('./pages/clientes/clientes.module').then(module => module.ClientesModule) },
  // { path: 'ventas', loadChildren: () => import('./pages/ventas/ventas.module').then(module => module.VentasModule) },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], //usehash para diferenciar una carpeta de una ruta
  // imports: [RouterModule.forRoot(routes, { useHash: false })], //usehash para diferenciar una carpeta de una ruta
  //solo un archivo de rutas principal /forRoot/
  // para archivos de rutas hijos, /forchild/
  exports: [RouterModule]
})

export class AppRouterModule {

}
