import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {

    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#myTable').empty();
        init();
        insert_table(parsedCode);
    });
});

function init() {
    const table = document.getElementById('myTable');
    const newRow = table.insertRow(0);
    const newCell0 = newRow.insertCell(0);
    const newCell1 = newRow.insertCell(1);
    const newCell2 = newRow.insertCell(2);
    const newCell13 = newRow.insertCell(3);
    const newCell14 = newRow.insertCell(4);
    const newText0 = document.createTextNode('Line');
    const newText1 = document.createTextNode('Type');
    const newText2 = document.createTextNode('Name');
    const newText3 = document.createTextNode('Condition');
    const newText4 = document.createTextNode('Value');
    newCell0.appendChild(newText0);
    newCell1.appendChild(newText1);
    newCell2.appendChild(newText2);
    newCell13.appendChild(newText3);
    newCell14.appendChild(newText4);
}
function insert_table(parseCode) {
    for (let i = 0; i < parseCode.length; i++) {
        const res = parseCode[i].split(',');
        insert_cell_row(i,res);
    }

}

function insert_cell_row(i,res)
{
    const table = document.getElementById('myTable');
    const newRow = table.insertRow(i+1);
    const newCell0 = newRow.insertCell(0);
    const newCell1 = newRow.insertCell(1);
    const newCell2 = newRow.insertCell(2);
    const newCell13 = newRow.insertCell(3);
    const newCell14 = newRow.insertCell(4);
    const newText0 = document.createTextNode(res[0]);
    const newText1 = document.createTextNode(res[1]);
    const newText2 = document.createTextNode(res[2]);
    const newText3 = document.createTextNode(res[3]);
    const newText4 = document.createTextNode(res[4]);
    newCell0.appendChild(newText0);
    newCell1.appendChild(newText1);
    newCell2.appendChild(newText2);
    newCell13.appendChild(newText3);
    newCell14.appendChild(newText4);
}




