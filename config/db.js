const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB connected : " + con.connection.host);
        
    } catch (err) {
        console.error("Error : " + err.message);
        process.exit();
    }
    
}

module.exports = connectDB;