const {model, Schema} = require('mongoose');

const tagSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    maxLength: [20, "Tag name name cannot exceed 20 characters"],
    set: value => value ? value.trim() : null,
  },
  color: {
    type: String,
    enum: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'default'],
    required: [true, 'Tag color is required'],
    set: value => value ? value.trim() : null,
    default: 'primary'
  }
});

module.exports = model('Tag', tagSchema);
