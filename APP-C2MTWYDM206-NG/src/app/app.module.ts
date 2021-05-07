import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRouterModule } from './app.route';
import { AuthGuard } from './guards/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
const config: SocketIoConfig = { url: 'http://slopezfu-node.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(environment.FIREBASE_SETTINGS),
    AngularFireAuthModule,
    AppRouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ["localhost:5000"],
        // whitelistedDomains: ["localhost:44378"],
        // blacklistedRoutes: []
        allowedDomains: ["localhost:3000"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
