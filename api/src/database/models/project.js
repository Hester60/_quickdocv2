const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        maxlength: [30, "Project name cannot exceed 30 characters"],
        set: value => value.trim(),
    }
});

module.exports = model('Project', projectSchema);
