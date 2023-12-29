export let currentTab: number = 0; // Current tab is set to be the first tab (0)

export function showTab(n: number): void {
    const x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    if (x[n]) {
        x[n].style.display = "block";
    }

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
}

export function nextPrev(n: number): boolean {
    const x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    if (currentTab >= x.length-1 && n==1) {
        if(!validateForm()){
            return false;
        }else{
            return true;
        }
    }
    else if ((validateForm() && n==1) || n==-1) {
        x[currentTab].style.display = "none"; 
        currentTab = currentTab + n;
    }
    showTab(currentTab);
    return true;
}

function validateForm(): boolean {
    let x: HTMLCollectionOf<HTMLElement>, y: HTMLCollectionOf<HTMLInputElement>, i: number, valid: boolean = true;
    x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    y = x[currentTab].getElementsByTagName("input") as HTMLCollectionOf<HTMLInputElement>;
    for (i = 0; i < y.length; i++) {
        if (y[i].value === "" ) {
            valid = false;
        }
    }
    return valid;
}

export function handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const input= event.currentTarget;
    if (input.value === "" ||input.value.length < 3) {
        if(!input.className.endsWith("invalid")){
            input.className += " invalid";
        }        
    }else {
        input.className = input.className.replace("invalid", "");
    }
}