import io from "socket.io-client"

const id_user = JSON.parse(localStorage.getItem('user_data'))?.id|| null

const auto_connect_option = Boolean(localStorage.getItem('isLogged')) || false
const URL_SOCKET = "https://chat-translate.azurewebsites.net/"

const socket = io(URL_SOCKET)

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket