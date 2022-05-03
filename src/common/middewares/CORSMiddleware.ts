import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CORSMiddleware implements NestMiddleware {
    constructor() {}

    use(req: Request, res: Response, next: NextFunction): any {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization',
        );
        res.header(
            'Access-Control-Allow-Methods',
            'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS',
        );
        next();
    }
}
