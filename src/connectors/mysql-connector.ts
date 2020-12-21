import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import path from 'path';

export class MySqlConnector {

    private static mySqlConnection: Connection;

    get connection(): Connection {
        return MySqlConnector.mySqlConnection;
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            const options: ConnectionOptions = {
                type: 'mysql',
                synchronize: true,
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'mohSgl',
                database: 'SuiteUsersDB',
                // logging: ['query', 'error'],
                entities: [
                    path.resolve(__dirname, '../models/User/User.model.js'),
                    path.resolve(__dirname, '../models/Address/Address.model.js'),
                    path.resolve(__dirname, '../models/Company/Company.model.js'),
                    path.resolve(__dirname, '../models/Contact/Contact.model.js')
                ]
            };

            createConnection(options).then((connection: Connection) => {
                MySqlConnector.mySqlConnection = connection;
                resolve();
            })
            .catch(reject);
        });
    }

    public disconnect(): Promise<any> {
        return MySqlConnector.mySqlConnection.close();
    }
}