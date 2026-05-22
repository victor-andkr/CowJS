import { cow } from "../../constants.js";
                class Player extends _Entity_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
                    constructor({
                        id,
                        sid
                    }) {
                        super({
                            id,
                            sid
                        })
                        this.skinColor = void 0
                        this.buildIndex = -1
                        this.weaponIndex = 0
                        this.weaponVariant = 0
                        this.team = ""
                        this.skinIndex = 0
                        this.tailIndex = 0
                        this.isLeader = false
                        this.iconIndex = 0
                        this.items = [0, 3, 6, 10]
                        this.weapons = [0]
                        this.skins = {}
                        this.tails = {}
                        const defineFreeCaps = (config, capType) => {
                            for (let i = 0; i < config.length; ++i) {
                                const cap = config[i]
                                if (cap.price > 0) continue
                                this[capType][cap.id] = true
                            }
                        }
                        defineFreeCaps(cow.items.hats, "skins")
                        defineFreeCaps(cow.items.accessories, "tails")
                        this.itemCounts = {}
                        this.gold = 100
                        this.stone = 100
                        this.wood = 100
                        this.food = 100
                        this.reloads = new _reloads_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
                        this.maxXP = 300
                        this.XP = 0
                        this.age = 1
                        this.kills = 0
                        this.upgrAge = 2
                        this.upgradePoints = 0
                        this.hitTime = null
                        this.shameCount = 0
                        this.shameTimer = 0
                        this.speed = 0
                        this.moveDir = 0
                        this.isPlayer = true
                        this.lastDeath = {}
                        this.createdInstance = {}
                        this._updateCreatedInstance()
                    }
                    get isMe() {
                        return Boolean(this.sid === cow.player?.sid && cow.player?.alive)
                    }
                    get isAlly() {
                        return Boolean((this.sid === cow.player?.sid) || (this.team && this.team === cow.player.team))
                    }
                    get weapon() {
                        return cow.items.weapons[this.weaponIndex]
                    }
                    get lookAngle() {
                        return this.isMe ? cow.input.mouse.angle : (this.dir || this.dir2)
                    }
                    get skin() {
                        return cow.items.hats.searchById(this.skinIndex)
                    }
                    get tail() {
                        return cow.items.accessories.searchById(this.tailIndex)
                    }
                    _updateCreatedInstance() {
                        this.createdInstance = {}
                        const ignoreKeys = ["skins", "tails", "sid", "id", "lastDeath", "reloads"]
                        for (const key in this) {
                            if (key === "createdInstance") continue
                            if (ignoreKeys.includes(key)) continue
                            this.createdInstance[key] = this[key]
                        }
                    }
                    spawn() {
                        this.alive = true
                        if (!this.isMe) return
                        for (const key in this.createdInstance) {
                            const value = this.createdInstance[key]
                            this[key] = value
                        }
                        this._updateCreatedInstance()
                        this.reloads = new _reloads_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
                        cow.setInGame(true)
                    }
                    kill() {
                        if (!this.isMe) return
                        this.alive = false
                        this.lastDeath = {
                            x: this.x,
                            y: this.y
                        }
                        cow.setInGame(false)
                    }
                    disable() {
                        this.visible = false
                    }
                    hasResources(item) {
                        for (let i = 0; i < item.req.length; i += 2) {
                            if (this[item.req[i]] >= Math.round(item.req[i + 1])) continue
                            return false
                        }
                        return true
                    }
                    isCanBuild(item) {
                        return this.hasResources(item)
                    }
                    setTickData(data) {
                        if (!Array.isArray(data) || !data?.length) return
                        const {
                            CowUtils
                        } = window
                        this.dt = 0
                        this.x1 = this.x
                        this.y1 = this.y
                        this.speed = CowUtils.getDistance(this.x2, this.y2, data[1], data[2])
                        this.x2 = data[1]
                        this.y2 = data[2]
                        this.moveDir = CowUtils.getDirection(this.x1, this.y1, this.x2, this.y2)
                        this.dir1 = this.dir2 !== null ? this.dir2 : data[3]
                        this.dir2 = data[3]
                        this.time1 = this.time2 !== null ? this.time2 : Date.now()
                        this.time2 = Date.now()
                        this.buildIndex = data[4]
                        this.weaponIndex = data[5]
                        this.weaponVariant = data[6]
                        this.team = data[7]
                        this.isLeader = data[8]
                        this.skinIndex = data[9]
                        this.tailIndex = data[10]
                        this.iconIndex = data[11]
                        this.zIndex = data[12]
                        this.visible = true
                        this.tick()
                    }
                    updateShame() {
                        const timeSinceHit = cow.ticker.ticks - this.hitTime
                        if (timeSinceHit < 2) {
                            this.shameCount += 1
                            if (this.shameCount >= 8) {
                                this.shameTimer = 30000
                                this.shameCount = 0
                            }
                        } else {
                            this.shameCount = Math.max(0, this.shameCount - 2)
                        }
                    }
                    changeHealth(_health) {
                        if (this.health < _health) {
                            this.updateShame()
                            this.hitTime = 0
                        } else {
                            this.hitTime = cow.ticker.ticks
                        }
                        this.health = _health
                    }
                    onGather(didHit, weaponIndex) {
                        const reloadType = weaponIndex > 8 ? "secondary" : "primary"
                        const currentReload = this.reloads[reloadType]
                        if (this.weaponIndex === currentReload.id) {
                        currentReload.count = 0
                        currentReload.date = Date.now()
}
const skin = this.skin
                        if (didHit) {
                            const {
                                CowUtils
                            } = window
                            cow.objectsManager.eachVisible((gameObject) => {
                                if (!gameObject.isItem || gameObject.dontGather) return
                                const scale = gameObject.scale || gameObject.getScale()
                                const distance = CowUtils.getDistance(this, gameObject) - scale
                                const angle = CowUtils.getDirection(gameObject, this)
                                const angleDistance = CowUtils.getAngleDist(angle, this.dir2)
                                const isInAngle = angleDistance <= cow.config.gatherAngle
                                const isInRange = distance <= this.weapon.range
                                if (!isInAngle || !isInRange) return
                                const damage = this.weapon.dmg * (cow.items.variants[this.weaponVariant].val || 1)
                                const damageAmount = damage * (this.weapon.sDmg || 1) * (skin?.bDmg || 1)

                                gameObject.changeHealth(-(damageAmount))
                            })
                        }
                    }
                    updateReloads() {
                        const reloadType = this.weaponIndex > 8 ? "secondary" : "primary"
                        const currentReload = this.reloads[reloadType]

                        if (currentReload.id != this.weapon.id) {
                            currentReload.setData(this.weapon, this.weaponVariant)
                        }
                        if (this.weaponVariant != currentReload.rarity) {
                            currentReload.rarity = this.weaponVariant
                        }
                        if (this.weaponIndex === currentReload.id && this.buildIndex === -1) {
                            if (currentReload.count < currentReload.max) {
                                currentReload.add()
                            }
                        }
                        this.reloads[reloadType] = currentReload
                        if (this.reloads.turret.count < this.reloads.turret.max) {
                            this.reloads.turret.add()
                        }
                    }
                    tick() {
                        this.updateReloads()
                        if (this.skinIndex != 45) {
                            if (this.shameCount === 8) {
                                this.shameTimer = 0
                                this.shameCont = 0
                            }
                            if (this.shameTimer > 0) this.shameTimer = 0
                        } else {
                            if (this.shameCount != 8) {
                                this.shameCount = 8
                                this.shameTimer = 270
                            }
                            if (this.shameTimer > 0) this.shameTimer -= 1
                        }
                    }
                    canSee(other) {
                        if (!other) return false
                        const dx = Math.abs(other.x - this.x) - other.scale
                        const dy = Math.abs(other.y - this.y) - other.scale
                        return dx <= (cow.config.maxScreenWidth / 2) * 1.3 && dy <= (cow.config.maxScreenHeight / 2) * 1.3
                    }
                }
                
export default Player;
/***/
