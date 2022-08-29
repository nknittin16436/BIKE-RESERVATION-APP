import * as Joi from 'joi';

export const LoginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .error(new Error('Invalid Email')),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9$%#@]{8,30}$'))
        .error(new Error('Password Should contain One upper case,one lower case,one number and one special character and atleast 8 characters long')),

}).with('email', 'password');


export const SignUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Name')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .error(new Error('Enter a valid Email')),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9$%#@]{8,30}$'))
        .error(new Error('Password Should contain One upper case,one lower case,one number and one special character and atleast 8 characters long')),




    // confirmPassword: Joi.ref('password')
    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
        .error(new Error('Password and Confirm Password Do not Match')),


}).with('confirmPassword', 'password');

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

export const UpdateUserSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .pattern(new RegExp(/^\w+(?:\s+\w+)*$/))
        .error(new Error('Enter a valid Name')),


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .error(new Error('Enter a valid Email')),

})