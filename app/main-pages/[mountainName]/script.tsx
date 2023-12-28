let toggle_sidebar = false;
export function scrollFunction() {
    let mybutton = document.getElementById("up-button");
    if (mybutton){
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

// When the user clicks on the button, scroll to the top of the document
export function topFunction() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}


export function open_sidebar() {
    if (!toggle_sidebar) {
    (document.getElementById("refuges") as HTMLElement).style.marginLeft = "20rem";
    (document.getElementById("sidebar") as HTMLElement).style.width = "20rem";
    (document.getElementById("sidebar") as HTMLElement).style.display = "block";
    toggle_sidebar = !toggle_sidebar;
    }
    else{
        close_sidebar();
    }
    
}
  
export function close_sidebar() {
    (document.getElementById("refuges") as HTMLElement).style.marginLeft = "0";
    (document.getElementById("sidebar") as HTMLElement).style.width = "0";
    (document.getElementById("sidebar") as HTMLElement).style.display = "none";
    toggle_sidebar = !toggle_sidebar;
}

