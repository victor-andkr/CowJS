import config from "../../../config.json";
import loadAI from "./animals/loadAI.js";
import addProjectile from "./game_object/addProjectile.js";
import killObject from "./game_object/killObject.js";
import killObjects from "./game_object/killObjects.js";
import loadGameObject from "./game_object/loadGameObject.js";
import wiggleGameObject from "./game_object/wiggleGameObject.js";
import addPlayer from "./player/addPlayer.js";
import gatherAnimation from "./player/gatherAnimation.js";
import killPlayer from "./player/killPlayer.js";
import removePlayer from "./player/removePlayer.js";
import updateHealth from "./player/updateHealth.js";
import updatePlayers from "./player/updatePlayers.js";
import updateItemCounts from "./stats/updateItemCounts.js";
import updateItems from "./stats/updateItems.js";
import updatePlayerValue from "./stats/updatePlayerValue.js";
import setupGame from "./system/setupGame.js";

const P = config.designations.packets.server;

export default function getEvents() {
  return {
    [P.SETUP_GAME]: setupGame,
    [P.ADD_PLAYER]: addPlayer,
    [P.KILL_PLAYER]: killPlayer,
    [P.REMOVE_PLAYER]: removePlayer,
    [P.UPDATE_PLAYERS]: updatePlayers,
    [P.UPDATE_ITEM_COUNTS]: updateItemCounts,
    [P.UPDATE_PLAYER_VALUE]: updatePlayerValue,
    [P.UPDATE_HEALTH]: updateHealth,
    [P.UPDATE_ITEMS]: updateItems,
    [P.GATHER_ANIMATION]: gatherAnimation,
    [P.ADD_PROJECTILE]: addProjectile,
    [P.LOAD_GAME_OBJECT]: loadGameObject,
    [P.KILL_OBJECT]: killObject,
    [P.KILL_OBJECTS]: killObjects,
    [P.WIGGLE_GAME_OBJECT]: wiggleGameObject,
    [P.LOAD_AI]: loadAI,
  };
}
