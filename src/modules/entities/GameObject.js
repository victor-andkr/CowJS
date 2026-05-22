import { cow } from "../../constants.js";
                class GameObject {
                    constructor({
                        sid
                    }) {
                        const {
                            CowUtils
                        } = window
                        this.sid = sid
                        this.init = function(x, y, dir, scale, type, data, owner) {
                            data = typeof data === 'undefined' ? {} : data
                            this.x = x
                            this.y = y
                            this.dir = CowUtils.fixAngle(dir)
                            this.xWiggle = 0
                            this.yWiggle = 0
                            this.scale = scale
                            this.type = type
                            this.id = data.id
                            this.owner = owner
                            this.name = data.name
                            this.isItem = Boolean(this.id !== undefined)
                            this.group = data.group
                            this.health = data.health
                            this.maxHealth = data.health
                            this.layer = this.group !== undefined ? this.group.layer : this.type === 0 ? 3 : this.type === 2 ? 0 : this.type === 4 ? -1 : 2
                            this.sentTo = {}
                            this.gridLocations = []
                            this.doUpdate = data.doUpdate
                            this.colDiv = data.colDiv || 1
                            this.blocker = data.blocker
                            this.ignoreCollision = data.ignoreCollision
                            this.dontGather = data.dontGather
                            this.hideFromEnemy = data.hideFromEnemy
                            this.friction = data.friction
                            this.projDmg = data.projDmg
                            this.dmg = data.dmg
                            this.pDmg = data.pDmg
                            this.pps = data.pps
                            this.zIndex = data.zIndex || 0
                            this.turnSpeed = data.turnSpeed
                            this.turnSpeed2 = null
                            this.turnSpeed3 = null
                            this.req = data.req
                            this.trap = data.trap
                            this.healCol = data.healCol
                            this.teleport = data.teleport
                            this.boostSpeed = data.boostSpeed
                            this.projectile = data.projectile
                            this.shootRange = data.shootRange
                            this.shootRate = data.shootRate
                            this.shootCount = this.shootRate
                            this.spawnPoint = data.spawnPoint
                            this.visible = true
                            this.active = true
                        }
                    }
                    get renderX() {
                        return this.x + Number(this.xWiggle) - _constants__WEBPACK_IMPORTED_MODULE_0__.cow.camera.xOffset
                    }
                    get renderY() {
                        return this.y + Number(this.yWiggle) - _constants__WEBPACK_IMPORTED_MODULE_0__.cow.camera.yOffset
                    }
                    setVisible(_visible) {
                        if (typeof _visible !== 'boolean') return
                        this.visible = _visible
                    }
                    setActive(_active) {
                        if (typeof _active !== 'boolean') return
                        this.active = _active
                    }
                    getScale(scaleMult, hasColDiv) {
                        scaleMult = scaleMult || 1
                        const isVolume = this.isItem || this.type == 2 || this.type == 3 || this.type == 4
                        return this.scale * (isVolume ? 1 : (0.6 * scaleMult)) * (hasColDiv ? 1 : this.colDiv)
                    }
                    changeHealth(amount) {
                        amount = parseInt(amount)
                        this.health += amount
                        return this.health <= 0
                    }
                    doWiggle(dir) {
                        this.xWiggle += _constants__WEBPACK_IMPORTED_MODULE_0__.cow.config.gatherWiggle * Math.cos(dir)
                        this.yWiggle += _constants__WEBPACK_IMPORTED_MODULE_0__.cow.config.gatherWiggle * Math.sin(dir)
                    }
                    update() {
                        if (!this.visible) return
                        const {
                            renderer
                        } = _constants__WEBPACK_IMPORTED_MODULE_0__.cow
                        if (this.xWiggle) {
                            this.xWiggle *= Math.pow(0.99, renderer.delta)
                        }
                        if (this.yWiggle) {
                            this.yWiggle *= Math.pow(0.99, renderer.delta)
                        }
                        if (this.turnSpeed) {
                            this.dir += this.turnSpeed * renderer.delta
                        }
                    }
                }
                
export default GameObject;
/***/
