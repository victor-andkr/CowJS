class AnimalsManager {
                    constructor() {
                        this.animals = new Map()
                        this.animalsInStream = 0
                    }
                    get list() {
                        return [...this.animals.values()]
                    }
                    getById(sid) {
                        return this.animals.get(sid)
                    }
                    each(callback) {
                        this.animals.forEach(callback)
                    }
                    eachVisible(callback) {
                        this.each((animal) => {
                            if (!animal.visible) return
                            callback(animal)
                        })
                    }
                    updateAnimals(content) {
                        const chunkSize = 7

this.animalsInStream = 0

this.each((animal) => animal.disable())

if (!content?.length) return

                        for (let i = 0; i < content.length; i += chunkSize) {
                            const chunk = content.slice(i, i + chunkSize)
                            if (!this.animals.has(chunk[0])) {
                                const animal = new _entities_Animal_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                                    sid: chunk[0],
                                    index: chunk[1],
                                    x: chunk[2],
                                    y: chunk[3],
                                    dir: chunk[4]
                                })
                                this.animals.set(chunk[0], animal)
                                continue
                            }
                            const animal = this.animals.get(chunk[0])
                            animal.setTickData(chunk)
animal.visible = true
this.animalsInStream += 1
                        }
                    }
                    interpolate() {
                        const {
                            renderer
                        } = cow
                        const lastTime = renderer.nowUpdate - (1000 / (window.config?.serverUpdateRate || 10))

                        this.eachVisible((animal) => {
                            animal.dt += renderer.delta
                            const rate = 170
                            const tmpRate = Math.min(1.7, animal.dt / rate)
                            const xDif = animal.x2 - animal.x1
                            const yDif = animal.y2 - animal.y1
                            animal.setTo(
                                animal.x1 + (xDif * tmpRate),
                                animal.y1 + (yDif * tmpRate)
                            )
                        })
                    }
                    update() {
                        this.interpolate()
                    }
                }
                
export default AnimalsManager;
/***/
