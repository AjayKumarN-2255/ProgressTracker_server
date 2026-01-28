const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employee: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    reviewMonth: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['assigned', 'completed'],
        default: 'assigned',
    },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);