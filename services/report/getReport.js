const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Report = require('../../models/Report');
const { getDateRange } = require('../../utils/getDateRange');


async function getReport(query) {

    const { userId, type, year, value, pId } = query;

    const dateRange = getDateRange({ type, year, value });

    if (!dateRange) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, 'Invalid date filter parameters')
    }

    const { startDate, endDate } = dateRange;

    const filter = {
        ...(userId ? { employeeId: userId } : {}),
        ...(startDate && endDate && {
            reviewMonth: {
                $gte: startDate,
                $lte: endDate
            }
        }),
        ...(pId ? { projectId: pId } : {}),
    }

    const reports = await Report.find(filter)
        .populate('employeeId', 'name')
        .populate('reviewerId', 'name')
        .populate('projectId', 'name')
        .sort({ reviewMonth: -1 });

    return reports;
}

module.exports = {
    getReport
}