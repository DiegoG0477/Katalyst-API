import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/mongodb";

import { userRouter } from "./user/infraestructure/routes/UserRouter";
import { authRouter } from "./user/infraestructure/routes/AuthRouter";

dotenv.config();

const PORT = process.env.SERVER_PORT ?? 3000;

const app = express();

const signale = new Signale();

app.use(express.json());
app.use(morgan("dev"));
app.use("/users",userRouter);
app.use("/auth", authRouter);

app.listen(PORT, async () => {
    await connectToDatabase();
    signale.success("Server online in port " + PORT);
});