const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected. Host is: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;