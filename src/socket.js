import io from "socket.io-client";

let socket;
const ENDPOINT = "localhost:5000";
socket = io(ENDPOINT);

export default socket;
