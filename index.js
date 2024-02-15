import readline from 'readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'process';

const rl = readline.createInterface( {input, output} );
const contactsList = [];

const firstName = await rl.question('First Name: ');
const lastName = await rl.question('last Name: ');

const contact = {
    id: contactsList.length,
    firstName,
    lastName,
}
contactsList.push(contact);

const formattedContactList = contactsList
    .map( ({id, firstName, lastName}) => {
    return `#${id}   ${firstName}    ${lastName}`;
} ).join();

console.log( '----------------------------' );
console.log( formattedContactList );
console.log( '----------------------------' );

rl.close();