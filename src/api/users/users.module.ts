import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserModule } from '../../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constants';

@Module({
    imports: [UserModule,
        JwtModule.register({ secret: jwtConstants.secret }),],
    controllers: [UsersController],
})
export class UsersApiModule {}
