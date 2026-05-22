import { socket } from "../../../../constants.js";

/** setupGame(yourSID) — jeu appelle u1(e) → pr.playerSID */
export default function setupGame(yourSID) {
  socket.setPlayerSid(yourSID);
}
