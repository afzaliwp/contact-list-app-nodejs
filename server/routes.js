import express from "express";
import {
    printTable,
    loadContacts,
    saveContacts,
    deleteContactById
} from "../services.js";
import {query} from '../db/db.js';
import {Contacts} from '../db/sequelize.js';

const router = express.Router();
const contactList = [];

router.get('/list', async (req, res) => {
    try {
        const contacts = await Contacts.findAll();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong!',
            error,
        });
    }

});
router.post('/new', async (req, res) => {
    const {firstName, lastName, mobilePhone, isFavorite, profilePicture} = req.body;

    try {
        const newContacts = await Contacts.create({
            firstName,
            lastName,
            mobilePhone,
            isFavorite: Boolean(isFavorite),
            profilePicture
        });

        res.json({success: true, ...newContacts.dataValues});
        return contactList;
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong!',
            error,
        });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const {contactId} = req.body;
        const affectedRows = await Contacts.destroy({
            where: {
                id: contactId,
            },
        });
        res.json({
            affectedRows
        });
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong!',
            error,
        });
    }
});

router.put('/edit', async (req, res) => {
    const {id, firstName, lastName, mobilePhone, isFavorite, profilePicture} = req.body;

    try {
        const affectedRows = await Contacts.update({
            firstName,
            lastName,
            mobilePhone,
            isFavorite,
            profilePicture
        }, {
            where: {
                id
            }
        });

        res.json({
            affectedRows,
        });
    } catch ( error ) {
        res.status(400).json( {
            message: 'something went wrong!',
            error,
        } );
    }
});

export default router;