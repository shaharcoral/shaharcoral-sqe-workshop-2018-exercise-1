import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';


describe('The javascript parser', () => {
    test1();
    test2();
    test3();
    test4();
    test5();
    test6();
    test7();
    test8();
    test9();
    test10();
    test11();
    test12();
    test13();
    test14();
    test15();
    test16();
    test17();
});

function test1(){
    //test1
    it('parsring let exp', () => {
        let test=[];
        test.push('1,VariableDeclaration,x,,3');
        assert.equal(
            JSON.stringify(parseCode('let x=3;')),
            JSON.stringify(test)
        );
    });
}
function test2(){
    //test2
    it('parsring func with return statement', () => {
        let test=[];
        test.push('1,FunctionDeclaration,x,,');
        test.push('2,ReturnStatement,,,-1');
        assert.equal(

            JSON.stringify(parseCode('function x(){\n' +
                'return -1;\n' +
                '}')),
            JSON.stringify(test)

        );
    });
}
function test3(){
    //test 3
    it('parsring empty', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '[]'
        );
    });
}
function test4(){
    //test 4
    it('parsring more than 1 let exp', () => {
        let test=[];
        test.push('1,VariableDeclaration,x,,3');
        test.push('2,VariableDeclaration,x,,4');
        assert.equal(
            JSON.stringify(parseCode('let x=3;\n' +
                'let x=4;')),
            JSON.stringify(test)
        );
    });
}
function test5() {
    //test 5
    it('while exp with if', () => {
        let test=[];
        test.push('1,WhileStatement,,low <= high,');
        test.push( '2,AssignmentExpression,mid,,low+high/2');
        test.push('3,IfStatement,,X<V[mid],');
        test.push('4,AssignmentExpression,high,,mid-1');
        assert.equal(
            JSON.stringify(parseCode('while (low<= high) {\n' +
                '        mid = (low + high)/2;\n' +
                '        if (X < V[mid])\n' +
                '            high = mid - 1;\n' +
                '           }\n')),

            JSON.stringify(test)
        );
    });
}

function  test6() {
    it('for exp with if inside and alternate', () => {
        let test=[];
        test.push('1,FunctionDeclaration,test,,');
        test.push('3,VariableDeclaration,x,,3');
        test.push('4,ForStatement,,I=0;i<=5;i=I+1,');
        test.push('5,AssignmentExpression,x,,x+i');
        test.push('8,ReturnStatement,,,x');
        assert.equal(
            JSON.stringify(parseCode('function test()\n' + '{\n' +'let x=3;\n' +'for(I=0;i<=5;i=I+1){\n' +
                'x=x+i;\n' +
                '\n' +
                '}\n' +
                'return x;\n' +
                '}')),
            JSON.stringify(test)
        );
    });
}
function test7() {
    it('for and while exp', () => {
        let test=[];
        test.push('1,FunctionDeclaration,binarySearch,,');
        test.push('1,VariableDeclaration,X,,');
        test.push('1,VariableDeclaration,V,,');
        test.push('1,VariableDeclaration,n,,');
        test.push('2,WhileStatement,,low <= high,');
        test.push('3,ForStatement,,I=0;i<=5;i++,');
        test.push('4,IfStatement,,x==1,');
        test.push('5,ReturnStatement,,,1');
        test.push('7,else IfStatement,,x>1,');
        test.push('8,AssignmentExpression,x,,x+i');
        test.push('12,ReturnStatement,,,-1');
        assert.equal(JSON.stringify(parseCode('function binarySearch(X, V, n){\n' + ' while (low <= high) {\n' +'for(I=0;i<=5;i++){\n' +'if(x==1){\n' + 'return 1;\n' +                '}\n' +                'else if(x>1){\n' +                'x=x+i;\n' +                '}\n' +
                '}\n' +
                '           }\n' +
                '    return -1;\n' +
                '}')),
        JSON.stringify(test)); });}

function  test8() {
    it('2 functions ', () => {
        let test = [];
        test.push('1,FunctionDeclaration,x,,');
        test.push('2,ReturnStatement,,,-1');
        test.push('4,FunctionDeclaration,y,,');
        test.push('5,ReturnStatement,,,1');
        assert.equal(
            JSON.stringify(parseCode('function x(){\n' +
                'return -1;\n' +
                '}\n' +
                'function y(){\n' +
                'return 1;\n' +
                '}\n')),
            JSON.stringify(test)
        );
    });
}
function  test9() {
    //test 9
    it('empty func ', () => {
        let test=[];
        test.push('1,FunctionDeclaration,binarySearch,,');
        test.push('1,VariableDeclaration,X,,');
        test.push('1,VariableDeclaration,V,,');
        test.push('1,VariableDeclaration,n,,');
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X, V, n){}\n')),
            JSON.stringify(test)
        );
    });
}

