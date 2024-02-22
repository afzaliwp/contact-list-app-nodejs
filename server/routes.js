import express from "express";
import {
    printTable,
    loadContacts,
    generateNewId,
    saveContacts,
    deleteContactById
} from "../services.js";
import {query} from '../db.js';

const router = express.Router();
const contactList = [];
const contacts = await loadContacts();
contactList.push(...contacts);

router.get('/list', async (req, res) => {
    if ('table' === req.query.format) {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(printTable(contactList));
    } else {
        const queryRes = await query('SELECT * FROM contacts');
        res.status(200).json(queryRes['rows']);
    }
});
router.post('/new', async (req, res) => {
    const {firstName, lastName} = req.body;

    const queryRes = await query(`INSERT INTO contacts
    (first_name, last_name)
    VALUES($1, $2)`, [firstName, lastName]);

    console.log(queryRes);
    await saveContacts(contactList);
    res.send(`Contact "${firstName} ${lastName}" created successfully!`);
    return contactList;
});

router.delete('/delete', async (req, res) => {
    const {contactId} = req.body;
    await deleteContactById(contactList, contactId);
    res.send(`Contact "#${contactId}" deleted successfully!`);
});

router.put('/edit', async (req, res) => {
    const {id, firstName, lastName} = req.body;

    const index = contacts.findIndex((contact) => contact.id === Number(id));

    if (!contactList[index]) {
        res.send(`Invalid Id!`);
        return;
    }

    contactList[index].firstName = firstName;
    contactList[index].lastName = lastName;

    await saveContacts(contactList);
    res.send(`Contact "#${id}" edited successfully!`);
});

export default router;