import {Sequelize} from "sequelize";
import contactsModel from "../models/contacts.js";
import contactCategoryModel from "../models/contactCategory.js";

const sequelize = new Sequelize({
    username: 'ma90',
    password: '',
    port: 54321,
    database: 'contacts',
    dialect: 'postgres',
});

const Contacts = contactsModel(sequelize);
const ContactsCategory = contactCategoryModel(sequelize);

Contacts.hasOne(ContactsCategory);
ContactsCategory.belongsTo(Contacts);

export {sequelize};
export {Contacts};
export {ContactsCategory};
