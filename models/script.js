import { io } from "socket.io-client";
import { SOCKETPORT } from "../server";

const socket = io(SOCKETPORT); 