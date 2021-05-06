


/* Basic Info */

let inputName = document.querySelector("#name");
let otherJobRole = document.querySelector(".other-job-role");

let userJobSelection = document.querySelector("#title");
/* excutes when browser gets loaded placed focus on name Inut filed, 
    and hidding other job role input field  */
    
const autoLoad = ()=> {
    inputName.focus();
    otherJobRole.style.display = 'none';
}
autoLoad();

userJobSelection.addEventListener('change', (e)=> {
    let userSelected = e.target.value;
    if(userSelected === "other") {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});    

/* T - Shirt Info */
const color = document.querySelector("#color");
color.disabled = true;

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

const design = document.querySelector("#design");
// let selectedOption = design.value

//
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

  const activities = document.querySelector(".activities");
  let  activitiesCost = document.querySelector(".activities-cost");
  
  let TotalCost = 0;

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
  
 

  

  