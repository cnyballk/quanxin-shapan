class WebSocketClient {
  ws: WebSocket;
  url: string;
  reconnectAttempts = 1000;
  reconnectIng = true;
  listenFn = [];
  initFn = () => {};
  init: boolean;
  constructor(config?) {
    this.url = config?.url || window.location.hostname + ":8070";
    this.initComfyUISocket();
  }
  initComfyUISocket = () => {
    this.ws = new WebSocket(`ws://${this.url}`);
    this.reconnectIng = false;
    this.ws.addEventListener("open", () => {
      console.log(`websocket连接成功`);
      if (!this.init) {
        this.initFn();
      }
      this.init = true;
      this.startListen();
    });
    this.ws.addEventListener("error", () => {
      if (!this.reconnectIng) {
        this.reconnectIng = true;
        console.log(`websocket连接错误，将在${this.reconnectAttempts}毫秒后重连`);
        setTimeout(this.initComfyUISocket, this.reconnectAttempts);
      }
    });
    this.ws.addEventListener("close", () => {
      if (!this.reconnectIng) {
        this.reconnectIng = true;
        console.log(`websocket连接已关闭，将在${this.reconnectAttempts}毫秒后重连`);
        setTimeout(this.initComfyUISocket, this.reconnectAttempts);
      }
    });
  };
  on = (listen: Function) => {
    this.listenFn.push(listen);
  };
  startListen = () => {
    this.ws.addEventListener("message", (msg) => {
      this.listenFn.map((fn) => fn(msg));
    });
  };
  send = (data) => {
    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(data));
    }
  };
}
const webSocketClientInstance = new WebSocketClient();
export { webSocketClientInstance };
