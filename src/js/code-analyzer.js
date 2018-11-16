import * as esprima from 'esprima';

const parseCode = (codeToParse) => {
    const answer= esprima.parseScript(codeToParse,{
        loc: true
    });
    const answer_table=temp(answer);
    variableDeclarations=[];
    return answer_table;
};

export {parseCode};




let variableDeclarations = [];


let temp = function extraction(parseCode) {
    switch (parseCode.type.valueOf()) {
    case 'FunctionDeclaration':
        variableDeclarations.push('' + parseCode.loc.start.line + ',' + parseCode.type + ',' + parseCode.id.name + ',,');
        parseCode.params.forEach(function (object) {
            variableDeclarations.push('' + object.loc.start.line + ',VariableDeclaration,' + object.name + ',,');});
        return temp(parseCode.body);
    case 'Program':
        parseCode.body.forEach(function (object) {
            if(object.type==='IfStatement'){another_cases_in_block(object);}
            else{ temp(object); } });
        return variableDeclarations;
    case 'BlockStatement':
        parseCode.body.forEach(function(object){
            switch_case_body_block(object);
        });
        return variableDeclarations;
    default:
        return switch_case_outside_blocks(parseCode);
    }};

function declarations_help(object){
    object.declarations.forEach(function(object1) {
        if(object1.init==null){
            variableDeclarations.push(object1.loc.start.line + ',VariableDeclaration' + ',' + switch_case_outside_blocks(object1.id) + ',' + ',' +object1.init);
        }
        else {
            variableDeclarations.push(object1.loc.start.line + ',VariableDeclaration' + ',' + switch_case_outside_blocks(object1.id) + ',' + ',' +switch_case_outside_blocks(object1.init));
        }
    });
}

function switch_case_body_block(object){
    switch (object.type.valueOf()) {
    case 'VariableDeclaration':
        declarations_help(object);
        return variableDeclarations;
    case 'ExpressionStatement':
        return temp(object.expression);
    case 'WhileStatement':
        variableDeclarations.push(object.loc.start.line + ',' + object.type + ',' + ',' + object.test.left.name +' '+ object.test.operator +' ' + object.test.right.name + ',');
        return temp(object.body);
    default:
        another_cases_in_block(object);
    }
}

function  another_cases_in_block(object) {
    switch (object.type.valueOf()) {
    case 'ReturnStatement':
        return variableDeclarations.push(object.loc.start.line + ',' + object.type + ',' + ',' + ',' + temp(object.argument));
    case 'ForStatement':
        variableDeclarations.push(object.loc.start.line + ',' + object.type + ',,' + temp(object.test) + ',');
        temp(object.body);
        return variableDeclarations;
    case 'IfStatement':
        variableDeclarations.push(object.test.loc.start.line + ',' + object.type +',,' + temp(object.test) + ',');
        temp(object.consequent);
        if(object.alternate!=null){
            temp(object.alternate);
        }
        return variableDeclarations;
    }
}
function switch_case_outside_blocks(parseCode) {
    switch (parseCode.type.valueOf()) {
    case 'ReturnStatement':
        return variableDeclarations.push(parseCode.loc.start.line + ',' + parseCode.type + ',' + ',' + ',' + temp(parseCode.argument));
    case 'AssignmentExpression':
        variableDeclarations.push(parseCode.left.loc.start.line + ',' + parseCode.type + ',' + parseCode.left.name + ',' + ',' + temp(parseCode.right));
        return variableDeclarations;
    case 'ExpressionStatement':
        return temp(parseCode.expression);
    case 'ForStatement':
        variableDeclarations.push(parseCode.loc.start.line + ',' + parseCode.type + ',,' + temp(parseCode.test) + ',');
        temp(parseCode.body);
        return variableDeclarations;
    default:
        return switch_case_outside_blocks_more(parseCode);
    }
}
function switch_case_outside_blocks_more(parseCode) {
    switch (parseCode.type.valueOf()) {
    case 'IfStatement':
        variableDeclarations.push(parseCode.test.loc.start.line + ',' + 'else ' + parseCode.type+ ',,' + temp(parseCode.test) + ',');
        temp(parseCode.consequent);
        if (parseCode.alternate != null) {
            temp(parseCode.alternate);}
        return variableDeclarations;
    case 'VariableDeclaration':
        parseCode.declarations.forEach(function (object1) {
            if (object1.init == null) {
                variableDeclarations.push(object1.loc.start.line + ',VariableDeclaration' + ',' + temp(object1.id) + ',' + ',' + object1.init);}
            else {
                variableDeclarations.push(object1.loc.start.line + ',VariableDeclaration' + ',' + temp(object1.id) + ',' + ',' + temp(object1.init));}});
        return variableDeclarations;
    case 'WhileStatement':
        variableDeclarations.push(parseCode.loc.start.line + ',' + parseCode.type + ',' + ',' + parseCode.test.left.name + ' '+ parseCode.test.operator +' '+ parseCode.test.right.name + ',');
        return temp(parseCode.body);
    default:
        return primitive_type(parseCode);}}

function primitive_type(parseCode) {
    switch (parseCode.type.valueOf()) {
    case 'BinaryExpression':
        return temp(parseCode.left) + parseCode.operator + temp(parseCode.right);
    case 'Literal':
        return parseCode.value;
    case 'Identifier':
        return parseCode.name;
    default:
        return primitive_type_more(parseCode);
    }
}

function primitive_type_more(parseCode) {
    switch (parseCode.type.valueOf()) {
    case 'UnaryExpression':
        return parseCode.operator + temp(parseCode.argument);
    case 'MemberExpression':
        return parseCode.object.name + '[' + parseCode.property.name + ']';
    }
}





