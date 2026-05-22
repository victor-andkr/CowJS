import { cow } from "../../constants.js";
                class ObjectsManager {
                    constructor() {
                        this.objects = new Map()
                        this.objectsInStream = 0
                    }
                    get list() {
                        return [...this.objects.values()]
                    }
                    getById(sid) {
                        return this.objects.get(sid)
                    }
                    each(callback) {
                        this.objects.forEach(callback)
                    }
                    eachVisible(callback) {
                        const visibleObjects = this.list.filter((object) => object.active && object.visible)
                        for (let i = 0; i < visibleObjects.length; i++) {
                            const gameObject = visibleObjects[i]
                            if (!gameObject.visible || !gameObject.active) return
                            callback(gameObject)
                        }
                    }
                    disableAllObjects(sid) {
                        this.each((gameObject) => {
                            if (!gameObject.owner || gameObject.owner.sid !== sid) return
                            this.objects.delete(gameObject.sid)
                        })
                    }
                    onAddGameObject(gameObject) {}
                    add(sid, x, y, dir, scale, type, data, setSID, owner) {
                        let tmpObject = this.getById(sid)
                        if (!tmpObject) {
                            tmpObject = new _entities_GameObject_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                                sid
                            })
                            this.objects.set(sid, tmpObject)
                        }
                        if (setSID) tmpObject.sid = sid
                        tmpObject.init(x, y, dir, scale, type, data, setSID, owner)
                        this.onAddGameObject(tmpObject)
                    }
                    checkItemLocation(x, y, scale, scaleMult, indx, ignoreWater, getBuilding) {
                        const {
                            CowUtils
                        } = window
                        const position = {
                            x,
                            y
                        }
                        let isCanPlace = true
let building = null

                        this.eachVisible((gameObject) => {
                            if (!isCanPlace) return
                            const blockScale = (gameObject.blocker ? gameObject.blocker : (gameObject.isItem ? gameObject.scale : gameObject.getScale(scaleMult, gameObject.isItem)))
                            if (CowUtils.getDistance(position, gameObject) < (scale + blockScale)) {
                                isCanPlace = false
building = gameObject
                            }
                        })
                        if (
                            !ignoreWater && indx != 18 &&
                            y >= (cow.config.mapScale / 2) - (cow.config.riverWidth / 2) &&
                            y <= (cow.config.mapScale / 2) + (cow.config.riverWidth / 2)
                        ) {
                            isCanPlace = false
                        }
                        return !getBuilding ? isCanPlace : building
                    }
                    update() {
                        this.objectsInStream = 0
                        this.each((gameObject) => {
                            if (!cow.player.canSee(gameObject)) {
                                return gameObject.setVisible(false)
                            }
                            gameObject.setVisible(true)
                            this.objectsInStream += 1
                            // if (!gameObject.doUpdate) return
                            gameObject.update()
                        })
                    }
                }
                
export default ObjectsManager;
/***/
