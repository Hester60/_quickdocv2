const {Schema, model, Types} = require('mongoose');
const Project = require('./project');

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
    childrenCount: {
        type: Number,
        required: false,
        default: 0
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: false,
        default: null,
        validate: {
            validator: async function (value) {
                if (value) {
                    const parent = await model('Page').findById(value);

                    return !!parent;
                }
            },
            message: "Parent does not exist"
        },
        set: function (value) {
            this._oldParent = this.parent ? Types.ObjectId(this.parent) : null;
            return value;
        }
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Page must be part of a project'],
        validate: {
            validator: async function (value) {
                const project = await Project.findById(value);

                return !!project;
            },
            message: "Project does not exist"
        }
    }
}, {
    timestamps: true
});

pageSchema.pre('save', async function (next) {

    // Increment parent childrenCount in case of new page or update
    if (this.parent && (this.isNew || this.modifiedPaths().includes('parent'))) {
        const parent = await model('Page').findById(this.parent);
        parent.childrenCount = parent.childrenCount + 1;
        await parent.save();
    }

    // Decrement old parent in case of update
    if (this.modifiedPaths().includes('parent') && this._oldParent) {
        if (this._oldParent) {
            const oldParent = await model('Page').findById(this._oldParent);

            if (oldParent) {
                oldParent.childrenCount = oldParent.childrenCount - 1;
                await oldParent.save();
            }
        }
    }

    next();
});

module.exports = model('Page', pageSchema);
