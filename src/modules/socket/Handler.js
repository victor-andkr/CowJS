import { cow } from "../../constants.js";
import getEvents from "./events/getEvents.js";
import config from "../../config.json";

const S = config.designations.packets.server;

export default class Handler {
  static handlerKeys = {
    "socket-open": "onSocketOpen",
    "socket-message": "onSocketMessage",
    "socket-close": "onSocketClose",
  };

  constructor({ socket }) {
    this.socket = socket;
    this.packetsListeners = new Map();
    this.firstMessage = false;
  }

  onPacket(packetName, listener) {
    if (typeof packetName !== "string" || !(listener instanceof Function)) return;
    if (!this.packetsListeners.has(packetName)) {
      this.packetsListeners.set(packetName, new Map());
    }
    const listeners = this.packetsListeners.get(packetName);
    listeners.set(listeners.size + 1, listener);
  }

  dispatchPacket(type, ...content) {
    if (type === S.IO_INIT) {
      this.socket.setIoSocketId(content[0]);
      return;
    }
    this.packetsListeners.forEach((packetListeners, packetName) => {
      if (!packetListeners.size || packetName !== type) return;
      packetListeners.forEach((listener) => listener(...content));
    });
  }

  onSocketOpen() {}

  onSocketMessage(event) {
    if (!this.firstMessage) {
      const events = getEvents();
      for (const eventKey in events) {
        this.onPacket(eventKey, events[eventKey]);
      }
      this.firstMessage = true;
    }
    if (!(event.data instanceof ArrayBuffer) || !cow.codec.isReady) return;
    const decoded = cow.codec.decoder.decode(new Uint8Array(event.data));
    if (!decoded?.length) return;
    const type = decoded[0];
    const content = decoded[1] ?? [];
    this.dispatchPacket(type, ...(Array.isArray(content) ? content : [content]));
  }

  onSocketClose() {
    const { plugins } = cow.config.designations;
    cow.executePlugin(plugins.AUTO_RECONECT);
  }

  handle(handlerKey, event) {
    const listenerName = Handler.handlerKeys[handlerKey];
    const listener = this[listenerName];
    if (listener instanceof Function) listener.call(this, event);
  }
}
