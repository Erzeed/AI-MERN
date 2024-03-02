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
    const token = req.signedCookies["auth_token"];
    if(!token) {
        return resp.status(401).json({message: "unAuthorized"})
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET as string, (err, success) => {
            if (err) {
                reject(err.message);
                return resp.status(401).json({ message: "Token Expired" });
            } else {
                resolve();
                resp.locals.jwtData = success;
                return next();
            }
        });
    });
} 