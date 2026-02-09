const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enums: ["milestones", "patternsToAddress", "memos"]
    }
})

module.exports = mongoose.model('Note', NoteSchema);