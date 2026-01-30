const Joi = require('joi');

const reportSchema = Joi.object({
    employeeId:
        Joi.string()
            .required()
            .messages({
                'any.required': 'Employee is required',
            }),

    reviewerId:
        Joi.string()
            .required()
            .messages({
                'any.required': 'Reviewer is required',
            }),

    projectId:
        Joi.string()
            .required()
            .messages({
                'any.required': 'Project is required',
            }),

    reviewMonth: Joi.string()
        .pattern(/^\d{4}-(0[1-9]|1[0-2])$/)
        .required()
        .messages({
            'string.base': 'Review month must be a string',
            'string.pattern.base': 'Review month must be in YYYY-MM format',
            'any.required': 'Review month is required',
        }),

    milestones: Joi.array()
        .required()
        .messages({
            'array.base': 'Milestones must be an array',
            'any.required': 'Milestones field is required',
        }),

    patternsToAddress: Joi.array()
        .required()
        .messages({
            'array.base': 'Patterns to address must be an array',
            'any.required': 'Patterns to address field is required',
        }),

    memos: Joi.array()
        .required()
        .messages({
            'array.base': 'Memos must be an array',
            'any.required': 'Memos field is required',
        }),
});

module.exports = reportSchema;