import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { SocketioService } from './services/socketio.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'APP-C2MTWYDM206';
  suscription$: Subscription;


  constructor(public socket: SocketioService) {
    // this.suscription$ = this.socket.on('broadcast-message').subscribe((payload: any) => {
    this.suscription$ = this.socket.on('broadcast-message').subscribe((payload: any) => {
      // console.log(payload);
      console.log(payload);
    });
  }

  ngOnInit() {

  }

  sendMessage(msg: string) {
    // console.log(msg);
    this.socket.emit('message', {
      client: 'Angular',
      msg
    });
  }


  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }
}
