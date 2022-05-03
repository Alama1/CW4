import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
require('dotenv').config()

const config: MysqlConnectionOptions = {
    type: "mysql",
    database: process.env.DATABASE,
    username: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    host: process.env.DBHOST,
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true
};

export default config;
