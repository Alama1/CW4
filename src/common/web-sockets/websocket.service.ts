import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@WebSocketGateway(81, { cors: true })
export class WebsocketService
    implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;

    constructor(private jwtService: JwtService) {
    }

    handleConnection(socket: Socket) {
        const authorizationHeader = socket.handshake.headers.authorization;
        try {
            const token = this.jwtService.verify(authorizationHeader.split(' ')[1]);
            if (!token) {
                socket.emit('Error', new UnauthorizedException());
                socket.disconnect();
            }
        } catch (e) {
            socket.emit('Error', new UnauthorizedException(e));
            socket.disconnect();
        }
    }

    handleDisconnect(socket) {
        const [key] = socket.adapter.rooms.keys();
        const rooms = this.server.sockets.adapter.rooms.get(key);
        const usersCount = rooms ? rooms.size : 0;
        this.server.to(key).emit('users', usersCount);
    }

    @SubscribeMessage('chat')
    handleChat(
        @MessageBody('text') text: string,
        @MessageBody('room') room: string,
        @MessageBody('sender') sender: string,
        @ConnectedSocket() client: Socket,
    ) {
        client.broadcast
            .to(room)
            .emit('chat', { sender: JSON.parse(sender).name, text: text });
    }

    @SubscribeMessage('coordinates')
    handleCoordinates(
        @MessageBody('room') room: string,
        @MessageBody('lat') lat: string,
        @MessageBody('lng') lng: string,
    ) {
        this.server.to(room).emit('coordinates', { lat: lat, lng: lng });
    }
}
