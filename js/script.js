 /* Global vairables */

//Basic info.
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");

const nameValidator = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/;
const emailValidator = /^[^@]+@[^@.]+\.[a-z]+$/i;

const userJobSelection = document.querySelector("#title");

const otherJobRole = document.querySelector(".other-job-role");

// T-shirt info.
// const tshirtSelection = document.querySelector(".shirt-designs");
const color = document.querySelector("#color");
const design = document.querySelector("#design");

// Registrar activity
const activities = document.querySelector(".activities");
const activitiesBox = document.querySelectorAll(".activities-box input");

let  activitiesCost = document.querySelector(".activities-cost");
let TotalCost = 0;

// Payment info
const paymentMethod = document.querySelector(".payment-methods").children;

const payment = document.querySelector("#payment");
const paymentOptions = payment.children;

// Validation 
const activitiesTitle = activities.firstElementChild;
let activitiesHint = activities.lastElementChild;

let paymentSelection = " ";
let cardNumber = document.querySelector("#cc-num");
let zipCode = document.querySelector("#zip");
let cvvNumber = document.querySelector("#cvv");

const submit = document.querySelector("form");

/*
    =================================================
    Auto loader function
    =================================================
*/

// Excutes when browser gets loaded and places focus on name Inut filed, 
// Hidds other job role input field.
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

/*
    ====================================================
    Resuable functions 
    ====================================================
*/

// switches the user selection on design.
const Switcher = (selected) => {

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

// unhides Error Hint messages after submition button clicked.
const showError = (input)=> {
    input.parentElement.className = "not-valid";
    let givenHintMessage = input.nextElementSibling;
    givenHintMessage.style.display = "block";
}

/* 
    =====================================================
    Basic Information Validator
    =====================================================
*/
const UserNameValidator = (element)=> {

    let result = false;
    // let targetName  = element.name;
    // let targetParent = element.parentElement.parentElement.parentElement;

    let hintMessage = element.nextElementSibling;
    let nameIsValid = nameValidator.test(element.value);

    if (nameIsValid) {
        // validationFailHint(inputName);  
        result = true;
        element.parentElement.className = "valid";
        hintMessage.style.display = "none";

        return result;
        
    } else {
        return result;
    }
}

const UserEmailValidator = (element)=> {
    let result = false;
    // let targetName  = element.name;
    // let targetParent = element.parentElement.parentElement.parentElement;
    let emailIsValid =  emailValidator.test(element.value);
    let hintMessage = element.nextElementSibling;

    if ( emailIsValid) {
        result = true;
        element.parentElement.className = "valid";
        hintMessage.style.display = "none";  
        return result;

    } else {

        return result;

    }

}

/*
    ======================================================
    Color theme Selection Validator
    ======================================================
*/
design.addEventListener("change", (event)=> {

    let userSelection = event.target;
    if (userSelection.name === "user-design") {

        color.disabled = false;
        // records user selected value.
        let selectedTheme = userSelection.value;
        for(let i = 1; i < color.length; i++) {
            color[i].style.display = "block";
            let theColorTheme = color[i].getAttribute('data-theme');
            if(selectedTheme !== theColorTheme) {
                color[i].style.display = "none";
            }
        }
        color[0].selected = 'selected';
    }
}); 

/* 
    ===================================================================
        Activity validator
        checks if the atleast one of the activity box was been selected 
        and .. alerts according to response of the logic
    ==================================================================
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

            if( targetDate === currentTargetDate ) {
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
    ===========================================================
        Cridit Card Validator
    
        This helper function that accepts one paramenter and 
        descides if the cridit card entered values are valid using 
        The cardNo parameter. 
    =============================================================
*/

const CardValidator = (userInput)=> {
    let result = false;

    let minCardNumber = 13;
    let maxCardNumber = 16;

    let userInputValue = userInput.value;
    let cardNumberLength = userInputValue.length;
    let targetLabel = userInput.nextElementSibling;
    
    if (  !isNaN(userInputValue) && (cardNumberLength >= minCardNumber && cardNumberLength <= maxCardNumber) ) {
        userInput.parentElement.className = "valid";
        targetLabel.style.display = "none";

        result = true;
    }else {
        showError(userInput);
    }


    return result;
}

/* 
    accepts one parameter, validates Zipcode user Entery . 
*/

const zipValidator = (zipCode)=> {
    let result = false;
    let enteredZipNumber = zipCode.value;
    let targetLabel = zipCode.nextElementSibling;

    if(!isNaN(enteredZipNumber) && (enteredZipNumber.length === 5) ) {
        zipCode.parentElement.className = "valid";
        targetLabel.style.display = "none";
        result = true;
    }else {
        showError(zipCode);
    }
   
    return result;
}

/* 
    accepts one parameter and validates cvv user Entery.
*/

const cvvValidator = (cvvCode)=> {
    let result = false;
    let enteredCvvNumber = cvvCode.value;
    let targetLabel = cvvCode.nextElementSibling;

    if(!isNaN(enteredCvvNumber) && (enteredCvvNumber.length === 3) ) {
        cvvCode.parentElement.className = "valid";
        targetLabel.style.display = "none";

        result = true;
    }else {
        showError(cvvCode);
    }

    return result;
}  

/*
    ===========================================
       Form Accessiblity 
    ===========================================
*/

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

/*
    ============================================
        User event listeners

        listens the any change that user does on 
        the input fields and auto validates 
    ============================================
*/

submit.addEventListener("click", (event)=> {

    let userTarget  = event.target;

    if(userTarget.name === "user-title") {

       let userSelected = userTarget.value;
       if(userSelected === "other") {
           otherJobRole.style.display = 'block';
        } else {
            otherJobRole.style.display = 'none';
        }

    } else if(userTarget.type === "checkbox") {
        
        activityValidator(userTarget);

    } else if(userTarget.name === "user-payment") {
       Switcher(userTarget);
   } 
});


/*
    =============================================
    Calls when browser loads by defualt
    =============================================
*/


autoLoad(); 

/*
    ================================================
    Validation button.
    ================================================
*/

// Fires the form opon clicked the submtting botton.
submit.addEventListener('submit', (event)=> {
   
    //validates user
    if(inputName.value != "" && UserNameValidator(inputName)) {
        UserNameValidator(inputName);
    } else {
        showError(inputName);
        event.preventDefault();
    }

    // // Email Validator.
    if( inputEmail.value != "" &&  UserEmailValidator(inputEmail)) {
        UserEmailValidator(inputEmail);
    }else {
        showError(inputEmail);
        event.preventDefault();
    }

    // // //activity validator.
    if (TotalCost !=  0 ) {
        activitiesTitle.style.color = "#000";
        activitiesHint.style.display = "none";
    } else {
        activitiesTitle.style.color = "red";
        activitiesHint.style.display = "block";
        event.preventDefault();
    }

    // // Payments Validator
    if (payment.value == "credit-card") {

        // Validates user entered card numbers
        if(cardNumber == "" || !CardValidator(cardNumber) ) {
            showError(cardNumber);
            event.preventDefault();
        } else {
            CardValidator(cardNumber);
          
        }

        // Validates user entered zipcode number
        if( zipCode.value == "" || !zipValidator(zipCode)) {
            showError(zipCode);
            event.preventDefault();
        } else {
            zipValidator(zipCode);
        }

        // Validates user entered cvv numbers
        if(cvvNumber.value == "" || !cvvValidator(cvvNumber) ) {
            showError(cvvNumber);
            event.preventDefault();
        } else {
            cvvValidator(cvvNumber);
        }
    }
});
