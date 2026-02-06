const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const User = require('../../models/User');
const { generateReportByQuery } = require('../../utils/groupReportByMonth');
const { getReport } = require('./getReport');


async function exportReport(query) {
    const user = await User.findById(query.userId);
    if (!user) {
        throw new APIError(STATUS_CODES.NOT_FOUND, "user is not found");
    }
    const reports = await getReport(query, true);
    const workbook = generateReportByQuery(reports)
    return {
        user,
        workbook
    }
}

module.exports = {
    exportReport
}