import { cow } from "../../constants.js";
                class Animal extends _Entity_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
                    constructor({
                        sid,
                        index,
                        x,
                        y,
                        dir
                    }) {
                        super({
                            sid
                        })
                        const {
                            CowUtils
                        } = window
                        let data = cow.items.aiTypes[index]
                        if (!data) data = {}
                        this.sid = sid
                        this.x = x
                        this.y = y
                        this.name = data.name || data.src
                        this.startX = data?.fixedSpawn ? x : null
                        this.startY = data?.fixedSpawn ? y : null
                        this.xVel = 0
                        this.yVel = 0
                        this.zIndex = 0
                        this.dir = CowUtils.fixAngle(dir)
                        this.dirPlus = 0
                        this.index = index
                        this.src = data.src
                        this.weightM = data.weightM
                        this.speed = data.speed
                        this.killScore = data.killScore
                        this.turnSpeed = data.turnSpeed
                        this.scale = data.scale
                        this.maxHealth = data.health
                        this.leapForce = data.leapForce
                        this.health = this.maxHealth
                        this.chargePlayer = data.chargePlayer
                        this.viewRange = data.viewRange
                        this.drop = data.drop
                        this.dmg = data.dmg
                        this.hostile = data.hostile
                        this.dontRun = data.dontRun
                        this.hitRange = data.hitRange
                        this.hitDelay = data.hitDelay
                        this.hitScare = data.hitScare
                        this.spriteMlt = data.spriteMlt
                        this.nameScale = data.nameScale
                        this.colDmg = data.colDmg
                        this.noTrap = data.noTrap
                        this.spawnDelay = data.spawnDelay
                        this.hitWait = 0
                        this.waitCount = 1000
                        this.moveCount = 0
                        this.targetDir = 0
                        this.runFrom = null
                        this.chargeTarget = null
                        this.dmgOverTime = {}
                        this.visible = true
                    }
                    disable() {
                        this.visible = false
                    }
                    setTickData(data) {
                        const time = Date.now()
                        this.index = data[1]
                        this.time1 = (this.time2 === undefined) ? time : this.time2
                        this.time2 = time
                        this.x1 = this.x
                        this.y1 = this.y
                        this.x2 = data[2]
                        this.y2 = data[3]
                        this.dir1 = (this.dir2 === undefined) ? data[4] : this.dir2
                        this.dir2 = data[4]
                        this.dir = this.dir2
                        this.health = data[5]
                        this.dt = 0
                        this.visible = true
                    }
                }
                
export default Animal;
/***/
