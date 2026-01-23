const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Project = require('../../models/Project');

async function deleteProject(pId) {
    const project = await Project.findById(pId);
    if (!project) {
        throw new APIError(STATUS_CODES.NOT_FOUND, "Project is not exist");
    }
    await project.deleteOne();
}

module.exports = {
    deleteProject
}