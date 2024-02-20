import express from "express";
import {
    printTable,
    loadContacts,
    generateNewId,
    saveContacts,
    deleteContactById
} from "../services.js";

const router = express.Router();
const contactList = [];
const contacts = await loadContacts();
contactList.push(...contacts);

router.get('/list', (req, res) => {
    if ('table' === req.query.format) {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(printTable(contactList));
    } else {
        res.status(200).json(contactList);
    }
});
router.post('/new', async (req, res) => {
    const {firstName, lastName} = req.body;

    const id = generateNewId(contactList);

    const contact = {
        id,
        firstName,
        lastName,
    }
    contactList.push(contact);

    await saveContacts(contactList);
    res.send(`Contact "#${id} ${firstName} ${lastName}" created successfully!`);
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

    if ( ! contactList[index] ) {
        res.send(`Invalid Id!`);
        return;
    }

    contactList[index].firstName = firstName;
    contactList[index].lastName = lastName;

    await saveContacts(contactList);
    res.send(`Contact "#${id}" edited successfully!`);
});

export default router;