import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private logger: LoggerService) {}

    use(req: Request, res: Response, next: NextFunction): any {
        const dateOb = new Date().toISOString();

        const logInfo = `API: ${req.method} request to PATH: ${req.path}${
            Object.entries(req.params)[0][1]
        } time: ${dateOb}`;

        this.logger.createLog(logInfo);

        next();
    }
}
