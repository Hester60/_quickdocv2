const {Page} = require("../database/models");
const db = require("../database/db");

module.exports.updateTag = (tag, newData) => {
  const {name, color} = newData;

  tag.name = name !== undefined ? name : tag.name;
  tag.color = color !== undefined ? color : tag.color;

  return tag;
}

module.exports.removeTag = async (tag) => {
  const session = await db.conn.startSession();

  try {
    session.startTransaction();

    await Page.updateMany({'tag': tag._id}, {$set: null});

    await tag.remove();
    await session.commitTransaction();

    return session;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
}
