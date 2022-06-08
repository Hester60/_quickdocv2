const mongoose = require('mongoose');

const mongoUri = `mongodb://${process.env.DOCKER_DATABASE_CONTAINER_NAME}`;

module.exports = async function () {
    try {
        await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 5000,
            user: process.env.MONGO_INITDB_ROOT_USERNAME,
            pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
            dbName: process.env.MONGO_INITDB_DATABASE
        });

        console.log('Database connection is up.');

        return mongoose.connection;
    } catch (error) {
        console.error(error);
    }
    return null;
}
