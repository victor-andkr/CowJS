import { cow } from "../../../../constants.js";
                function gatherAnimation(sid, didHit, index) {
                    const player = cow.playersManager.getById(sid)
                    if (!player) return
                    player.onGather(didHit, index)
                }
                
export default gatherAnimation;
/***/
