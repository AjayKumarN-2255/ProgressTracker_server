const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { generateReportByQuery } = require('../../utils/groupReportByMonth');
const { getReport } = require('./getReport');


async function exportReport(query) {
    const reports = await getReport(query, true);
    const workBook = generateReportByQuery(reports)
    return workBook;
}

module.exports = {
    exportReport
}