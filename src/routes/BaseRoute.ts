import { Router } from 'express';
import Joi, { ValidationError } from 'joi';

export abstract class BaseRoute<T> {
    router: Router
    name: string;

    constructor () {
        this.router = Router();
    }

    abstract getName (): string; 
    abstract getSchema (): Joi.Schema;

    // suggestion: create a mixin for validation
    // validateSchema (entities: T[], transFn?: (raw:any)=>T, fn?: (entity: T) => Promise<T>): ValidationResult<T> {
    validateSchema (entities: T[], transFn?: (raw:any)=>T, fn?: (entity: T) => Promise<T>): any {
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
                    if (fn) {
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
