import Joi, { ValidationError } from 'joi';

type CustomValidationError = 
    { validationError: ValidationError }

type ValidationResult<T> = 
    Promise< Array<T | CustomValidationError> >

export abstract class BaseService<T> {
    constructor () { }

    abstract getSchema (): Joi.Schema;

    // suggestion
    validateSchema (entities: T[], transFn?: (raw:any)=>T, fn?: (entity: T) => Promise<T>): ValidationResult<T> {
        const schema: Joi.Schema = this.getSchema();
        schema.validate

        if (!schema) { return Promise.resolve(entities) }

        const promises = entities.map((entity:T) => {
            return new Promise((resolve, reject) => {

                let normalizedEntity: T = transFn ? transFn(entity) : entity;

                const { error, errors, value, warning } = 
                    schema.validate(
                        normalizedEntity, 
                        { abortEarly: false, nonEnumerables: false });

                if (error || errors) {
                    resolve({
                        error: 'ValidationError',
                        ...(error || errors)
                    })
                } else {
                    if (fn) { // calback can be used to save data to db
                        // need to treat error case
                        resolve(fn(value));
                    } else {
                        resolve(value)
                    }
                }
            });
        })
        return Promise.all(promises).then();
    }
}
