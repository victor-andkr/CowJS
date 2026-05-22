import { cow } from "../../constants.js";
                class Camera {
                    constructor() {
                        this.x = 0
                        this.y = 0
                        this.distance = 0
                        this.angle = 0
                        this.speed = 0
                        this.xOffset = 0
                        this.yOffset = 0
                    }
                    setTo(x, y) {
                        this.x = x
                        this.y = y
                    }
                    update() {
                        if (cow.player?.alive) {
                            const {
                                CowUtils
                            } = window
                            this.distance = CowUtils.getDistance(this, cow.player)
                            this.angle = CowUtils.getDirection(cow.player, this)
                            this.speed = Math.min(this.distance * .01 * cow.renderer.delta, this.distance)
                            if (this.distance > .05) {
                                this.x += this.speed * Math.cos(this.angle)
                                this.y += this.speed * Math.sin(this.angle)
                            } else {
                                this.setTo(
                                    cow.player.x,
                                    cow.player.y
                                )
                            }
                        } else {
                            this.setTo(
                                cow.config.mapScale / 2,
                                cow.config.mapScale / 2
                            )
                        }
                        this.xOffset = this.x - cow.config.maxScreenWidth / 2
                        this.yOffset = this.y - cow.config.maxScreenHeight / 2
                    }
                }
                
export default Camera;
/***/
