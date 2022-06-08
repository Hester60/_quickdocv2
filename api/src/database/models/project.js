const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Project name is required'],
        maxlength: [30, "Project name cannot exceed 30 characters"],
        set: value => value.trim(),
        validate: {
            validator: function(value) {
                console.log( value === "");
                return value !== "";
            },
            message: "Project name cannot be empty"
        }
    }
});

module.exports = model('Project', projectSchema);
