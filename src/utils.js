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

export function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum and the minimum are inclusive
}
