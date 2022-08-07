import * as Joi from 'joi';

export const LoginSchema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9$%#@]{8,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
}).with('email', 'password');


export const SignUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/)),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9$%#@]{8,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    confirmPassword: Joi.ref('password'),
}).with('email', 'password');

