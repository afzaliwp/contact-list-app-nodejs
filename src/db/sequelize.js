import {Sequelize} from "sequelize";
import configs from "../configs/database.js"
import contactsModel from "../models/contacts.js";
import contactCategoryModel from "../models/contactCategory.js";

const sequelize = new Sequelize(configs);

const Contacts = contactsModel(sequelize);
const ContactsCategory = contactCategoryModel(sequelize);

Contacts.hasOne(ContactsCategory);
ContactsCategory.belongsTo(Contacts);

export {sequelize};
export {Contacts};
export {ContactsCategory};
