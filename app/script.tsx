import axios from "axios";
const response = () => {
    console.log("logout");
    axios.get('/api/auth/logout')};
export async function logout(){
    const currentUser = await axios.get('/api/auth/currentUser');
    if (currentUser.data.status == 200) {
        (document.getElementById("logout") as HTMLElement).style.display = "block";
        (document.getElementById("logout") as HTMLElement).onclick = response;
    } else {
        (document.getElementById("logout") as HTMLElement).style.display = "none";
    }
}