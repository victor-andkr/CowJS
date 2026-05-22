import config from "../config.json";
import { cow } from "../constants.js";

/**
 * Merge live window.config from assets-eb87bff7.js when available.
 * The local player is Cow.player — not window.me (closure-scoped in the game bundle).
 */
export function syncGameConfig() {
  const live = typeof window !== "undefined" ? window.config : null;
  if (!live || typeof live !== "object") return;

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
}
