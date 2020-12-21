export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500
}

export class BaseError extends Error {

    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;

    constructor (
        name: string, 
        httpCode: HttpStatusCode, 
        description: string, 
        isOperational: boolean
    ) {
        super(description); // overwriting message on Error class
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