function  test10() {
    it('the given example', () => {        let test=[];
        test.push('1,FunctionDeclaration,binarySearch,,');
        test.push('1,VariableDeclaration,X,,');
        test.push('1,VariableDeclaration,V,,');
        test.push('1,VariableDeclaration,n,,');
        test.push('2,VariableDeclaration,low,,null');
        test.push('2,VariableDeclaration,high,,null');
        test.push('2,VariableDeclaration,mid,,null');
        test.push('3,AssignmentExpression,low,,0');
        test.push('4,AssignmentExpression,high,,n-1');
        test.push('5,WhileStatement,,low <= high,');
        test.push('6,AssignmentExpression,mid,,low+high/2');
        test.push('7,IfStatement,,X<V[mid],');
        test.push('8,AssignmentExpression,high,,mid-1');
        test.push('9,else IfStatement,,X>V[mid],');
        test.push('10,AssignmentExpression,low,,mid+1');
        test.push('12,ReturnStatement,,,mid');
        test.push('14,ReturnStatement,,,-1');
        assert.equal(            JSON.stringify(parseCode('function binarySearch(X, V, n){\n' +                '    let low, high, mid;\n' +                '    low = 0;\n' +                '    high = n - 1;\n' +                '    while (low <= high) {\n' +                '        mid = (low + high)/2;\n' +                '        if (X < V[mid])\n' +                '            high = mid - 1;\n' +                '        else if (X > V[mid])\n' +                '            low = mid + 1;\n' +                '        else\n' +                '            return mid;\n' +                '    }\n' +                '    return -1;\n' +                '}')),            JSON.stringify(test) ); }); }


function  test11() {
    it('for exp not in block', () => {
        let test=[];
        test.push('1,ForStatement,,i=0;i<10;i++,');
        test.push('3,AssignmentExpression,i,,i+1');

        assert.equal(
            JSON.stringify(parseCode(' for(i=0;i<10;i++)\n' +
                '        {\n' +
                '            i=i+1;\n' +
                '        }')),
            JSON.stringify(test)
        );
    });

}


function  test12() {
    it('let without init', () => {
        let test=[];
        test.push('1,VariableDeclaration,x,,null');

        assert.equal(
            JSON.stringify(parseCode(' let x;')),
            JSON.stringify(test)
        );
    });

}


function  test13() {
    it('if without alternate', () => {
        let test=[];
        test.push('1,FunctionDeclaration,test,,');
        test.push('2,IfStatement,,x==2,');
        test.push('3,ReturnStatement,,,1');
        assert.equal(
            JSON.stringify(parseCode('function test(){\n' +
                'if(x==2){\n' +
                'return 1;\n' +
                '}\n' +
                '}\n')),
            JSON.stringify(test)
        );
    });

}


function  test14() {
    it('assignement expr-not in block', () => {
        let test=[];
        test.push('1,AssignmentExpression,x,,2');
        assert.equal(
            JSON.stringify(parseCode('x=2')),
            JSON.stringify(test)
        );
    });

}

function  test15() {
    it('if not in block', () => {
        let test=[];
        test.push('1,IfStatement,,x==2,');
        test.push('2,AssignmentExpression,x,,3');
        assert.equal(
            JSON.stringify(parseCode('if(x==2){\n' +
                'x=3;}\n')),
            JSON.stringify(test)
        );
    });
}

function test16() {
    it('if with logical exp', () => {
        let test=[];
        test.push('1,IfStatement,,x==1 && x==2,');
        test.push('2,AssignmentExpression,x,,1');
        assert.equal(
            JSON.stringify(parseCode('if(x==1 && x==2){\n' +
                'x=1;\n' +
                '}')),
            JSON.stringify(test)
        );
    });
}

function  test17() {
    it('for exp not in block and i=i++', () => {
        let test=[];
        test.push('1,ForStatement,,i=0;i<10;i=i++,');
        test.push('3,AssignmentExpression,i,,i+1');

        assert.equal(
            JSON.stringify(parseCode(' for(i=0;i<10;i=i++)\n' +
                '        {\n' +
                '            i=i+1;\n' +
                '        }')),
            JSON.stringify(test)
        );
    });

}



