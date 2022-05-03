import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../../user/user.module';
import { AuthService } from '../../auth/auth.service';
import { LocalStrategy } from '../../strategy/local.strategy';
import { jwtConstants } from '../../auth/constants';
import { JwtStrategy } from '../../strategy/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: process.env.AUTHKEYEXPIRETIME },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthApiModule {}
