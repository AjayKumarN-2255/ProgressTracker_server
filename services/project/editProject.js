const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Project = require('../../models/Project');

async function editProject(payLoad, pId) {

    const project = await Project.findById(pId);
    if (!project) {
        throw new APIError(STATUS_CODES.NOT_FOUND, "Project is not exist");
    }

    const fromDate = payLoad.from ? new Date(payLoad.from) : new Date(project.from);
    const toDate = payLoad.to ? new Date(payLoad.to) : new Date(project.to);

    if (fromDate > toDate) {
        throw new APIError(
            STATUS_CODES.BAD_REQUEST,
            "'from' date/time cannot be greater than 'to' date/time"
        );
    }

    const updatedProject = await Project.findByIdAndUpdate(
        pId,
        { $set: payLoad },
        { new: true }
    );
    const { createdAt, updatedAt, __v, ...rest } = updatedProject._doc;
    return rest;
}

module.exports = {
    editProject
}