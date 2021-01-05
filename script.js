
const digitBtns = document.getElementById('digitBtns');
let displayValue = "";

//Display
const display = document.getElementById('display');
display.innerText = displayValue;
//Create digit panel buttons in grid
createBtns();


//Change inner display values of dynamically created digitBTns
const zeroBtn = document.getElementById('btn9');
const oneBtn = document.getElementById('btn6');
const twoBtn = document.getElementById('btn7');
const threeBtn = document.getElementById('btn8');
const fourBtn = document.getElementById('btn3');
const fiveBtn = document.getElementById('btn4');
const sixBtn = document.getElementById('btn5');
const sevenBtn = document.getElementById('btn0');
const eightBtn = document.getElementById('btn1');
const nineBtn = document.getElementById('btn2');
const decimalBtn = document.getElementById('btn10');
const equalsBtn = document.getElementById('btn11');
zeroBtn.innerHTML = "0";
oneBtn.innerText = "1";
twoBtn.innerText = "2";
threeBtn.innerText = "3";
fourBtn.innerText = "4";
fiveBtn.innerText = "5";
sixBtn.innerText = "6";
sevenBtn.innerText = "7";
eightBtn.innerText = "8";
nineBtn.innerText = "9";
decimalBtn.innerText = ".";
equalsBtn.innerText = "=";



//Basic operation buttons and event listeners attach
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const divideBtn = document.getElementById('divideBtn');
const basicBtns = [addBtn,subtractBtn,multiplyBtn,divideBtn];
basicBtns.forEach(element => {
    element.addEventListener('click',event =>{
        let regex = /[+\-/x]/;
        if(regex.test(displayValue))
        {  
            parse();
            displayValue += element.innerText;
    
        }
        else
        {
            displayValue += element.innerText;
            display.innerText = displayValue;
            display.style.fontSize = "70px";
        }
        
      
    })
    
  });

//Equals button parses the operation and calls operate function

equalsBtn.addEventListener('click', event =>{
    let regex = /[+\-/x]/;
    if(regex.test(displayValue))
    {  
        parse();
    
    }
});

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', event =>{
    displayValue = "";
    display.innerText = displayValue;
    checkDecimal();
});
const delBtn = document.getElementById('delBtn');
delBtn.addEventListener('click', event =>{
    displayValue = displayValue.substring(0, displayValue.length -1);
    display.innerText = displayValue;
    checkDecimal();
});


function parse(){
    let operands = displayValue.split(/[+\-/x]/);
    let operator =  displayValue.match(/[+\-/x]/);

    if(operator.toString() == '/' && operands[1] == 0)
    {   
        display.style.fontSize = "large";
        display.innerText = "You divided by zero and The Universe might explode";
        displayValue = "";
    }
    else
    {
        displayValue = operate(operands[0], operands[1], operator);
        display.innerText = displayValue.toString();
        display.style.fontSize = "70px";
        checkDecimal();
    }
}


function operate(num1, num2, operator){
    let answer;
    switch(operator.toString()){
        case "+" :
            answer =  add(num1,num2);
            break;
        case "-" :
            answer =  subtract(num1,num2);
            break;
        case "x" :
            answer = multiply(num1,num2);
            break;
        case "/" :
            answer = divide(num1,num2);
            break;
                
    }
    return Math.round((answer + Number.EPSILON) * 100) / 100;

}
function add (num1, num2) {
        return +num1 + +num2;
    }

function subtract (num1, num2) {
    return +num1 - +num2;
    }
function multiply (num1, num2) {
        return +num1 * +num2;
    }

function divide (num1, num2) {
    return +num1 / +num2;
    }

function createBtns(){
    // container.style.setProperty('--grid-rows', 4);
    // container.style.setProperty('--grid-cols', 4);

    for (i = 0; i < 12; i++) 
    {
        let cell = document.createElement("button");
        cell.className = 'digitBtn';
        cell.setAttribute("id",`btn${i}`);
        //cell.innerHTML = i;
        digitBtns.appendChild(cell);
    }
    document.getElementById('btn11').className = "equalsBtn";
    document.querySelectorAll('.digitBtn').forEach(element => {
        element.addEventListener('click',event =>{
            displayValue += element.innerHTML;
            display.innerText = displayValue;
            display.style.fontSize = "70px";
            checkDecimal();
        })
        
      });
       
    }
  

function hideElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.style.border= "hidden";
    element.style.backgroundColor = "inherit";
}

function checkDecimal(){
    let dotRegX = /\./;
    if(dotRegX.test(displayValue))
    {
        decimalBtn.disabled = true;
    }
    else 
    {
        decimalBtn.disabled = false;
    }

}
