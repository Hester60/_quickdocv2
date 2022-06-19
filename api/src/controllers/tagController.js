const {Tag} = require('../database/models');
const asyncWrapper = require('../middlewares/asyncWrapper');
const {NotFoundError} = require("../utils/GeneralError");
const tagManager = require('../managers/tagManager');

module.exports.createTag = asyncWrapper(async (req, res) => {
  const tag = await Tag.create(req.body);

  return res.status(201).json(tag);
});

module.exports.getAllTags = asyncWrapper(async (req, res) => {
  const query = {
    name: {$regex: req.query.q ?? '', $options: 'i'}
  };

  const tags = await Tag.find(query);

  return res.status(200).json(tags);
});

module.exports.getTagById = asyncWrapper(async (req, res) => {
  const tag = await Tag.findById(req.params.tagId);

  if (!tag) {
    throw new NotFoundError(`Tag with id ${req.params.tagId} not found`)
  }

  return res.status(200).json(tag);
});

module.exports.updateTag = asyncWrapper(async (req, res) => {
  let tag = await Tag.findById(req.params.tagId);

  if (!tag) {
    throw new NotFoundError(`Tag with id ${req.params.tagId} not found`)
  }

  tag = tagManager.updateTag(tag, req.body);

  await tag.save();

  return res.status(200).json(tag);
});

module.exports.removeTag = asyncWrapper(async (req, res) => {
  let tag = await Tag.findById(req.params.tagId);

  if (!tag) {
    throw new NotFoundError(`Tag with id ${req.params.tagId} not found`)
  }

  const session = tagManager.removeTag(tag);
  session.endSession();

  return res.status(200).json({});
})
