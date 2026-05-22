import { cow } from "../constants.js";
import config from "../config.json";

const C = config.designations.packets.client;

export default class Placement {
  constructor() {
    this.delay = 0;
    this.lastPlaceTick = 0;
  }

  setDelay(_delay) {
    this.delay = _delay;
  }

  sendPlace(id, angle) {
    const timeSincePlace = cow.ticker.ticks - this.lastPlaceTick;
    if (timeSincePlace < this.delay) return;
    const oldWeapon = cow.player.weaponIndex;
    cow.sendPacket(C.SELECT_WEAPON, id, cow.player.weapons[Number(oldWeapon > 8)] ?? 0);
    cow.sendPacket(C.ATTACK_STATE, 1, angle);
    cow.sendPacket(C.ATTACK_STATE, 0, angle);
    cow.sendPacket(
      C.SELECT_WEAPON,
      cow.player.weapons[Number(oldWeapon > 8)] ?? 0,
      true
    );
    this.lastPlaceTick = cow.ticker.ticks;
  }

  placeItem(groupIndex, { angle } = {}, callback) {
    if (!cow.player?.alive) return;
    const itemIndex = cow.player.items[groupIndex];
    if (typeof itemIndex === "undefined") return;
    const item = cow.items.list[itemIndex];
    if (!cow.player.isCanBuild(item)) return;
    angle = typeof angle === "undefined" ? cow.player.lookAngle : angle;
    const scale = cow.player.scale + item.scale + (item.placeOffset || 0);
    const placeX = cow.player.x2 + scale * Math.cos(angle);
    const placeY = cow.player.y2 + scale * Math.sin(angle);
    const isCanPlace = cow.objectsManager.checkItemLocation(
      placeX,
      placeY,
      item.scale,
      0.6,
      item.id,
      false
    );
    if (!item.consume && !isCanPlace) return;
    this.sendPlace(item.id, angle);
    callback instanceof Function && callback();
  }
}
