import readline from 'readline/promises';
import {Contacts, sequelize} from '../db/sequelize.js';
import {
    stdin as input,
    stdout as output,
} from 'process';

const rl = readline.createInterface({input, output});

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
        await showContactsList();
        console.log('---------- New Contact added! ----------');
        await help();
    }

    if ('d' === menu) {
        await deleteContact();
        console.log('---------- Contact deleted! ----------');
        await help();
    }

    if ('q' === menu) {
        console.log('--- Bye! ---');
        quit();
    }

}

async function addNewContact() {
    const firstName = await rl.question('First Name: ');
    const lastName = await rl.question('last Name: ');
    const mobilePhone = await rl.question('mobile Phone: ');
    const isFavorite = await rl.question('isFavorite [y/N]: ');

    try {
        const newContacts = await Contacts.create({
            firstName,
            lastName,
            mobilePhone,
            isFavorite: isFavorite === 'y',
        });

    } catch (error) {
        console.error(error);
    }
}

/*
 * showType: 'table' or 'normal'
 */
async function showContactsList() {
    try {
        const contacts = await Contacts.findAll();
        const contactsData = JSON.parse(JSON.stringify(contacts))
        console.table(contactsData)
    } catch (error) {
        console.error(error);
    }
}

function quit() {
    rl.close();
}

async function deleteContact() {
    console.log('Choose a contact id from the list below to delete: ');
    await showContactsList();

    const contactId = await rl.question('contact id to delete: ');

    const affectedRows = await Contacts.destroy({
        where: {
            id: contactId,
        },
    });
    await showContactsList();
}

async function main() {
    try {
        await sequelize.sync({alter: true});
        await help();
    } catch (e) {
        console.error(e);
    }
}

await main();