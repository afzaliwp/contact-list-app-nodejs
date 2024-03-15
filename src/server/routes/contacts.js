import express from "express";
import {createContact, deleteContact, editContact, getContacts} from "../controllers/contacts.js";

const router = express.Router();

router.get('/list', getContacts);
router.post('/new', createContact);
router.delete('/delete', deleteContact);
router.put('/edit', editContact);

export default router;