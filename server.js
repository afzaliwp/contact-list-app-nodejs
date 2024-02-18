import http from 'http';
import url from 'url';
import {loadContacts, printTable} from "./services.js";

const contactList = [];

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    const urlObj = url.parse(req.url, true);
    const {format} = urlObj.query;

    if ( 'table' === format ) {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write(printTable(contactList));
        res.end();
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.write(JSON.stringify(contactList));
        res.end();
    }
});

async function main() {
    const contacts = await loadContacts();
    contactList.push(...contacts);

    server.listen(4000, () => {
        console.log('app is running on port 4000, http://localhost:4000')
    });
}

await main();