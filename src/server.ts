import express, { Application, NextFunction, Request, Response } from 'express';
import http from 'http';
import {  MySqlConnector } from './connectors/mysql-connector'
import {  Connection } from 'typeorm';
import { Server as TypeServer} from 'typescript-rest';
import { config as dotenv } from 'dotenv';

import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import { AddressRoute, UserRoute, CompanyRoute, ContactRoute } from './routes';

import { config } from 'process';
import cors from 'cors';

export class Server extends TypeServer {

    private LOG_DIR: string = path.resolve(__dirname, 'LOGS');
    private app: Application;
    private server: http.Server;


    constructor (/* config */) {
        super();
        // load env and pass as argument to server instead of storing as static props

        // express 4: routes are stored in app._router
        this.app = express();
    } 

    initialize () {
        this.loadEnvVariables()
        this.setupDirectories();
        this.setupRequestLogs();

        Server.buildServices(this.app); // apply routes

        this.app.use(cors({ 
            origin: function (origin:any, callback:any) {
                return true;
            }
        }));

        Server.buildServices(this.app, [UserRoute, AddressRoute, CompanyRoute, ContactRoute]);

        // this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        //     if (err.status >= 400 && err.status < 500 || err.statusCode >= 400 && err.statusCode < 500) {
        //         console.log(`Couldnt found url: ${req.url}`);
        //         res.status(404).send(`route: ${req.url}, not found`)
        //     }
        //     next();
        // })
    }

    public loadEnvVariables() {
        const envPath = path.resolve(__dirname, '..', './.env.example');
        dotenv({ path: envPath });
    }

    private setupRequestLogs () {
        this.app.use(
            morgan('common', { 
                stream: fs.createWriteStream(
                    path.resolve(this.LOG_DIR, 'request-log.txt'), { flags: 'a' }
                )
            })
        )
        this.app.use(morgan('dev'));
    }

    private setupDirectories () {
        try {
            if (!fs.existsSync(this.LOG_DIR)) {
                fs.mkdirSync(this.LOG_DIR)
            }
        } catch (e) {
            throw e;
        }
    }

    run () {
        return new Promise<Connection>((resolve, reject) => {
            this.server = this.app.listen(
                Number(process.env.BACKEND_PORT), 
                String(process.env.BACKEND_HOST), 
                () => {
                    const conn = new MySqlConnector()
                    conn.connect()

                    return resolve(conn.connection);
                }
            )
        })
    }
}