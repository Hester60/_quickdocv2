const express = require('express');
const app = express();

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.on('error', (error) => {
    console.error('Error ecountered : ', error);
});
