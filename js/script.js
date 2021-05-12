/* Global vairables */

//basic info.
let inputName = document.querySelector("#name");
let userJobSelection = document.querySelector("#title");

let otherJobRole = document.querySelector(".other-job-role");

// T-shirt info.
const color = document.querySelector("#color");
const design = document.querySelector("#design");

// registrar activity
const activities = document.querySelector(".activities");
let  activitiesCost = document.querySelector(".activities-cost");
let TotalCost = 0;

//payment info
const paymentMethod = document.querySelector(".payment-methods").children;

const payment = document.querySelector("#payment");
const paymentOptions = payment.children;

// const creditCard = document.querySelector(".credit-card");
// const payPal = document.querySelector(".paypal");
// const BitCoin = document.querySelector(".bitcoin");


/* auto loader function*/

// excutes when browser gets loaded and places focus on name Inut filed, 
    //hidds other job role input field.

const autoLoad = ()=> {
    inputName.focus();
    otherJobRole.style.display = 'none';
    color.disabled = true;

    paymentSwitcher("credit-card"); 
}



/* Basic Info */
userJobSelection.addEventListener('change', (e)=> {
    let userSelected = e.target.value;
    if(userSelected === "other") {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});    


/* T - Shirt Info */

// switches the user selection on design.
const userSwitcher = (selectedTheme)=> {
    for(let i = 1; i< color.length; i++) {
        let theColor = color[i];
        let theColorTheme = theColor.getAttribute('data-theme');

       if(selectedTheme !== theColorTheme) {
        theColor.style.display = "none";
       }
    }    
}

design.addEventListener("change", (event)=> {
    color.disabled = false;
    //rests the colorOptions.
    for (let i = 1; i < color.length; i++) {
        let colorOptions = color[i];
        colorOptions.style.display = "block";
    }

    let selectedDesign = event.target;
    userSwitcher(selectedDesign.value);
});

/* "Register for Activities" section */

activities.addEventListener("change", (event)=> {
    let targetBox = event.target;
    let boxDataTheme = targetBox.getAttribute("data-cost");
    let costNumber = parseInt(boxDataTheme, 10);
    
    if (targetBox.checked) {
        TotalCost +=  costNumber;
    }else {
        TotalCost -= costNumber;
    }
    activitiesCost.innerHTML = `Total: ${TotalCost}`;
});
  
 
/* Payment Info */

const paymentSwitcher = (method)=>{
    for (let i = 1; i < paymentOptions.length; i++)  {

        let paymentOption = paymentOptions[i].value;
        if ( paymentOption.includes(method)) {
            paymentOptions[i].selected = "true";   
        }
    } 
    
    for(let i = 2; i < paymentMethod.length; i++) {
        let paymentClassName = paymentMethod[i].className
        paymentMethod[i].style.display = "block";
        if( !paymentClassName.includes(method)) {
            paymentMethod[i].style.display = "none";
        }
    }
}

payment.addEventListener("change", (event)=> {
    let selectedMethod = event.target;
    paymentSwitcher(selectedMethod.value)
});

//calls when browser loads by defualt
autoLoad();
