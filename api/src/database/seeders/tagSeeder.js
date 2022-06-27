const {Tag} = require("../models");
const db = require('../db');
const mongoose = require('mongoose');

const tags = [
    new Tag({
        _id: '62b9d71cf9f3dc579dc899ce',
        name: 'Note',
        color: 'primary'
    }),
    new Tag({
        _id: '62b9d71cf9f3dc579dc899cc',
        name: 'Functional',
        color: 'error'
    }),
    new Tag({
        _id: '62b9d71cf9f3dc579dc899d0',
        name: 'Technical',
        color: 'warning'
    }),
    new Tag({
        _id: '62b9d71cf9f3dc579dc899d2',
        name: 'Daily',
        color: 'info'
    }),
    new Tag({
        _id: '62b9d71cf9f3dc579dc899d4',
        name: 'Done',
        color: 'success'
    }),
    new Tag({
        _id: '62b9d71cf9f3dc579dc899d6',
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


