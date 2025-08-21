import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    extended: true,
    limit:"16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(express.static('public'));

app.use(cookieParser());

import userRouter from "./routes/user.routes.js"
import foodRouter from "./routes/food.routes.js"
import cartRoutes from "./routes/cart.routes.js"
app.use('/api/user',userRouter);
app.use('/api/food', foodRouter);
app.use('/api/cart', cartRoutes);

export {app}