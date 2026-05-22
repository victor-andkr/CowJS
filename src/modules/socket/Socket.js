import { codec } from "../../constants.js";
import Handler from "./Handler.js";
import Manager from "./Manager.js";

export default class Socket {
  constructor() {
    this.websocket = undefined;
    /** @type {number|undefined} io-init connection id from server */
    this.ioSocketId = undefined;
    /** @type {number|undefined} yourSID from setupGame (C) — use for leaderboard / isMe */
    this.playerSid = undefined;
    this.handler = new Handler({ socket: this });
    this.manager = new Manager({ socket: this });
  }

  get isCreated() {
    return typeof this.websocket !== "undefined";
  }

  get isReady() {
    return this.websocket?.readyState === 1;
  }

  send(type, content) {
    if (!this.isReady || !codec.isReady) return;
    const args = Array.isArray(content) ? content : [content];
    const encoded = codec.encoder.encode([type, args]);
    this.websocket.send(encoded);
  }

  onEvent(eventKey, listener) {
    if (!this.isCreated) return;
    if (eventKey.startsWith("on")) {
      this.websocket[eventKey] = listener;
      return;
    }
    this.websocket.addEventListener(eventKey, listener);
  }

  setIoSocketId(id) {
    if (typeof id === "number") this.ioSocketId = id;
  }

  /** @deprecated use setPlayerSid — setupGame passes yourSID, not io-init id */
  setSocketId(id) {
    this.setPlayerSid(id);
  }

  setPlayerSid(sid) {
    if (typeof sid === "number") this.playerSid = sid;
  }

  setWebSocket(ws) {
    if (!codec.isReady) return;
    if (this.websocket instanceof WebSocket) return;
    if (!(ws instanceof WebSocket)) return;
    const url = ws.url || "";
    if (!/moomoo\.io/i.test(url) && !url.includes("localhost:3000")) return;
    this.websocket = ws;
    this.manager.trigger("set-websocket");
  }
}
