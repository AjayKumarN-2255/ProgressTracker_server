const Report = require('../../models/Report');
const mongoose = require('mongoose');


async function getMonthWiseData(userId, month, year) {

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const report = await Report.aggregate(
        [
            {
                $match: {
                    employeeId: new mongoose.Types.ObjectId(userId),
                    reviewMonth: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { empId: '$employeeId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$empId'] }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1
                            }
                        }
                    ],
                    as: 'employee'
                }
            },
            {
                $unwind: '$employee'
            },
            {
                $lookup: {
                    from: 'projects',
                    let: { projectId: '$projectId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$projectId'] }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                name: 1
                            }
                        }
                    ],
                    as: 'project'
                }
            },
            { $unwind: '$project' },
            {
                $addFields: {
                    totalScore: {
                        $add: [
                            { $sum: "$milestones.value" },
                            { $sum: "$patternsToAddress.value" },
                            { $sum: "$memos.value" }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: '$employee._id',
                    employeeName: { $first: '$employee.name' },
                    projects: {
                        $push: {
                            projectName: '$project.name',
                            totalScore: '$totalScore'
                        }
                    }
                }
            }
        ]
    )

    return report;
}

async function getYearWiseData(year) {
    return "year data";
}

module.exports = {
    getMonthWiseData, getYearWiseData
}