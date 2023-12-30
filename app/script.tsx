import axios from "axios";
const response = async () => {
    console.log("logoutbgudsobgoa");
    const logout = await axios.get('/api/auth/logout');
    console.log("Messaggio logout: " + logout.data.message);
    window.location.href = "/";
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