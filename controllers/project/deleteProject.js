const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const projectService = require('../../services/project');

async function deleteProject(req, res, next) {
    const id = req.params.id;
    try {
        await projectService.deleteProject(id);
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    deleteProject
}