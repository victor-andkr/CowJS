import { cow } from "../../../../constants.js";

export default function addPlayer(content, isYou) {
  cow.playersManager.addPlayer(content, isYou);
}
