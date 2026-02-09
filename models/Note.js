const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enums: ["milestones", "patternsToAddress", "memos"]
    }
})

module.exports = mongoose.model('Note', NoteSchema);