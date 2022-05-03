import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import config from '../ormconfig';
import { ApiModule } from './api/api.module';
import { LoggerMiddleware } from './common/middewares/LoggerMiddleware';
import { CronModule } from './common/cron/cron.module';
import { LoggerModule } from './common/logger/logger.module';
import { WebsocketsModule } from './common/web-sockets/websockets.module';
import { CORSMiddleware } from './common/middewares/CORSMiddleware';

@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        ScheduleModule.forRoot(),
        ApiModule,
        CronModule,
        LoggerModule,
        WebsocketsModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*')
            .apply(CORSMiddleware)
            .forRoutes('*');
    }
}
