import axios from "axios";
const response = () => {
    console.log("logoutbgudsobgoa");
    const logout = axios.get('/api/auth/logout');
    console.log("MEssaggio logout: " + logout)
};
export async function logout() {
    const currentUser = await axios.get('/api/auth/currentUser');
    if (currentUser.data.status == 200) {
        console.log("logged");
        (document.getElementById("logout") as HTMLElement).style.display = "block";
        (document.getElementById("logout") as HTMLElement).onclick = response;
    } else {
        (document.getElementById("logout") as HTMLElement).style.display = "none";
    }
}