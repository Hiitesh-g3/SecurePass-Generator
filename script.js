var initial = 8;
var checkCount = 1;
var password = "";
var uprcase = document.querySelector("#uppercase");
var symbols = "~!@#$%^&*()_+={[}]|\:;'`<,>.?/" ;
var copyBtn = document.querySelector(".copyBtn");
var slider = document.querySelector(".slider");
var passwordLengthField = document.querySelector("[data-lengthNumber]");
var copyText = document.querySelector("#input");
var uprcsechkbox = document.querySelector("#uppercase");
var lwrcsechkbox = document.querySelector("#lowercase");
var symchkbox = document.querySelector("#symbols");
var numchkbox = document.querySelector("#numbers");
var strengthIndicator = document.querySelector(".strength-indicator");
var checkboxes = document.querySelectorAll(".checkbox");
var generatebtn = document.querySelector(".generate-btn");


var passwordLength;
// slider // 
function handleSlider(){
    passwordLength = slider.value;
    passwordLengthField.textContent = passwordLength;

}
slider.value = initial;
passwordLengthField.textContent = slider.value;
passwordLength = slider.value;
slider.addEventListener("input", ()=>{
    // console.log(event.target.value);
    handleSlider();
});

uprcase.checked = true;

function getRndInt(min,max){
    return Math.floor(Math.random()*(max-min)) + min ;
}

function generateUpperCase(){
    return String.fromCharCode(getRndInt(65,91));
}

function generateLowerCase(){
    return generateUpperCase().toLowerCase() ;
}

function generateSymbol(){
    var rndSym = getRndInt(0,symbols.length);
    return symbols[rndSym] ;
}

function generateNumber(){
    return getRndInt(0,10);
}

function setIndicator(color){
    strengthIndicator.style.backgroundColor = color;
}

function handleCheckboxes(){
    checkCount = 0 ;
    checkboxes.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
            
        }
    })

    if(checkCount>passwordLength){
        console.log(passwordLength , checkCount);
        passwordLength = checkCount;
        // handleSlider();
        // slider.value = checkCount;
        // passwordLengthField = checkCount;
    }
    // console.log(checkCount);
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change',() => {
        handleCheckboxes();
    })
})



async function copyContent(){

    try{
        copyText.select();
    await navigator.clipboard.writeText(copyText.value);

    copyText.classList.add("active");

    setTimeout(()=>{
        copyText.classList.remove("active");
    },2000);
    }
    catch(e){
        alert("error while copying");
    }
    
};

copyBtn.addEventListener("click",() => {
    console.log("clicked");
    
        console.log(copyText.textContent);
        copyContent();

    
});

function shufflePassword(array) {
    for (let i = array.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let k = array[i];
      array[i] = array[j];
      array[j] = k;
    }
    let str = "";
    array.forEach((el)=>{str += el});
    return str;
    // document.getElementById("demo").innerHTML = points;
  }

function strengthChecker(){
    lwrcsechkbox.checked = false ;
    uprcsechkbox.checked = false ;
    symchkbox.checked = false ;
    numchkbox.checked = false ;

    if(lwrcsechkbox.checked)
        lwrcsechkbox.checked = true ;
    if(uprcsechkbox.checked)
        lwrcsechkbox.checked = true ;
    if(symchkbox.checked)
        lwrcsechkbox.checked = true ;
    if(numchkbox.checked)
        lwrcsechkbox.checked = true ;

    if(lwrcsechkbox && uprcsechkbox && (symchkbox || numchkbox) && passwordLength>8 ){
        setIndicator("green");
    }
    else if(lwrcsechkbox && uprcsechkbox && passwordLength>8) {
        setIndicator("orange");
    }
    else if(lwrcsechkbox && passwordLength>8){
        setIndicator("yellow");
    }else{
        setIndicator("red");
    }

}

// console.log(passwordLength);

function generatePassword(){
    
    let fun = [];

    // console.log("hello");
    if(checkCount<=0){
        return ;
    }

    if(checkCount < passwordLength){
        passwordLength = checkCount ;
        handleSlider();
    }

    if(uprcsechkbox.checked){
        fun.push(generateUpperCase);
    }
    
    if(lwrcsechkbox.checked){
        fun.push(generateLowerCase);
    }

    if(symchkbox.checked){
        fun.push(generateSymbol);
    }

    if(numchkbox.checked){
        fun.push(generateNumber);
    }

    // console.log("hello2");
    // console.log(fun[0]);

    password = "" ;

    for(var i=0 ;i<fun.length;i++){
        password = password+fun[i]() ;
        // console.log(fun[i]);
        // console.log(typeof fun[i]);

    } 
    // console.log(passwordLength);
    for(var j=0 ;j<passwordLength-fun.length;j++){
        let randIdx = getRndInt(0,fun.length);
        // console.log(randIdx);
        password = password + fun[randIdx]();
    }

    password = shufflePassword(Array.from(password));

    copyText.value = password ;
    // console.log(password);

    strengthChecker();

}

generatebtn.addEventListener('click' , () => {
    generatePassword();
})





