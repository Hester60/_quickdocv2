const express = require('express');
const connectDb = require('./src/database/connect');
const app = express();

// middlewares
app.use(express.json());

const PORT = process.env.API_PORT;

app.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}.`);
    await connectDb();
});

app.on('error', (error) => {
    console.error('Error ecountered : ', error);
});
