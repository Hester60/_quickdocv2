const express = require('express');
const connectDb = require('./src/database/connect');
const router = require('./src/router')
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// middlewares
app.use(express.json());
app.use('/api/v1', router);

const PORT = process.env.API_PORT;

app.use(errorHandler); // keep it here to catch all http errors
app.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}.`);
    await connectDb();
}); 

app.on('error', (error) => {
    console.error('Error ecountered : ', error);
});
