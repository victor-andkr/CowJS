import encode from "./lib/msgpack/encode.js";
import decode from "./lib/msgpack/decode.js";
import { codec, socket } from "./constants.js";
import CowUtils from "./utils/CowUtils.js";

function initCodec() {
  codec.encoder = { encode };
  codec.decoder = { decode };
  codec.isReady = true;
}

/**
 * Optional: reuse game's msgpack ExtensionCodec if exposed on a global hook.
 * Primary path uses bundled msgpack (same wire format as assets-eb87bff7.js).
 */
function tryHookExtensionCodec() {
  CowUtils.createHook({
    property: "extensionCodec",
    setter(instance) {
      if (typeof codec.encoder !== "undefined" && codec.encoder.encode) {
        codec.decoder = { decode: (buf) => instance.decode(buf) };
        codec.isReady = true;
        return;
      }
      codec.encoder = { encode: (data) => instance.encode(data) };
    },
  });
}

initCodec();
tryHookExtensionCodec();

const nativeSend = WebSocket.prototype.send;

WebSocket.prototype.send = new Proxy(nativeSend, {
  apply(target, ws, args) {
    if (!socket.isCreated && isGameSocket(ws)) {
      socket.setWebSocket(ws);
    }
    return Reflect.apply(target, ws, args);
  },
});

const messageDescriptor = Object.getOwnPropertyDescriptor(
  WebSocket.prototype,
  "onmessage"
);

if (messageDescriptor?.set) {
  const nativeSet = messageDescriptor.set;
  Object.defineProperty(WebSocket.prototype, "onmessage", {
    configurable: true,
    enumerable: true,
    get: messageDescriptor.get,
    set(callback) {
      nativeSet.call(this, function (event) {
        if (socket.websocket === this && codec.isReady) {
          dispatchToCow(event);
        }
        if (typeof callback === "function") {
          callback.call(this, event);
        }
      });
    },
  });
}

function isGameSocket(ws) {
  if (!(ws instanceof WebSocket)) return false;
  const url = ws.url || "";
  return /moomoo\.io/i.test(url) || url.includes("localhost:3000");
}

function dispatchToCow(event) {
  const data = event.data;
  if (!(data instanceof ArrayBuffer)) return;
  try {
    const binary = new Uint8Array(data);
    const decoded = codec.decoder.decode(binary);
    if (!Array.isArray(decoded) || decoded.length < 1) return;
    const type = decoded[0];
    const content = decoded[1] ?? [];
    socket.handler.dispatchPacket(type, ...(Array.isArray(content) ? content : [content]));
  } catch (_) {
    /* game handler still runs via original onmessage */
  }
}
