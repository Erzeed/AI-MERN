import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/auth";
import "dotenv/config";

const app = express();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ 
    origin: process.env.ACCES_POINT as string, 
    credentials: true 
}));


app.get('/api/test', async (req: Request, res: Response ) => {
    res.status(200).json({ message: "hello" })
});

app.use("/auth", userRoute)


export default app;
