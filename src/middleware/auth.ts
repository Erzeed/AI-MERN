import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = {id, email}
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn
    })
    return token
}

export const veryfyToken = (req: Request, resp: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if(!token) {
        return resp.status(401).json({message: "unAuthorized"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.id = (decode as JwtPayload).id;
        next()
    } catch (error) {
        console.log(error)
        return resp.status(401).json({message: "unAuthorized"})
    }
} 