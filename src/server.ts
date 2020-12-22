import express, { Application, NextFunction, Request, Response } from 'express';
import http from 'http';
import {  MySqlConnector } from './connectors/mysql-connector'
import {  Connection } from 'typeorm';
import { Server as TypeServer} from 'typescript-rest';

import { AddressRoute, UserRoute, CompanyRoute, ContactRoute } from './routes';

import { config } from 'process';
import cors from 'cors';

export class Server extends TypeServer {

    private PORT: number = 5151;
    private app: Application;
    private server: http.Server;

    constructor (/* config */) {
        super();
        // load env and pass as argument to server instead of storing as static props

        // express 4: routes are stored in app._router
        this.app = express();
    } 

    initialize () {
        Server.buildServices(this.app); // apply routes

        this.app.use(cors({ 
            origin: function (origin:any, callback:any) {
                return true;
            }
        }));

        // log requests
        this.app.use("*", (req, res, next) => {
            console.log(`${new Date()} - ${req.method} - ${req.url} `);
            next()
        });

        Server.buildServices(this.app, [UserRoute, AddressRoute, CompanyRoute, ContactRoute]);

        // this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        //     if (err.status >= 400 && err.status < 500 || err.statusCode >= 400 && err.statusCode < 500) {
        //         console.log(`Couldnt found url: ${req.url}`);
        //         res.status(404).send(`route: ${req.url}, not found`)
        //     }

        //     next();
        // })
    }

    run () {
        return new Promise<Connection>((resolve, reject) => {
            this.server = this.app.listen(this.PORT, () => {
                const conn = new MySqlConnector()
                conn.connect()

                return resolve(conn.connection);
            })
        })
    }
}