import express from "express";
import {getProfilePicture} from "../controllers/contacts.js";

const router = express.Router();

router.get( '/profile-picture/:id', getProfilePicture );

export default router;