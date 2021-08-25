 /* Global vairables */

//basic info.
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");

const nameValidator = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/;
const emailValidator = /^[^@]+@[^@.]+\.[a-z]+$/i;

const userJobSelection = document.querySelector("#title");

const otherJobRole = document.querySelector(".other-job-role");

// T-shirt info.
const color = document.querySelector("#color");
const design = document.querySelector("#design");

// registrar activity
const activities = document.querySelector(".activities");
const activitiesBox = document.querySelectorAll(".activities-box input");
let  activitiesCost = document.querySelector(".activities-cost");
let TotalCost = 0;

//payment info
const paymentMethod = document.querySelector(".payment-methods").children;

const payment = document.querySelector("#payment");
const paymentOptions = payment.children;

//validation 
const activitiesTitle = activities.firstElementChild;
let activitiesHint = activities.lastElementChild;

let paymentSelection = " ";
let cardNumber = document.querySelector("#cc-num");
let zipCode = document.querySelector("#zip");
let cvvNumber = document.querySelector("#cvv");

const submit = document.querySelector("form");

/* ==========================
    auto loader function
=============================*/

// excutes when browser gets loaded and places focus on name Inut filed, 
//hidds other job role input field.

const autoLoad = ()=> {

    //auto focuses name input fields s
    inputName.focus();

    // hides other job role options
    otherJobRole.style.display = 'none';

    //auto disables color options.
    color.disabled = true;
  
    // auto selects the credit card payments
    Switcher(payment[1]); 
}

/* =================================
    Resuable functions 
======================================*/

// switches the user selection on design.
const Switcher = (selected) => {

    if (selected.name === "user-design") {

        // records user selected value.
        let selectedTheme = selected.value;
        
        // sorts the colors and hides colors not match with user selection.
        for(let i = 1; i< color.length; i++) {
            
            let theColor = color[i];
            let theColorTheme = theColor.getAttribute('data-theme');
    
           if(selectedTheme !== theColorTheme) {
            theColor.style.display = "none";
           }

        }

    } else {

        let methodValue = selected.value;
        paymentSelection = methodValue;

        // selects payment options according user selected option.
        for (let i = 1; i < paymentOptions.length; i++) {
            let paymentOption = paymentOptions[i].value;
            if ( paymentOption.includes(methodValue)) {
                paymentOptions[i].selected = "true";   
            }
        } 

        // hides payment methods according to the user selection.
        for(let i = 2; i < paymentMethod.length; i++) {
    
            let paymentClassName = paymentMethod[i].className;
            paymentMethod[i].style.display = "block";
            if( !paymentClassName.includes(methodValue)) {
                paymentMethod[i].style.display = "none";
            }
    
        }
    }
   

}

// unhides Error Hint messages after submition button clicked.
const validationFailHint = (input)=> {
    input.parentElement.className = "not-valid";
    let givenHintMessage = input.nextElementSibling;
    givenHintMessage.style.display = "block";
}

// validates name, email and cridit card payment methods.
const userInputAutoSensing = (element)=> {

    let targetName  = element.name;
    let targetParent = element.parentElement.parentElement.parentElement;

    let hintMessage = element.nextElementSibling;

    if(targetName === "user-name" || targetName === "user-email") {

        let nameIsValid = nameValidator.test(element.value);
        let emailIsValid =  emailValidator.test(element.value);

        if (targetName === "user-name" && !nameIsValid) {

            hintMessage.innerHTML  = `${targetName} not valid .. can't contain a number.`;
            element.parentElement.className = "not-valid";
            hintMessage.style.display = "block";

        } else if (targetName === "user-email" && !emailIsValid) {

            hintMessage.innerHTML  = `${targetName} not valid.. Please, provide valid email format.`;
            hintMessage.style.display = "block";
            element.parentElement.className = "not-valid";
            
        }else {

            element.parentElement.className = "valid";
            hintMessage.style.display = "none";
        }

    } else if(targetParent.className === "credit-card-box") {
        if (targetName === "user-cc-num") {
            CardValidator(element);
        }else if(targetName === "user-zip") {
            zipValidator(element);
        } else if(targetName === "user-cvv") {
            cvvValidator(element);
        }
        
    }
}
/* 
    checks if the atleast one of the activity box was  been selected and ..
    alerts according to response of the logic.
*/

const activityValidator = (targetBox)=> {

    let currentTargetDate = targetBox.getAttribute("data-day-and-time");

    let boxDataTheme = targetBox.getAttribute("data-cost");
    let costNumber = parseInt(boxDataTheme, 10);
    
    if (targetBox.checked) {

        TotalCost +=  costNumber;
        activitiesHint.style.display = "none";
        activitiesTitle.style.color = "#000";

        for(let i = 1; i <activitiesBox.length; i++) 
        {
            let targetDate = activitiesBox[i].nextElementSibling.nextElementSibling.innerHTML;
            if(targetDate === currentTargetDate) {
                let targetInput = activitiesBox[i];
                targetInput.disabled = true;
                
                let boxElement = targetInput .parentElement;
                boxElement.className = "disabled";
            }
        }

        let targetLabel = targetBox.parentElement;
        targetLabel.classList.remove("disabled");
        targetBox.disabled = false;

    } else {
        for(let i = 1; i <activitiesBox.length; i++) 
        {
            let targetDate = activitiesBox[i].nextElementSibling.nextElementSibling.innerHTML;
            if(targetDate === currentTargetDate){

                let targetInput = activitiesBox[i];
                targetInput.disabled = false;

                let boxElement = targetInput.parentElement;
                boxElement.classList.remove("disabled");
            }
        }
        
        TotalCost -= costNumber;
        activitiesHint.style.display = "block";
    }
    
    // records the Total activity Costs.
    activitiesCost.innerHTML = `Total: ${TotalCost}`;
}

