import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { loginValidate, registerValidate, validate } from "../utils/validation";
import User from "../model/user";
import { createToken, veryfyToken } from "../middleware/auth";

const router = express.Router();

router.post("/register",validate(registerValidate), async (req: Request, resp:Response) => {
    try {
        const { email } = req.body;
        let existingUser = await User.findOne({ email })
        if(existingUser) {
            return resp.status(400).json({message: "Email already registered"})
        }
        existingUser = new User(req.body)
        existingUser.save()

        const token = createToken(existingUser._id.toString(), existingUser.email, "1d");
        resp.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        return resp.status(200).json({message: "Register Succes"})
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "ERROR", cause: error.message });
    }
})

router.post("/login", validate(loginValidate), async (req:Request, resp:Response) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email })
        if(!user) {
            return resp.status(401).json({message: "Email Not Found"})
        }
        const isMatch = bcryptjs.compare(user.password, password);
        if(!isMatch) {
            return resp.status(403).json({message: "Email or Password is wrong"})
        }
        const token = createToken(user._id.toString(), user.email, "1d");
        resp.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        return resp.status(200).json({message: "Register Succes"})
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "ERROR", cause: error.message });
    }
})

router.get("/verify-token", veryfyToken, async (req:Request, resp: Response) => {
    try {
        //user token check
        const user = await User.findById(resp.locals.jwtData.id);
        if (!user) {
            return resp.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== resp.locals.jwtData.id) {
            return resp.status(401).send("Permissions didn't match");
        }
        return resp.status(200).json({ message: "OK", id: user._id, email: user.email });
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "ERROR", cause: error.message });
    }
})

router.post("/logout", veryfyToken, async (req:Request, resp: Response) => {
    resp.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000
    })
    return resp.send()
})

export default router