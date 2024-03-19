import {Sequelize} from "sequelize";
import configs from "../configs/database.cjs"
import contactsModel from "../models/contacts.js";
import contactCategoryModel from "../models/contactCategory.js";
import UsersModel from "../models/users.js";

const sequelize = new Sequelize(configs);

const Contacts = contactsModel(sequelize);
const ContactsCategory = contactCategoryModel(sequelize);
const Users = UsersModel(sequelize);

Contacts.belongsTo(ContactsCategory);
ContactsCategory.hasMany(Contacts);

Contacts.belongsTo(Users);
Users.hasMany(Contacts);

export {sequelize};
export {Contacts};
export {ContactsCategory};
export {Users};
