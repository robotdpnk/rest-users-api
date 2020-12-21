import { Server } from './server';

(function run () {
    const server = new Server();
    server.initialize();
    server.run()
        .catch(err => {
            console.log(err);
        })
})()