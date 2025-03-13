import mongoose from "mongoose";

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("MongoDB is already connected");
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
};

export const disconnectFromDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
        console.log("MongoDB is already disconnected");
        return;
    }
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
};
