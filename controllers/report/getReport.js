const reportService = require('../../services/report');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function getReport(req, res, next) {

    const { userId, type, year, value, pId, rId } = req.query;
    
    try {

        if (!userId && !rId) {
            return res.status(STATUS_CODES.OK).json({
                success: true,
                message: 'Select a user to view reports',
                data: []
            });
        }

        const query = { userId, type, year, value, pId, rId };

        const reports = await reportService.getReport(query);

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Report fetched successfully',
            data: reports
        });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getReport
}