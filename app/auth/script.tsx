export let currentTab: number = 0; // Current tab is set to be the first tab (0)


export function showTab(n: number): void {
    // This function will display the specified tab of the form...
    const x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    // Check if the element at index n exists before accessing its style property
    if (x[n]) {
        x[n].style.display = "block";
    }

    // ... and fix the Previous/Next buttons:
    const prevBtnElement = document.getElementById("prevBtn");
    if (prevBtnElement){
        if (n === 0) {
            prevBtnElement.style.display = "none";
        } else {
            prevBtnElement.style.display = "inline";
        }
    }
        

    if (n === (x.length - 1)) {
        const nextBtnElement = document.getElementById("nextBtn") ;
        if (nextBtnElement){
            nextBtnElement.innerHTML = "Submit";
            (nextBtnElement as HTMLButtonElement).type = "submit"; 
            
        }
        
    } else {
        const nextBtnElement = document.getElementById("nextBtn");
        if (nextBtnElement){
            nextBtnElement.innerHTML = "Next";
        }
    }

    // ... and run a function that displays the correct step indicator:
    
}

export function nextPrev(n: number): boolean {
    // This function will figure out which tab to display
    const x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    // Exit the function if any field in the current tab is invalid:

    // If you have reached the end of the form... :
    if (currentTab >= x.length-1 && n==1) {
        //...the form gets submitted:
        if(!validateForm()){
            console.log("form not valid");
            return false;
        }else{
            console.log("submitting form");
            return true;
        }
        
    }
    else if ((validateForm() && n==1) || n==-1) {
        x[currentTab].style.display = "none"; 
        currentTab = currentTab + n;
    }

    // Otherwise, display the correct tab:
    showTab(currentTab);

    return true;
}

function validateForm(): boolean {
    // This function deals with validation of the form fields
    let x: HTMLCollectionOf<HTMLElement>, y: HTMLCollectionOf<HTMLInputElement>, i: number, valid: boolean = true;
    x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    y = x[currentTab].getElementsByTagName("input") as HTMLCollectionOf<HTMLInputElement>;
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value === "" ) {
            valid = false;
        }
    }

    return valid; // return the valid status
}

export function handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const input= event.currentTarget; 
    console.log(input.className);
    if (input.value === "" ||input.value.length < 3) {
        // add an "invalid" class to the field:
        if(!input.className.endsWith("invalid")){
            input.className += " invalid";
        }
        // and set the current valid status to false:
        
    }else {
        console.log("removing invalid");
        input.className = input.className.replace("invalid", "");
    }
}