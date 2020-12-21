import * as Joi from 'joi';

export const AddressValidation = Joi.object().keys({
    id: Joi.number().required(),
    street: Joi.string().length(100).required(),
    suite: Joi.string().length(100).required(),
    city: Joi.string().length(100).required(),
    zipcode: Joi.string().length(100).required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
});