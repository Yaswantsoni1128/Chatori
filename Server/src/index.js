import {app} from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();

connectDB()
    .then(()=>{
        app.on("error",(err)=>{
            console.log("MONGODB not connected.",err);
        });
        app.listen(process.env.PORT,()=>{
            console.log(`Server started at PORT ${process.env.PORT}`);
        })
    })
    .catch((err)=>{
        console.log("Failed to connect mongodb.",err)
    })