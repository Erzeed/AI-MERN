import express, { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../model/user";
import { loginValidate, registerValidate, validate } from "../utils/validation";
import { createToken, veryfyToken } from "../middleware/auth";
import { authorizationUrl, oauth2Client } from "../utils/googleauth";
import { google } from "googleapis";

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
        const isMatch = await bcryptjs.compare(password, user.password);
        
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

router.get("/google", async (req:Request, resp:Response) => {
    resp.redirect(authorizationUrl)
})

router.post("/google/callback", async (req:Request, resp:Response) => {
    try {
        const { code } = req.body
        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens)
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        })
    
        const { data } = await oauth2.userinfo.get();
        const { email, name} = data
        if(!email || !name){
            return resp.json({
                data: data,
            })
        }
        let user = await User.findOne({ email })
        if(!user) {
            user = new User({
                username: name,
                email: email
            })
            user.save()
        }
        
        const token = createToken(user._id.toString(), user.email, "1d");
        resp.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        return resp.status(200).json(token)
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "ERROR", cause: error.message });
    }
})

router.get("/verify-token", veryfyToken, async (req:Request, resp: Response) => {
    try {
        //user token check
        const user = await User.findById(req.id);
        if (!user) {
            return resp.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== req.id) {
            return resp.status(401).send("Permissions didn't match");
        }
        return resp.status(200).json({ message: "OK", id: user._id, email: user.email, username: user.username });
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