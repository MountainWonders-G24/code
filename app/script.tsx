import axios from "axios";
const response = () => {
    console.log("logoutbgudsobgoa");
    axios.get('@/app/api/auth/logout')};
export async function logout(){
    const currentUser = await axios.get('@/app/api/auth/currentUser');
    if (currentUser.data.status == 200) {
        console.log("logged");
        (document.getElementById("logout") as HTMLElement).style.display = "block";
        (document.getElementById("logout") as HTMLElement).onclick = response;
    } else {
        (document.getElementById("logout") as HTMLElement).style.display = "none";
    }
}