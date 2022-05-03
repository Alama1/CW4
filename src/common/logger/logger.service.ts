import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LoggerService {
    filePath = './log.txt';

    createLog(logValue: string): void {
        fs.access(this.filePath, (err) => {
            if (err) {
                fs.writeFile('log.txt', `${logValue} \n`, (e) => {
                    if (e) throw err;
                });
                return;
            }
            fs.appendFile('log.txt', `${logValue} \n`, (e) => {
                if (e) throw err;
            });
        });
    }
}
