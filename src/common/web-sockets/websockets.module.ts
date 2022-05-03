import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WebsocketService } from './websocket.service';
import { jwtConstants } from '../../auth/constants';

@Global()
@Module({
    imports: [JwtModule.register({ secret: jwtConstants.secret })],
    providers: [WebsocketService],
    exports: [WebsocketService],
})
export class WebsocketsModule {}
