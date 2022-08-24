import * as Joi from 'joi';

export const LoginSchema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9$%#@]{8,30}$'))
        .error(new Error('Password Should contain One upper case,one lower case,one number and one special character and atleast 8 characters long')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .error(new Error('Invalid Email')),
}).with('email', 'password');


export const SignUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Name')),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9$%#@]{8,30}$'))
        .error(new Error('Password Should contain One upper case,one lower case,one number and one special character and atleast 8 characters long')),


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .error(new Error('Enter a valid Email')),


    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
        .error(new Error('Password and Confirm Password Do not Match')),
}).with('email', 'password');

export const AddBikeSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Name')),
    color: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Color')),
    location: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Location')),

    isAvailable: Joi.boolean().required()
        .error(new Error('Enter a valid Bike Available Status')),


})
export const NameSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Name')),
})
export const LocationSchema = Joi.object({
    location: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Location')),
})
export const ColorSchema = Joi.object({
    color: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Color')),
})
export const EmailSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .error(new Error('Enter a valid Email')),
})
export const RoleSchema = Joi.object({
    role: Joi.string()
        .pattern(new RegExp(/^(manager|regular)$/))
        .error(new Error('Enter a valid Role')),
})
export const BikeStatusSchema = Joi.object({
    isAvailable: Joi.boolean().required()
        .error(new Error('Enter a valid Bike Available Status')),
})