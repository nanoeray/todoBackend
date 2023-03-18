import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
require("dotenv").config();
import {getByEmail, getById} from "../db_model/UserModel"
import Helper from "./helpers";

const auth = (req: Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return Helper.response(res, 200, 'error', 'Token expired');
    const secret = process.env.TOKEN_SECRET;
        jwt.verify(token as string, secret as string, async (err: any, encoded: any) => {
            if (err) return Helper.response(res, 200, 'error', 'Token expired');
            req.body.loggedUser = await getByEmail(encoded.email);
            next();
        });
};

export default auth;