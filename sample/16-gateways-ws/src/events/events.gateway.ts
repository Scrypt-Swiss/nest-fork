import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway({path: '/test/path'})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log('received:', data)
    console.log('emitted:', this.server.emit('test', 'other hello event'))
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('message')
  onMessage(client: any, data: any) {
    console.log('received:', data)
    this.server.emit('test', 'hello message')
    return {event: 'message', data: 'got some data'}
  }
}
