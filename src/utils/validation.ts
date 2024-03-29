import { NextFunction, Request, Response } from "express";
import { check, param, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
        const result = await validation.run(req);
        if (!result.isEmpty()) {
            break;
        }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
        }
    return res.status(422).json({ errors: errors.array() });
    };
};

export const registerValidate = [
    check("username", "User Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
        min: 6,
    }),
]
export const loginValidate = [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
        min: 6,
    }),
]

export const chatCompletionValidator = [
    check("role").notEmpty().withMessage("Role  is required"),
    check("content").notEmpty().withMessage("Message  is required"),
];

export const updateNameChatValidator = [
    param("id").notEmpty().withMessage("ID is required"),
    check("name").notEmpty().withMessage("Name  is required"),
];