import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersApiModule } from './users/users.module';
import { AuthApiModule } from './auth/auth.module';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { TestsModule } from './tests/tests.module';

@Module({
    imports: [UsersApiModule, AuthApiModule, TestsModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class ApiModule {}
