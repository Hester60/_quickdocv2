const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        maxLength: [30, "Project name cannot exceed 30 characters"],
        set: value => value ? value.trim() : null,
    }
});

module.exports = model('Project', projectSchema);
