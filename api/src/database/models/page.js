const {Schema, model} = require('mongoose');

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
        default: null
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Page must be part of a project']
    },
    children: [{type: Schema.Types.ObjectId, ref: 'Page'}]
});

module.exports = model('Page', pageSchema);
