const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { validateWithSchema } = require('../../utils/schemaValidation');
const projectSchema = require('../../validators/projectSchema');
const projectService = require('../../services/project');

async function createProject(req, res, next) {
    const payload = req.body;
    if (!payload) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }
    const { error } = validateWithSchema(projectSchema, payload);
    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }

    try {
        const project = await projectService.createProject(payload);

        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'Project created successful',
            data: project
        });

    } catch (error) {
        next(error)
    }

}

module.exports = {
    createProject
}