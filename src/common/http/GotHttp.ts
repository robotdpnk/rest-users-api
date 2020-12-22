import got from 'got';
import { Http2ServerRequest } from 'http2';

export class GotHttp {
    constructor (url: string) {
        return got.extend({
            baseUrl: url
            // hooks: {
            //     beforeRequest: [
            //         options => {
            //             console.log(this);
            //         }
            //     ]
            // },
        });
    }
}
