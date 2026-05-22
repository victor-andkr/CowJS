import { cow } from "../../constants.js";
import Player from "../entities/Player.js";

export default class PlayersManager {
  constructor() {
    this.players = new Map();
    this.playersInStream = 0;
  }

  get list() {
    return [...this.players.values()];
  }

  getById(sid) {
    return this.players.get(sid);
  }

  each(callback) {
    this.players.forEach(callback);
  }

  eachVisible(callback) {
    this.each((player) => {
      if (!player.visible) return;
      callback(player);
    });
  }

  addPlayer(content, isYou) {
    if (!this.players.has(content[1])) {
      this.players.set(
        content[1],
        new Player({ id: content[0], sid: content[1] })
      );
    }
    const player = this.players.get(content[1]);
    player.visible = false;
    player.x2 = undefined;
    player.y2 = undefined;
    player.spawn();
    player.setInitData(content);
    if (isYou) cow.setPlayer(player);
  }

  removePlayer(sid) {
    if (!this.players.has(sid)) return;
    this.players.delete(sid);
  }

  updatePlayers(content) {
    const chunkSize = 13;
    this.playersInStream = 0;
    this.eachVisible((player) => player.disable());
    for (let i = 0; i < content.length; i += chunkSize) {
      const chunk = content.slice(i, i + chunkSize);
      if (!this.players.has(chunk[0])) continue;
      const player = this.players.get(chunk[0]);
      player.setTickData(chunk);
      this.playersInStream += 1;
    }
  }

  interpolate() {
    const { CowUtils } = window;
    const { renderer } = cow;
    const lastTime =
      renderer.nowUpdate - (1000 / (window.config?.serverUpdateRate || 9));
    this.eachVisible((player) => {
      player.dt += renderer.delta;
      const total = player.time2 - player.time1;
      const fraction = lastTime - player.time1;
      const ratio = total / fraction;
      const rate = 170;
      const tmpRate = Math.min(1.7, player.dt / rate);
      const xDif = player.x2 - player.x1;
      const yDif = player.y2 - player.y1;
      player.setTo(player.x1 + xDif * tmpRate, player.y1 + yDif * tmpRate);
      player.dir = CowUtils.lerpAngle(
        player.dir2,
        player.dir1,
        Math.min(1.2, ratio)
      );
    });
  }

  update() {
    this.interpolate();
    this.eachVisible((player) => {
      const reloadType = player.weaponIndex > 8 ? "secondary" : "primary";
      const currentReload = player.reloads[reloadType];
      if (
        player.weaponIndex === currentReload.id &&
        currentReload.count < currentReload.max
      ) {
        currentReload.date2 = Date.now();
      }
    });
  }
}
