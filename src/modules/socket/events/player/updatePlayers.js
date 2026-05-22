import { cow } from "../../../../constants.js";
                function updatePlayers(content) {
                    cow.playersManager.updatePlayers(content)
                    cow.ticker.updateTicks()
                }
                
export default updatePlayers;
/***/
