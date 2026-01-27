const { createProject } = require('./createProject');
const { editProject } = require('./editProject');
const { deleteProject } = require('./deleteProject');
const { getAllProjects } = require('./getAllProject');


module.exports = {
    createProject,
    editProject,
    deleteProject,
    getAllProjects
}