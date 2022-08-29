import * as Joi from 'joi';

const method = (value, helpers) => {
    // for example if the username value is (something) then it will throw an error with flowing message but it throws an error inside (value) object without error message. It should throw error inside the (error) object with a proper error message

    if (value === "something") {
        return helpers.error("any.invalid");
    }

    // Return the value unchanged
    return value;
};



export const LoginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .error(new Error('Invalid Email')),

    email: Joi.string()
        .custom((value, helper) => {
            if (value.trim().length < value.length) {
                return helper.message("Email cannot have leading or trailing spaces");

            } else {
                return true
            }

        })
        .error(new Error('Email cannot have leading or trailing spaces')),



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
    name: Joi.string()
        .custom((value, helper) => {
            if (value.trim().length < value.length) {
                return helper.message("Name cannot have leading or trailing spaces");

            } else {
                return true
            }

        })
        .error(new Error('Name cannot have leading or trailing spaces')),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .error(new Error('Enter a valid Email')),


    email: Joi.string()
        .custom((value, helper) => {
            if (value.trim().length < value.length) {
                return helper.message("Email cannot have leading or trailing spaces");

            } else {
                return true
            }

        })
        .error(new Error('Email cannot have leading or trailing spaces')),

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


    email: Joi.string()
        .custom((value, helper) => {
            if (value.trim().length < value.length) {
                return helper.message("Email cannot have leading or trailing spaces");

            } else {
                return true
            }

        })
        .error(new Error('Email cannot have leading or trailing spaces')),
})