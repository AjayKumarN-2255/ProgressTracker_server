const reportService = require('../../services/report');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { APIError } = require('../../shared/error/APIError');

async function exportReport(req, res, next) {

    const { userId, type, year, value, pId } = req.query;

    if (!userId) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Select a user to download reports'));
    }

    try {
        const query = { userId, type, year, value, pId };
        // ExcelJS Workbook
        const workbook = await reportService.exportReport(query);

        // IMPORTANT HEADERS
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename=reports.xlsx'
        );

        // WRITE EXCEL TO RESPONSE
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        next(error)
    }
}

module.exports = {
    exportReport
}