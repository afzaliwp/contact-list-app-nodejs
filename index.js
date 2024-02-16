import readline from 'readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'process';

const rl = readline.createInterface({input, output});

const contactsList = [
    {
        id: 0,
        firstName: 'Mamad',
        lastName: 'afzali'
    }
];

const validMenuOptions = ['n', 'l', 'q']

async function help() {
    console.log('n: add new contact\nl: show list\nq: quit');
    const menu = await rl.question('Enter an option from the menu: ');

    if ( ! validMenuOptions.includes(menu) ) {
        console.log( '--- Invalid Input! ---' );
        quit();
    }

    if ('l' === menu) {
        showContactsList(contactsList);
        console.log( '---------- List Done. ----------' );
        help();
    }

    if ('n' === menu) {
        await addNewContact();
        showContactsList(contactsList);
        console.log( '---------- New Contact added! ----------' );
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

    return contactsList;
}

/*
 * showType: 'table' or 'normal'
 */
function showContactsList(contactsList, showType = 'table') {
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

help();

// const list = await addNewContact();
// showContactsList(list, 'table');
// quit();