let currentTab: number = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function test(): void {
    console.log("test");
}

// Set n to a number
function showTab(n: number): void {
    // This function will display the specified tab of the form...
    const x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    x[n].style.display = "block";

    // ... and fix the Previous/Next buttons:
    if (n === 0) {
        (document.getElementById("prevBtn") as HTMLElement).style.display = "none";
    } else {
        (document.getElementById("prevBtn") as HTMLElement).style.display = "inline";
    }

    if (n === (x.length - 1)) {
        (document.getElementById("nextBtn") as HTMLElement).innerHTML = "Submit";
    } else {
        (document.getElementById("nextBtn") as HTMLElement).innerHTML = "Next";
    }

    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n);
}

function nextPrev(n: number): boolean {
    // This function will figure out which tab to display
    const x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;

    // Exit the function if any field in the current tab is invalid:
    if (n === 1 && !validateForm()) {
        return false;
    }

    // Hide the current tab:
    x[currentTab].style.display = "none";

    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // If you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        (document.getElementById("regForm") as HTMLFormElement).submit();
        return false;
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
        if (y[i].value === "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        (document.getElementsByClassName("step")[currentTab] as HTMLElement).className += " finish";
    }

    return valid; // return the valid status
}

function fixStepIndicator(n: number): void {
    // This function removes the "active" class of all steps...
    let i: number, x: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("step") as HTMLCollectionOf<HTMLElement>;

    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }

    // ... and adds the "active" class to the current step:
    x[n].className += " active";
}
