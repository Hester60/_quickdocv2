const mongoose = require('mongoose');

const mongoUri = `mongodb://quickdoc_database_1`;

const dbConnect = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 5000,
            user: process.env.MONGO_INITDB_ROOT_USERNAME,
            pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
            dbName: process.env.MONGO_INITDB_DATABASE,
        });

    } catch (err) {
        console.log(`Database connection error encountered : ${err.message}`);
        return setTimeout(async () => {
            await dbConnect();
        }, 5000);
    }
}

const conn = mongoose.connection;
conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = {conn, dbConnect};
