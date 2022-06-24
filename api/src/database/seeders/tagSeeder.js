const {Tag} = require("../models");
const db = require('../db');

const tags = [
    new Tag({
        name: 'Note',
        color: 'primary'
    }),
    new Tag({
        name: 'Functional',
        color: 'error'
    }),
    new Tag({
        name: 'Technical',
        color: 'warning'
    }),
    new Tag({
        name: 'Daily',
        color: 'info'
    }),
    new Tag({
        name: 'Done',
        color: 'success'
    }),
    new Tag({
        name: 'Bug',
        color: 'error'
    })
];

(async function () {
    try {
        await db.dbConnect();
        await db.conn.collection('tags').drop(); // Always drop tags collection !
        await Tag.create(tags);
        db.conn.close();
    } catch (error) {
        console.error(error);
    }
})();