/*  
    This helper function that accepts one paramenter
     and descides if the cridit card entered values are valid using the cardNo paramete. 
*/

const CardValidator = (userInput)=> {
        let minCardNumber = 13;
        let maxCardNumber = 16;

        let userInputValue = userInput.value;
        let cardNumberLength = userInputValue.length;
        let targetLabel = userInput.nextElementSibling;
        
        if (  !isNaN(userInputValue) && (cardNumberLength >= minCardNumber && cardNumberLength <= maxCardNumber) ) {
            userInput.parentElement.className = "valid";
            targetLabel.style.display = "none";
        }else {
            validationFailHint(userInput);
        }
}

/* 
    accepts one parameter, validates Zipcode user Entery . 
*/

const zipValidator = (zipCode)=> {

    let enteredZipNumber = zipCode.value;
    let targetLabel = zipCode.nextElementSibling;

    if(!isNaN(enteredZipNumber) && (enteredZipNumber.length === 5) ) {
        zipCode.parentElement.className = "valid";
        targetLabel.style.display = "none";
    }else {
        validationFailHint(zipCode);
    }
   

}

/* 
    accepts one parameter and validates cvv user Entery.
*/

const cvvValidator = (cvvCode)=> {

    let enteredCvvNumber = cvvCode.value;
    let targetLabel = cvvCode.nextElementSibling;

    if(!isNaN(enteredCvvNumber) && (enteredCvvNumber.length === 3) ) {
        cvvCode.parentElement.className = "valid";
        targetLabel.style.display = "none";
    }else {
        validationFailHint(cvvCode);
    }
}  


/* ===================================
        Accessiblity 
    ==================================*/
   for(let i = 0; i < activitiesBox.length; i++) {

       activitiesBox[i].addEventListener("focus", (event)=> {
          
           let focusEvent = event.target;
           focusEvent.parentElement.className = "focus";
       });

       activitiesBox[i].addEventListener("blur", (event)=> {
           let blurEvent =  event.target;
           blurEvent.parentElement.className = "blur";
       });
   }

/* ===================================
    User event listeners

    listens the any change that user does on 
    the input fields and auto validates 
======================================*/

submit.addEventListener("click", (event)=> {

    let userTarget  = event.target;

    if ( userTarget.type === "text" || userTarget.type === "email") {

        userInputAutoSensing(userTarget);

    } else if(userTarget.name === "user-title") {

       let userSelected = userTarget.value;
       if(userSelected === "other") {
           otherJobRole.style.display = 'block';
        } else {
            otherJobRole.style.display = 'none';
        }

    } else if(userTarget.type === "checkbox") {
        
        activityValidator(userTarget);

    } else if (userTarget.name === "user-design") {

        color.disabled = false;
        //rests the colorOptions.
        for (let i = 1; i < color.length; i++) {
            color[i].style.display = "block";
        }

        Switcher(userTarget);

   } else if(userTarget.name === "user-payment") {
       Switcher(userTarget);
   } 
});



/* ===============================================
    calls when browser loads by defualt
============================================= */

autoLoad(); 

/*================================================= 
    Validation button.
==================================================*/

// Fires the form opon clicked the submtting botton.
submit.addEventListener('submit', (e)=> {
 

    if(color.disabled)  {
        e.preventDefault();
    } 

    // Name Validator.
    if (inputName.value !== "") {
        userInputAutoSensing(inputName);
    } else {
        validationFailHint(inputName);
        e.preventDefault();
    }

    // Email Validator.
    if( inputEmail.value !== "" ) {
        userInputAutoSensing(inputEmail);
    }else {
        validationFailHint(inputEmail);
        e.preventDefault();
    }

    //activity validator.
    if (TotalCost !=  0) {
        activitiesTitle.style.color = "#000";
        activitiesHint.style.display = "none";
    } else {
        activitiesTitle.style.color = "red";
        activitiesHint.style.display = "block";
        e.preventDefault();
    }

    // // Payments Validator 

    if(payment.value == "credit-card"){

        if(!CardValidator(cardNumber)) {
            e.preventDefault();
        }
    
        // zipValidator
        if(!zipValidator(zipCode)) {
            e.preventDefault();
        }

        // cvvValidator
        if (!cvvValidator(cvvNumber) ){
            e.preventDefault();
        }
    }
   
});

