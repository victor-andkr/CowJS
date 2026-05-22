import Cow from "./Cow.js";
import Placement from "./modules/Placement.js";
import Ticker from "./modules/Ticker.js";
import Input from "./modules/input/Input.js";
import AnimalsManager from "./modules/managers/AnimalsManager.js";
import ObjectsManager from "./modules/managers/ObjectsManager.js";
import PlayersManager from "./modules/managers/PlayersManager.js";
import Camera from "./modules/render/Camera.js";
import Renderer from "./modules/render/Renderer.js";
import Socket from "./modules/socket/Socket.js";

export const codec = {
  decoder: void 0,
  encoder: void 0,
  isReady: false,
};

export const socket = new Socket();
export const playersManager = new PlayersManager();
export const objectsManager = new ObjectsManager();
export const animalsManager = new AnimalsManager();
export const ticker = new Ticker();
export const camera = new Camera();
export const renderer = new Renderer();
export const input = new Input();
export const placement = new Placement();
export const cow = new Cow();
