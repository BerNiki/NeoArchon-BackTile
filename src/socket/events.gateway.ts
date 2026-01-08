import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MoveDataInterface } from 'src/api/moves/interface/move.interface';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client conyekted: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Klajent diszkonyekted: ${client.id}`);
  }

  @SubscribeMessage('move')
  handleMove(
    @MessageBody() data: { gameId: string; moveData: MoveDataInterface },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('happen');
    this.server.emit('moveUpdate', {
      gameId: data.gameId,
      moveData: data.moveData,
      by: client.id,
    });
  }
}
