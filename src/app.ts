import express, { Request, Response } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();

//middlewares
app.use(cors({ 
    origin: process.env.ACCES_POINT, 
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());


app.get('/api/test', async (req: Request, res: Response ) => {
    res.status(200).json({ message: "hello" })
});


export default app;
