import { BaseError } from '../BaseError';


export class ApiError extends BaseError {
    constructor(
        name = 'Api error', 
        httpCode = 500,
        isOperational = true,
        description = 'internal server error'
    ) {
        super(name, httpCode, description, isOperational)
    }
}

export class EntityNotFoundException extends ApiError {
    constructor(
        entityId: string,
        name = '[ENTITY_NOT_FOUND]',
        httpCode=404,
        isOperational=true,
        description='Could not find entity with id:'
    ) {
        super(name, httpCode, isOperational, `${description} ${entityId}`);
    }
}