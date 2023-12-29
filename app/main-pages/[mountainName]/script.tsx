let toggle_sidebar = false;
export function scrollFunction() {
    let mybutton = document.getElementById("up-button");
    if (mybutton) {
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

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
    else {
        close_sidebar();
    }
}

export function close_sidebar() {
    (document.getElementById("refuges") as HTMLElement).style.marginLeft = "0";
    (document.getElementById("sidebar") as HTMLElement).style.width = "0";
    (document.getElementById("sidebar") as HTMLElement).style.display = "none";
    toggle_sidebar = !toggle_sidebar;
}

export let avg_rating = 0;
export function displayAddButton(register: boolean) {
    if (register) {
        (document.getElementById("add-refuge-btn") as HTMLElement).style.display = "block";
        (document.getElementById("up-button") as HTMLElement).style.bottom = "6.5rem";
    } else {
        (document.getElementById("add-refuge-btn") as HTMLElement).style.display = "none";
        (document.getElementById("up-button") as HTMLElement).style.bottom = "1rem";
    }
}

export function displayDeleteButton(admin: boolean) {
    if (admin) {
        Array.from((document.getElementsByClassName("delete-refuge-btn") as HTMLCollectionOf<HTMLElement>)).forEach((button) => {
            button.style.display = "block";
        });
    } else {
        Array.from((document.getElementsByClassName("delete-refuge-btn") as HTMLCollectionOf<HTMLElement>)).forEach((button) => {
            button.style.display = "none";
        });
    }
}

export function setRating(nStars: number) {
    avg_rating = nStars;
    (document.getElementById("add-refuge-rating") as HTMLInputElement).value = String(nStars);
    const stars = (document.getElementById("review")?.getElementsByClassName("fa fa-star") as HTMLCollectionOf<HTMLElement>);
    let n: number = 0;
    Array.from(stars).forEach((star) => {
        if (n < nStars) {
            star.className += " checked";
            n += (1);
        } else {
            star.className = "fa fa-star";
        }
    });
}