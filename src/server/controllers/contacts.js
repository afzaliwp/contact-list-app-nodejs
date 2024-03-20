import multer from 'multer';
import {Contacts} from "../../db/sequelize.js";
import {printTable} from "../../utils.js";
import {Op} from "sequelize";
import passport from "passport";

const upload = multer({storage: multer.memoryStorage()});

async function loadContacts(req, res, next) {
    const {sort, order, q, page} = req.query;
    const queryOrder = [];
    const where = {
        UserId: req.user.id,
    };

    const pagination = {
        limit: 10,
        offset: 0,
    };
    if (sort) {
        queryOrder.push([sort, order]);
    }

    if (q) {
        where[Op.or] = [
            {firstName: {[Op.iLike]: `%${q}%`}},
            {lastName: {[Op.iLike]: `%${q}%`}},
            {mobilePhone: {[Op.iLike]: `%${q}%`}},
        ];
    }

    if (page) {
        pagination.offset = (page - 1) * pagination.limit;
    }

    try {
        const contacts = await Contacts.findAll({
            order: queryOrder,
            where: where,
            ...pagination,
        });
        const normalizedContacts = contacts.map(({dataValues: {id, profilePicture, ...rest}}) => {
            return {
                id,
                profilePicture: profilePicture ? `/static/profile-picture/${id}` : null,
                ...rest
            }
        });

        req.locals = {
            contacts: normalizedContacts,
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message ? error.message : 'Something went wrong!',
        });
    }
}

function getFormattedContacts(req, res, next) {
    if ('1' !== req.query.format) {
        next();
        return;
    }

    res.send(printTable(req.locals.contacts));
}

function getJsonContacts(req, res, next) {
    res.json(req.locals.contacts);
}

export const getContacts = [
    passport.authenticate('jwt-verify', {session: false}),
    loadContacts,
    getFormattedContacts,
    getJsonContacts,
];

async function createContactController(req, res) {
    const {firstName, lastName, mobilePhone, isFavorite} = req.body;
    const {buffer: profilePicture} = req.file || {};

    try {
        const newContacts = await Contacts.create({
            firstName,
            lastName,
            mobilePhone,
            isFavorite: Boolean(isFavorite),
            profilePicture,
            UserId: req.user.id,
        });

        res.json({success: true, ...newContacts.dataValues});
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
        });
    }
}

export const createContact = [
    passport.authenticate('jwt-verify', {session: false}),
    upload.single('profilePicture'),
    createContactController
];

async function deleteContactController(req, res) {
    try {
        const {contactId} = req.body;
        const affectedRows = await Contacts.destroy({
            where: {
                id: contactId,
                UserId: req.user.id,
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

export const deleteContact = [
    passport.authenticate('jwt-verify', {session: false}),
    deleteContactController,
];

export async function editContactController(req, res) {
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
                id: id,
                UserId: req.user.id,
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

export const editContact = [
    passport.authenticate('jwt-verify', {session: false}),
    editContactController,
];

export async function getProfilePicture(req, res) {
    try {
        const profilePic = await Contacts.findOne({
            attributes: ['profilePicture'],
            where: {
                id: req.params.id,
            }
        });

        if (profilePic.dataValues) {
            res.type('image/jpeg');
            res.send(profilePic.dataValues.profilePicture);
            return;
        }

        res.status(404).send('Not Found!');

    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
}