const Joi = require('joi');

const reviewValidationSchema = Joi.object({
    reviewer: Joi.string()
        .required()
        .messages({
            'any.required': 'Reviewer is required',
        }),

    employees: Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
        .messages({
            'array.min': 'At least one employee is required',
            'any.required': 'Employees field is required',
        }),

    project: Joi.string()
        .required()
        .messages({
            'any.required': 'Project is required',
        }),

    reviewMonth: Joi.string()
        .pattern(/^\d{4}-(0[1-9]|1[0-2])$/)
        .required()
        .messages({
            'string.pattern.base': 'Review month must be in YYYY-MM format',
            'any.required': 'Review month is required',
        }),

    status: Joi.string()
        .valid('assigned', 'completed')
        .optional()
        .messages({
            'any.only': 'Status must be either assigned or completed',
        }),
});

module.exports = reviewValidationSchema;
