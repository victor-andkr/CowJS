import { socket } from "../../../../constants.js";

/** setupGame(yourSID) — same as assets-eb87bff7.js _d / deobfuscated setupGame */
export default function setupGame(yourSID) {
  socket.setPlayerSid(yourSID);
}
