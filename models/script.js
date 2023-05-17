const { io } = require("socket.io-client");
const { SOCKETPORT } = require("../server");

const socket = io(SOCKETPORT);
