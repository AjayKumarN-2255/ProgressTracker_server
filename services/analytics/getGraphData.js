const Report = require('../../models/Report');
const mongoose = require('mongoose');


async function getMonthWiseData(userId, month, year) {

    const startDate = new Date(Date.UTC(year, Number(month), 1));
    const endDate = new Date(Date.UTC(year, Number(month) + 1, 1));

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
                            { $ifNull: [{ $avg: "$milestones.value" }, 0] },
                            { $ifNull: [{ $avg: "$patternsToAddress.value" }, 0] },
                            { $ifNull: [{ $avg: "$memos.value" }, 0] }
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

async function getYearWiseData(userId, year) {
    const startDate = new Date(Date.UTC(year, 0, 1));
    const endDate = new Date(Date.UTC(Number(year) + 1, 0, 1));

    const report = await Report.aggregate([
        {
            $match: {
                employeeId: new mongoose.Types.ObjectId(userId),
                reviewMonth: { $gte: startDate, $lt: endDate }
            }
        },
        {
            $addFields: {
                totalScore: {
                    $add: [
                        { $ifNull: [{ $avg: "$milestones.value" }, 0] },
                        { $ifNull: [{ $avg: "$patternsToAddress.value" }, 0] },
                        { $ifNull: [{ $avg: "$memos.value" }, 0] }
                    ]
                }
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
                            _id: 0,
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
            $group: {
                _id: '$reviewMonth',
                employeeName: { $first: '$employee.name' },
                avg_project_score: {
                    $avg: '$totalScore'
                }
            }
        }
    ]).sort({ _id: 1 });

    return report;
}

module.exports = {
    getMonthWiseData, getYearWiseData
}