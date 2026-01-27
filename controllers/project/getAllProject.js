const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Project = require('../../models/Project');

async function getAllProjects(req, res, next) {

    const { pid } = req.query;
    const query = pid ? { _id: pid } : {};
    try {
        const projects = await Project.find(query, '_id name from to');
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'Project fetched successfully',
            data: projects
        });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProjects
}