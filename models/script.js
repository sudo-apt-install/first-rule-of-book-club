const { io } = require("socket.io-client");
const { SOCKETPORT } = require("../server");

const socket = io(SOCKETPORT);

const joinButton = document.getElementById('room');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const messageContainer = document.getElementById('message-container');
const form = document.getElementById('form');

// Global array to store messages
let messages = [];

form.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (message === "") return;
    messages.push(message); // Add message to the array
    displayMessages();

    messageInput.value = "";
});

joinButton.addEventListener("click", () => {
    const room = roomInput.value;
});

function displayMessages() {
    messageContainer.innerHTML = ""; // Clear the container

    for (const message of messages) {
        const div = document.createElement("div");
        div.textContent = message;
        messageContainer.appendChild(div);
    }
}
