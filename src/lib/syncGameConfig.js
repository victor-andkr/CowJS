import config from "../config.json";
import { cow } from "../constants.js";

/**
 * Merge live window.config when the game bundle exposes it.
 * index-CRtgW-HM.js (1.8.1) keeps config in closure (`const T`) — no window.config.
 * Embedded values in config.json already match the live client.
 */
export function syncGameConfig() {
  const live = typeof window !== "undefined" ? window.config : null;
  if (!live || typeof live !== "object") return false;

  const keys = [
    "maxScreenWidth",
    "maxScreenHeight",
    "mapScale",
    "riverWidth",
    "gatherAngle",
    "hitAngle",
    "shieldAngle",
    "gatherWiggle",
    "serverUpdateRate",
  ];

  for (const key of keys) {
    if (live[key] !== undefined) {
      cow.config[key] = live[key];
      config[key] = live[key];
    }
  }
  return true;
}
