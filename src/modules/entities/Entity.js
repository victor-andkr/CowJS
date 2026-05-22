import { cow } from "../../constants.js";
                class Entity {
                    constructor({
                        id,
                        sid
                    }) {
                        this.id = id
                        this.sid = sid
                        this.name = "unknown"
                        this.dt = 0
                        this.x = 0
                        this.y = 0
                        this.x1 = this.x
                        this.y1 = this.y
                        this.x2 = this.x1
                        this.y2 = this.y1
                        this.dir = 0
                        this.dir1 = 0
                        this.dir2 = this.dir1
                        this.health = 100
                        this.maxHealth = this.health
                        this.scale = 35
                        this.zIndex = 0
                    }
                    get renderX() {
                        return this.x - cow.camera.xOffset
                    }
                    get renderY() {
                        return this.y - cow.camera.yOffset
                    }
                    setInitData(data) {
                        if (!Array.isArray(data) || !data?.length) return
                        this.id = data[0]
                        this.sid = data[1]
                        this.name = data[2]
                        this.x = data[3]
                        this.y = data[4]
                        this.dir = data[5]
                        this.health = data[6]
                        this.maxHealth = data[7]
                        this.scale = data[8]
                        if (typeof data[9] !== 'undefined') {
                            this.skinColor = data[9]
                        }
                        this.visible = false
                    }
                    setTo(x, y) {
                        if (typeof x !== 'number' || typeof y !== 'number') return
                        if (isNaN(x) || isNaN(y)) return
                        this.x = x
                        this.y = y
                    }
                }
                
export default Entity;
/***/
