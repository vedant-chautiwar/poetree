const mongoose = require("mongoose");

const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/poetree";

const cleanMongoUri = (uri) => {
    if (!uri) return "";
    return uri.trim().replace(/^['"]|['"]$/g, "");
};

const isAtlasUri = (uri) => uri.startsWith("mongodb+srv://");

const connectDB = async () => {
    const envMongoUri = cleanMongoUri(process.env.MONGO_URI);
    const primaryUri = envMongoUri || LOCAL_MONGO_URI;

    try {
        await mongoose.connect(primaryUri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB connected");
        return mongoose.connection;
    } catch (err) {
        if (isAtlasUri(primaryUri)) {
            console.log(`Atlas connection failed: ${err.message}`);
            console.log("Falling back to local database");

            try {
                await mongoose.connect(LOCAL_MONGO_URI, {
                    serverSelectionTimeoutMS: 5000,
                });
                console.log("MongoDB connected");
                return mongoose.connection;
            } catch (localErr) {
                console.error(`Local MongoDB connection failed: ${localErr.message}`);
                throw localErr;
            }
        }

        console.error(`MongoDB connection failed: ${err.message}`);
        throw err;
    }
};

module.exports = connectDB;
