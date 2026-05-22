import { cow } from "../../../../constants.js";
                function updateHealth(sid, value) {
                    const player = cow.playersManager.getById(sid)
                    if (!player) return
                    player.changeHealth(value)
                }
                
export default updateHealth;
/***/
