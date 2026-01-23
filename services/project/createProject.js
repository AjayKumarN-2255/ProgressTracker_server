const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Project = require('../../models/Project');


async function createProject(payload) {
    const { name, from, to } = payload;
    if (new Date(from) > new Date(to)) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "'from' date/time cannot be greater than 'to' date/time");
    }

    const isProjectExist = await Project.findOne({ name });
    if (isProjectExist) {
        throw new APIError(STATUS_CODES.CONFLICT, "Project already exist");
    }

    const newProject = new Project({
        name,
        from,
        to
    })
    const savedProject = await newProject.save();
    const { createdAt, updatedAt, __v, ...rest } = savedProject._doc;
    return rest;
}

module.exports = {
    createProject
}