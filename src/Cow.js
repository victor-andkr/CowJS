import config from "./config.json";
import * as gameConstants from "./constants.js";
import Player from "./modules/entities/Player.js";
import { AutoReconect } from "./modules/plugins/index.js";
import * as items from "./game_configs/index.js";

export default class Cow {
  constructor() {
    this.config = config;
    this.items = items;
    this.codec = gameConstants.codec;
    this.socket = gameConstants.socket;
    this.playersManager = gameConstants.playersManager;
    this.objectsManager = gameConstants.objectsManager;
    this.animalsManager = gameConstants.animalsManager;
    this.ticker = gameConstants.ticker;
    this.camera = gameConstants.camera;
    this.renderer = gameConstants.renderer;
    this.input = gameConstants.input;
    this.placement = gameConstants.placement;
    this.player = void 0;
    this.inGame = false;
    this._plugins = new Map([["auto-reconect", new AutoReconect()]]);
  }

  setCodec(msgpack) {
    gameConstants.codec.encoder = { encode: msgpack.encode };
    gameConstants.codec.decoder = { decode: msgpack.decode };
    gameConstants.codec.isReady = true;
    this.codec = gameConstants.codec;
  }

  onPacket(packetName, listener) {
    this.socket.handler.onPacket(packetName, listener);
  }

  onKeyboard(keyName, listener, options) {
    return this.input.keyboard.on(keyName, listener, options);
  }

    /** Send a client packet (see config.designations.packets.client). */
    sendPacket(packetName, ...content) {
        this.socket.send(packetName, content);
    }

    get clientPackets() {
        return this.config.designations.packets.client;
    }

    get serverPackets() {
        return this.config.designations.packets.server;
    }

  placeItem(groupIndex, { angle } = {}, callback) {
    this.placement.placeItem(groupIndex, { angle }, callback);
  }

  addRender(renderKey, renderFunc) {
    this.renderer.addRender(renderKey, renderFunc);
  }

  setInGame(_inGame) {
    if (typeof _inGame !== "boolean") return;
    this._inGame = _inGame;
  }

  getNearPlayer(checkEnemy) {
    if (!this.player) return;
    const { CowUtils } = window;
    let players = this.playersManager.list;
    if (!checkEnemy) players = players.filter((player) => player.visible);
    if (checkEnemy) {
      players = players.filter((player) => !player.isAlly && player.visible);
    }
    return players.sort((a, b) => {
      a = CowUtils.getDistance(a, this.player);
      b = CowUtils.getDistance(b, this.player);
      return a - b;
    })[0];
  }

  getNearEnemy() {
    return this.getNearPlayer(true);
  }

  setPlayer(player) {
    this.camera.setTo(player.x, player.y);
    if (!(player instanceof Player) || typeof this.player !== "undefined") return;
    this.player = player;
  }

  setPluginState(pluginName, state) {
    if (!this._plugins.has(pluginName)) return;
    const plugin = this._plugins.get(pluginName);
    plugin.setActiveState(state);
  }

  executePlugin(pluginName) {
    if (!this._plugins.has(pluginName)) return;
    const plugin = this._plugins.get(pluginName);
    if (!plugin.isActiveState) return;
    plugin.execute();
  }
}
