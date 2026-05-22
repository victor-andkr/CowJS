import { cow } from "../../../../constants.js";
                function addProjectile(x, y, dir, range, speed, indx, layer, sid) {
                    const isTurret = range == 700 && speed == 1.5 && indx === 1
                    const {
                        CowUtils
                    } = window
                    const offset = 70
                    const position = {
                        x: indx == 1 ? x : x - offset * Math.cos(dir),
                        y: indx == 1 ? y : y - offset * Math.sin(dir),
                    }
                    const reloadType = isTurret ? "turret" : "secondary"
                    const nearPlayer = cow.playersManager.list
                    .filter((player) => player.visible && CowUtils.getDistance(position.x, position.y, player.x2, player.y2) <= player.scale)
                    .sort((a, b) => {
                        a = CowUtils.getDistance(position.x, position.y, a.x2, a.y2)
                        b = CowUtils.getDistance(position.x, position.y, b.x2, b.y2)

                        return a - b
                    })[0]

                    if (nearPlayer) {
                        nearPlayer.reloads[reloadType].clear()
                    }
                }
                
export default addProjectile;
/***/
