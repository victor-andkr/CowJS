import { cow } from "../../constants.js";
                class Renderer {
                    constructor() {
                        this.canvas = void 0
                        this.context = void 0
                        this.renders = new Map()
                        this.nowUpdate = void 0
                        this.lastUpdate = this.nowUpdate
                        this.delta = 0
                        window.addEventListener("load", this.init.bind(this))
                    }
                    addRender(renderKey, renderFunc) {
                        if (typeof renderKey !== 'string') return
                        if (!(renderFunc instanceof Function)) return
                        if (!this.renders.has(renderKey)) {
                            this.renders.set(renderKey, new Map())
                        }
                        const rendersChunk = this.renders.get(renderKey)
                        rendersChunk.set(rendersChunk.size + 1, renderFunc)
                    }
                    _updateAll() {
                        cow.camera.update()
                        cow.playersManager.update()
                        cow.objectsManager.update()
                        cow.animalsManager.update()
                        cow.input.keyboard.update()
                    }
                    updateFrame() {
                        this.nowUpdate = Date.now()
                        this.delta = this.nowUpdate - this.lastUpdate
                        this.lastUpdate = this.nowUpdate
                        requestAnimationFrame(this.updateFrame.bind(this))
                        this._updateAll()
                        if (!cow.player) return
                        this.renders.forEach((rendersChunk) => {
                            if (!rendersChunk.size) return
                            rendersChunk.forEach((render) => {
                                render()
                            })
                        })
                    }
                    init() {
                        this.canvas = document.getElementById("gameCanvas")
                        this.context = this.canvas.getContext("2d")
                        this.updateFrame()
                    }
                }
                
export default Renderer;
/***/
