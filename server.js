import express from 'express';
import {loadContacts, printTable} from "./services.js";

const contactList = [];

const app = express();

const logRequests = function (req, res, next) {
    console.log(req.method, req.url)
    next();
}

app.use(logRequests);

const handleRoutes = () => {
    app.get('/contacts', (req, res) => {
        if ( 'table' === req.query.format ) {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(printTable(contactList));
        } else {
            res.status(200).json(contactList);
        }
    });
}


async function main() {
    const contacts = await loadContacts();
    contactList.push(...contacts);
    handleRoutes();

    app.listen( 4000, () => {
        console.log('app is running on port 4000, http://localhost:4000');
    } );
}

await main();