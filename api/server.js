const express = require('express');
const cors = require('cors');
const fs = require('fs');

const router = require('./src/router');
const db = require('./src/database/db');
const errorHandler = require('./src/middlewares/errorHandler');

if (!fs.existsSync('./src/public/uploads')) {
    fs.mkdirSync('./src/public/uploads', { recursive: true });
} 

const app = express();
app.use(cors());

// middlewares
app.use(express.json());
app.use(process.env.API_BASE_PATH + '/static', express.static('./src/public'));
app.use(process.env.API_BASE_PATH, router);

const PORT = process.env.API_PORT; 

app.use(errorHandler); // keep it here to catch all http errors
app.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}.`);
    await db.dbConnect();
});

app.on('error', (error) => {
    console.error('Error ecountered : ', error);
});
