import { cow } from "./constants.js";
import CowUtils from "./utils/CowUtils.js";
import { syncGameConfig } from "./lib/syncGameConfig.js";
import { stripRegion, parseServerQuery } from "./lib/vultr.js";
import "./hooks.js";

const watermark = setInterval(() => {
  const linksContainer = document.getElementById("linksContainer2");
  if (!linksContainer) return;
  const html = linksContainer.innerHTML;
  linksContainer.innerHTML = html.replace(
    /(v\d\.\d\.\d)/gi,
    `$1 </a> | <a href="#" target="_blank" class="menuLink" style="color: #9f1a1a">${cow.config.NAME}</a>`
  );
  clearInterval(watermark);
}, 30000);

setTimeout(() => clearInterval(watermark), 30000);

const configPoll = setInterval(() => {
  syncGameConfig();
  if (window.config) clearInterval(configPoll);
}, 500);
setTimeout(() => clearInterval(configPoll), 60000);

window.CowUtils = CowUtils;
window.Cow = cow;
window.CowJS = {
  stripRegion,
  parseServerQuery,
  syncGameConfig,
};
