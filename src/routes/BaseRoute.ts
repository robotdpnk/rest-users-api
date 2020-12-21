import express, { Application, Router } from 'express';
import * as Joi from 'joi';

export abstract class BaseRoute<T> {
    router: Router
    name: string;

    constructor () {
        this.router = Router();
    }

    abstract getName (): string; 
    abstract getSchema (): Joi.Schema;

    validateSchema (entities: T[]) {
        const schema: Joi.Schema = this.getSchema();

        if (!schema) {
            return Promise.resolve(entities);
        }

        const promises = entities.map((entity:T) => {
            return new Promise((resolve, reject) => {
                const { error, errors, value, warning } = schema.validate(entity);
                if (error || errors) {
                    reject(errors || error);
                } else {
                    resolve(value || warning);
                }
            });
        })
        return Promise.all(promises).then();
    }
}
