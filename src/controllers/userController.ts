import { RequestHandler } from "express";
import Helper from "../utils/helpers";
import User from "../models/user";
import {getByEmail} from "../db_model/UserModel"
export const createUser: RequestHandler = async (req, res, next) => {
    try {
        const {name, email} = req.body;
        let {password} = req.body
        if(name.length < 2 || email.length < 5) {
            throw "Please fill all fields.";
        } else if(password.length < 3) {
            throw "Password must be at least 3 characters.";
        }
        password = Helper.encPassword(password, name);
        const user = await User.create({name, email, password });
        return Helper.response(res,200, "success", "User registered successfully!", user);

    } catch (e:any) {
        let error;

        if(e.name === "SequelizeUniqueConstraintError") {
            error = "This e-mail address taken."
        } else {
            error = e;
        }

        return Helper.response(res,200, "error", "An error occured!", error);

    }
};

export const login: RequestHandler = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(email.length < 5 || password.length < 3) {
            throw "Please fill all fields.";
        }
        const user = await getByEmail(email);
        if(user && user.password == Helper.encPassword(password,user.name)) {
            const data = {
                name: user.name,
                email: user.email,
                token: Helper.signJwt(user.email)
            }
            return Helper.response(res,200, "success", "Login success!", data);
        } else {
            return Helper.response(res,200, "error", "Invalid credentials!");
        }

    } catch (e:any) {
        return Helper.response(res,200, "error", "An error occured!", e);

    }
};
