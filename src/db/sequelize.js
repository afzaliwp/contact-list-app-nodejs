import {Sequelize} from "sequelize";
import configs from "../configs/database.js"
import contactsModel from "../models/contacts.js";
import contactCategoryModel from "../models/contactCategory.js";

const sequelize = new Sequelize(configs);

const Contacts = contactsModel(sequelize);
const ContactsCategory = contactCategoryModel(sequelize);

Contacts.belongsTo(ContactsCategory);
ContactsCategory.hasMany(Contacts);

export {sequelize};
export {Contacts};
export {ContactsCategory};
