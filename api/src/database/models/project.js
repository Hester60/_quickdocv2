const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String
    }
});

module.exports = model('Project', projectSchema);
