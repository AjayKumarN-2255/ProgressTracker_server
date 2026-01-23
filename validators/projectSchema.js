const Joi = require('joi');

const projectSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.empty': 'Project name is required',
            'any.required': 'Project name is required'
        }),
    from: Joi.date()
        .required()
        .messages({
            'date.base': 'From date must be a valid date',
            'any.required': 'From date is required'
        }),
    to: Joi.date()
        .required()
        .messages({
            'date.base': 'To date must be a valid date',
            'any.required': 'To date is required'
        })
})

module.exports = projectSchema;
