import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/auth";

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

app.use("/auth", userRoute)


export default app;
