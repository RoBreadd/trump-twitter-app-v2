import { io } from "socket.io-client";

class SocketioService {
  constructor() {
    this.socket;
  }

  setupSocketConnection() {
    this.socket = io("http://localhost:5000");
  }
}

export default new SocketioService();
