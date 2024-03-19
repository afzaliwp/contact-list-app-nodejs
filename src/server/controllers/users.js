import {Users} from "../../db/sequelize.js";
import md5 from 'md5';

export async function createUser({fullName, username, password}) {
    return await Users.create({
        fullName,
        username,
        password,
    })
}