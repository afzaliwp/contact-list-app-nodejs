import readline from 'readline/promises';
import fs from 'fs/promises';
import {
    stdin as input,
    stdout as output,
} from 'process';

const rl = readline.createInterface({input, output});

const CONTACT_LIST_FILE_PATH = './data/contactslist.json';
const CONTACT_LIST_DIR_PATH = './data';

let contactsList = [];

const validMenuOptions = ['n', 'l', 'q', 'd'];

async function help() {
    console.log('n: add new contact\nl: show list\nd: delete a contact\nq: quit');
    const menu = await rl.question('Enter an option from the menu: ');

    if (!validMenuOptions.includes(menu)) {
        console.log('--- Invalid Input! ---');
        quit();
    }

    if ('l' === menu) {
        showContactsList();
        console.log('---------- List Done. ----------');
        help();
    }

    if ('n' === menu) {
        await addNewContact();
        showContactsList();
        console.log('---------- New Contact added! ----------');
        help();
    }

    if ('d' === menu) {
        await deleteContact();
        console.log('---------- Contact deleted! ----------');
        help();
    }

    if ('q' === menu) {
        console.log('--- Bye! ---');
        quit();
        return;
    }

}

async function addNewContact() {
    const firstName = await rl.question('First Name: ');
    const lastName = await rl.question('last Name: ');

    const contact = {
        id: contactsList.length,
        firstName,
        lastName,
    }
    contactsList.push(contact);

    saveContacts();
    return contactsList;
}

/*
 * showType: 'table' or 'normal'
 */
function showContactsList(showType = 'table') {
    if ('table' === showType) {
        console.table(contactsList);
        return;
    }

    const formattedContactList = contactsList
        .map(({id, firstName, lastName}) => {
            return `#${id}   ${firstName}    ${lastName}`;
        }).join();

    console.log('----------------------------');
    console.log(formattedContactList);
    console.log('----------------------------');
}

function quit() {
    rl.close();
}

async function createContactListFile() {
    try {
        await fs.access(CONTACT_LIST_DIR_PATH);
    } catch (e) {
        await fs.mkdir(CONTACT_LIST_DIR_PATH);
    }

    try {
        await fs.access(CONTACT_LIST_FILE_PATH);
    } catch (e) {
        await fs.writeFile(CONTACT_LIST_FILE_PATH, '[]');
    }
}

async function deleteContact() {
    console.log('Choose a contact id from the list below to delete: ');
    showContactsList();

    const contactId = await rl.question('contact id to delete: ');

    contactsList = contactsList.filter(contact => String(contact.id) !== contactId);

    saveContacts();
    showContactsList();
}

async function loadContacts() {
    try {
        const contactListJSON = await fs.readFile(CONTACT_LIST_FILE_PATH, 'utf-8');
        contactsList.push(...JSON.parse(contactListJSON));
    } catch (e) {
        throw e;
    }
}

async function saveContacts() {
    try {
        await fs.writeFile(CONTACT_LIST_FILE_PATH, JSON.stringify(contactsList));
    } catch (e) {
        throw e;
    }
}

async function main() {
    await createContactListFile();
    loadContacts();
    help();
}

await main();