import got from 'got';

export default class Http {
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
