import { cow } from "../../../../constants.js";
                function removePlayer(id) {
                    if (cow.playersManager.players.size <= 1) return
                    const player = cow.playersManager.list.find((player) => player.id === id)
                    if (!player) return
                    cow.playersManager.removePlayer(player.sid)
                }
                
export default removePlayer;
/***/
