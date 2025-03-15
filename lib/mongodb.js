import mongoose from "mongoose";

export const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
};

export const disconnectFromDatabase = async () => {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
};
