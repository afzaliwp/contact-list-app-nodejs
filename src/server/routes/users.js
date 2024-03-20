import express from "express";
import passport from "passport";
import {returnAuthInfo, returnCreatedUser} from "../controllers/users.js";


const router = express.Router();

const signUpUser = [
    passport.authenticate('signup', {session: false}),
    returnCreatedUser
];

const loginUser = [
    passport.authenticate('login', {session: false}),
    returnAuthInfo
];

router.post('/signup', signUpUser);
router.post('/login', loginUser);

export default router;