const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Project = require('../../models/Project');
const Review = require('../../models/Review');

async function deleteProject(pId) {
    const reviews = await Review.find({
        project: pId
    });

    if (reviews.length > 0) {
        throw new APIError(
            STATUS_CODES.FORBIDDEN,
            "Cannot delete project because reviews exist"
        );
    }

    const project = await Project.findById(pId);
    if (!project) {
        throw new APIError(STATUS_CODES.NOT_FOUND, "Project is not exist");
    }
    await project.deleteOne();
}

module.exports = {
    deleteProject
}