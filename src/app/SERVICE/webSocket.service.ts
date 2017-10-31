import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WebSocketService {
    ws: WebSocket;
    constructor() { }


    createObservableSocket(url: string): Observable<any> {
        this.ws = new WebSocket(url);
        return new Observable(
            observer => {
                this.ws.onmessage = (event) => observer.next(event.data);
                this.ws.onerror = (event) => observer.error(event);
                this.ws.onclose = (event) => observer.complete();
                this.ws.onopen = (event) => this.sendMsg("hello my client");
                return ()=>this.ws.close();
            }
        );
    }

    sendMsg(msg: any) {
        this.ws.send(JSON.stringify(msg));
    }
}