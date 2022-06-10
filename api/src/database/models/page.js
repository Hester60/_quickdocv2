const {Schema, model} = require('mongoose');
const Project = require('./project')

const pageSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Page title is required'],
        maxLength: [150, "Page title cannot exceed 150 characters"],
        set: value => value ? value.trim() : null,
    },
    body: {
        type: String,
        required: false,
        default: null
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: false,
        default: null,
        validate: {
            validator: async function(value) {
                console.log(value);
                if (value) {
                    const parent = await Project.findById(value);

                    return !!parent;
                }
            },
            message: "Parent does not exist"
        }
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Page must be part of a project'],
        validate: {
            validator: async function(value) {
                const project = await Project.findById(value);

                return !!project;
            },
            message: "Project does not exist"
        }
    }
}, {
    timestamps: true
});

module.exports = model('Page', pageSchema);
