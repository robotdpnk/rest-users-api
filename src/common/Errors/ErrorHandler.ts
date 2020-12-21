import { inspect } from 'util';
import { BaseError } from './BaseError';

interface Logger<T> {
    error: (mes: string, err: T) => void
}

class ErrorHandler<T extends Error> {
    private logger: Logger<T>;


    constructor (logger: Logger<T>) {
        this.logger = logger;
    }

    public async handleError (err: T): Promise<void> {
        await this.logger.error(
            'Handling error from ErrorHandler',
            err,
        );
    }

    public isTrustedError(error: T) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}

const logger = { 
    error: (msg: string, err: Error) => console.log(`${msg}: ${inspect(err, true, 3, true)}`)
};

export const errorHandler = new ErrorHandler(logger);