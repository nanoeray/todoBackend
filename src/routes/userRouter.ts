import { Router } from "express";
import auth from "../middlewares/auth";

import {
    createUser,
    login
} from "../controllers/userController";

const router = Router();

router.route('/singUp').post(createUser);
router.route('/login').post(login);
export default router;