import express from 'express';
import contactsRoutes from './routes/contacts.js';
import bodyParser from 'express';
import {sequelize} from "../db/sequelize.js";
import {logRequests} from "./middlewares/logger.js";
import {config} from "dotenv";
config();

const app = express();

await sequelize.sync({alter: true});
console.log("All models were synchronized successfully.");


app.use(logRequests);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/contacts', contactsRoutes);


async function main() {
    app.listen(4000, () => {
        console.log('app is running on port 4000, http://localhost:4000');
    });
}

await main();