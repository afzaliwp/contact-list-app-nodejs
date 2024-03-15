import {Contacts} from "../../db/sequelize.js";

export async function getContacts(req, res) {
    try {
        const contacts = await Contacts.findAll();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong!',
            error,
        });
    }
}

export async function createContact(req, res) {
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
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong!',
            error,
        });
    }
}

export async function deleteContact(req, res) {
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
}

export async function editContact(req, res) {
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
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong!',
            error,
        });
    }
}