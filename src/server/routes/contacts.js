import express from "express";
import {Contacts} from '../../db/sequelize.js';
import {createContact, deleteContact, editContact, getContacts} from "../controllers/contacts.js";

const router = express.Router();
const contactList = [];

router.get('/list', getContacts);
router.post('/new', createContact);

router.delete('/delete', deleteContact);

router.put('/edit', editContact);

export default router;