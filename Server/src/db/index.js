import mongoose from "mongoose";
import {DB_NAME} from "../constants/db.js"

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MONGODB CONNECTED !!! HOST: ",connectionInstance.connection.host);
    } catch (error) {
        console.log("MONGODB Connection error: ",error);
        process.exit(1);
    }
}