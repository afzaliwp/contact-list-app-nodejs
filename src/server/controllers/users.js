import {Users} from "../../db/sequelize.js";
import jwt from "jsonwebtoken";
import configs from "../../configs/database.cjs";
import {DAY_IN_SECOND} from "../../utils.js";

export async function createUser({fullName, username, password}) {
    return await Users.create({
        fullName,
        username,
        password,
    })
}

export async function getUser({username}) {
    return await Users.findOne({
        where: {
            username: username,
        }
    })
}

export function returnCreatedUser(req, res) {
    res.status(201).json(
        {
            message: `User "${req.user.fullName}" created successfully`,
            token: generateToken(req.user),
        }
    );
}

export function generateToken({username, id}) {
    const payload = {
        username: username,
        id: id
    }

    return jwt.sign(payload, configs.jwtSecret, {expiresIn: DAY_IN_SECOND * 2});
}

export function returnAuthInfo(req, res) {
    if (!req.user) {
        res.status(401).send('Invalid Username or Password!');
        return;
    }

    const token = generateToken(req.user);

    res.json({
        token: token,
    });
}