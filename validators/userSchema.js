const Joi = require("joi");

const userValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name cannot exceed 50 characters",
            "string.pattern.base": "Name can only contain letters and spaces",
            "any.required": "Name is required",
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Email must be a valid email address",
            "string.empty": "Email is required",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password cannot exceed 30 characters",
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),

    role: Joi.string()
        .valid("admin", "employee")
        .required()
        .messages({
            "any.only": "Role must be either 'admin' or 'employee'",
            "string.empty": "Role is required",
            "any.required": "Role is required",
        }),

    designation: Joi.string()
        .required()
        .messages({
            "string.empty": "Designation is required",
            "any.required": "Designation is required",
        }),
});

module.exports = userValidationSchema;