const mongoose = require('mongoose');

const contentValueSchema = new mongoose.Schema({
    content: { type: String, required: true },
    value: { type: Number, required: true }
}, { _id: false });

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
        required: true
    },
    month: {
        type: Number, 
        required: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true
    },
    milestones: [contentValueSchema],
    patternsToAddress: [contentValueSchema],
    memos: [contentValueSchema]
});

module.exports = new mongoose.model('Report', reportSchema);