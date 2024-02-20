import fs from 'fs/promises';

export const CONTACT_LIST_FILE_PATH = './data/contactslist.json';
export const CONTACT_LIST_DIR_PATH = './data';

export async function loadContacts() {
    try {
        const contactListJSON = await fs.readFile(CONTACT_LIST_FILE_PATH, 'utf-8');
        return JSON.parse(contactListJSON);
    } catch (e) {
        throw e;
    }
}

export async function saveContacts(contactsList) {
    try {
        await fs.writeFile(CONTACT_LIST_FILE_PATH, JSON.stringify(contactsList));
    } catch (e) {
        throw e;
    }
}

export async function createContactListFile() {
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

export function printTable(data) {
    let html = '<table>';

    // Add header row
    html += '<tr>';
    for (let key in data[0]) {
        html += '<th>' + key + '</th>';
    }
    html += '</tr>';

    // Add data rows
    for (let i = 0; i < data.length; i++) {
        html += '<tr>';
        for (let key in data[i]) {
            html += '<td>' + data[i][key] + '</td>';
        }
        html += '</tr>';
    }

    html += '</table>';

    return html;
}

export function generateNewId(contactsList) {
    let biggestId = Math.max(...contactsList.map(contact => Number(contact.id)));

    return biggestId + 1;
}

export async function deleteContactById(contactsList, contactId) {
    contactsList = contactsList.filter(contact => String(contact.id) !== contactId);
    await saveContacts(contactsList);
    return contactsList;
}