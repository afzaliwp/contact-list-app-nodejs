import readline from 'readline/promises';
import fs from 'fs/promises';
import {
    stdin as input,
    stdout as output,
} from 'process';

import {
    loadContacts,
    saveContacts,
    createContactListFile,
    generateNewId,
    deleteContactById
} from './services.js';

const rl = readline.createInterface({input, output});

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

    const id = generateNewId(contactsList);

    const contact = {
        id,
        firstName,
        lastName,
    }
    contactsList.push(contact);

    await saveContacts(contactsList);
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

async function deleteContact() {
    console.log('Choose a contact id from the list below to delete: ');
    showContactsList();

    const contactId = await rl.question('contact id to delete: ');

    contactsList = await deleteContactById(contactsList, contactId);
    showContactsList();
}

async function main() {
    await createContactListFile();
    const contacts = await loadContacts();
    contactsList.push(...contacts);
    help();
}

await main();