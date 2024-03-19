import express from "express";
import passport from "passport";

const router = express.Router();

function returnCreatedUser(req, res) {
    res.status(201).send(`User "${req.user.fullName}" created successfully`);
}

const signUpUser = [
    passport.authenticate('signup', {session: false}),
    returnCreatedUser
];

router.post('/signup', signUpUser);

export default router;