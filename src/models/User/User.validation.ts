import * as Joi from 'joi';

export const UserValidation = Joi.object().keys({
    // id: Joi.number().required(),
    name: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(100).required(),
    address: Joi.object().keys({
        street: Joi.string().max(100).required(),
        suite: Joi.string().max(100).required(),
        city: Joi.string().max(100).required(),
        zipcode: Joi.string().max(100).required(),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
    }).required(),
    company: Joi.object().keys({
        name: Joi.string().max(100).required(),
        catchPhrase: Joi.string().max(200).required(),
        bs: Joi.string().max(100).required()
    }),
    contact: Joi.object().keys({
        email: Joi.string().max(100),
        phone: Joi.string().max(100),
        website: Joi.string().max(100)
    }) 
});