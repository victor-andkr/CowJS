export default class Manager {
  static triggerKeys = {
    "set-websocket": "onWebSocketSetted",
  };

  constructor({ socket }) {
    this.socket = socket;
  }

  onWebSocketSetted() {
    const { handler } = this.socket;
    this.socket.onEvent("open", handler.handle.bind(handler, "socket-open"));
    this.socket.onEvent("message", handler.handle.bind(handler, "socket-message"));
    this.socket.onEvent("close", handler.handle.bind(handler, "socket-close"));
  }

  trigger(triggerKey, ...props) {
    const listenerName = Manager.triggerKeys[triggerKey];
    const listener = this[listenerName];
    if (listener instanceof Function) listener.call(this, ...props);
  }
}
