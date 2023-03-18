import {Response} from "express";
import md5 from "md5";
import sha1 from 'sha1';
import jwt from "jsonwebtoken";

class Helper {
    static response = (res: Response, statusCode: number, status: String, message: String, data: any = null) => {
        return res.status(statusCode).json({
            status,
            message,
            data
        });
    };

    static signJwt = (email: string) => {
        try {
            return jwt.sign({email: email}, process.env.TOKEN_SECRET as string, { expiresIn: 90*90*90});

        } catch (e:any) {
            console.log(e);
        }
    }

    static encPassword = (password: string, name: string) => {
        return md5(password + sha1(name + password));
    };
}


export default Helper