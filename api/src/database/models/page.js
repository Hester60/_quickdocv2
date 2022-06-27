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
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    required: false,
    autopopulate: true,
    validate: {
      validator: async function (value) {
        if (value) {
          const tag = await model('Tag').findById(value);

          return !!tag;
        }

        return true;
      },
      message: "Tag does not exist"
    }
  }
}, {
  timestamps: true
});

pageSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Page', pageSchema);
