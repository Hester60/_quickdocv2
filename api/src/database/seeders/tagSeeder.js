const {Tag} = require("../models");
const db = require('../db');

const tags = [
  new Tag({
    name: 'Note',
    color: 'primary'
  })
];

(async function() {
  try {
    await db.dbConnect();
    await db.conn.collection('tags').drop(); // Always drop tags collection !
    await Tag.create(tags);
    db.conn.close();
  } catch (error) {
    console.error(error);
  }
})();


