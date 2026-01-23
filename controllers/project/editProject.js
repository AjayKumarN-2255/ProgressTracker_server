const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const projectService = require('../../services/project');

async function editProject(req, res, next) {
    const payload = req.body;
    const id = req.params.id;
    if (!payload) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }

    try {
        const project = await projectService.editProject(payload, id);

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Project edited successful',
            data: project
        });

    } catch (error) {
        next(error)
    }

}

module.exports = {
    editProject
}