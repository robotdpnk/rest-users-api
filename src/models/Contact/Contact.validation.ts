import * as Joi from 'joi';

export const ContactValidation = Joi.object().keys({
    number: Joi.number().required(),
    name: Joi.string().length(50).required(),
    username: Joi.string().length(100).required(),
    address: Joi.object().keys({
        // id: Joi.number().required(),
        street: Joi.string().length(100).required(),
        suite: Joi.string().length(100).required(),
        city: Joi.string().length(100).required(),
        zipcode: Joi.string().length(100).required(),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
    }).required(),
    company: Joi.object().keys({
        // id: Joi.number().required(),
        name: Joi.string().length(100).required(),
        catchPhrase: Joi.string().length(200).required(),
        bs: Joi.string().length(100).required()
    }),
    contact: Joi.array()
        .items(Joi.object().keys({
            type: Joi.string().length(100),
            value: Joi.string().length(100),
            // user: Joi.number().required()
        }))
});