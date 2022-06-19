const router = require('express').Router();
const {createTag, updateTag, getTagById, getAllTags, removeTag} = require('../controllers/tagController');
const authRequired = require('../middlewares/authRequired')

router.route('/')
  .post(authRequired, createTag)
  .get(authRequired, getAllTags);

router.route('/:tagId')
  .put(authRequired, updateTag)
  .get(authRequired, getTagById);

router.route(`/:tagId`)
  .delete(authRequired, removeTag);

module.exports = router;
