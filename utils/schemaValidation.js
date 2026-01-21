

function validateWithSchema(schema, payload) {
    const result = schema.validate(payload);
    return result;
}

module.exports = {
    validateWithSchema,
};