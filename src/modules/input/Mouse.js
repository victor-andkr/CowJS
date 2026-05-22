import { cow } from "../../constants.js";
                class Mouse {
                    constructor() {
                        this.x = void 0
                        this.y = void 0
                        this.isDown = false
                        this.isUp = !this.isDown
                        this.lastClick = null
                        this.lastMove = null
                        window.addEventListener("load", this.init.bind(this))
                    }
                    get angle() {
                        const canvas = document.getElementById("gameCanvas") || cow.renderer.canvas
                        if (!canvas) return
                        const width = canvas.clientWidth / 2
                        const height = canvas.clientHeight / 2
                        return Math.atan2(this.y - height, this.x - width)
                    }
                    setTo(x, y) {
                        if (typeof x !== 'number' || typeof y !== 'number') return
                        this.x = x
                        this.y = y
                        this.lastMove = Date.now()
                    }
                    setState(_isDown) {
                        this.isDown = _isDown
                        this.isUp = !_isDown
                        this.lastClick = Date.now()
                    }
                    onMousemove(event) {
                        this.setTo(event.clientX, event.clientY)
                    }
                    onMousedown() {
                        this.setState(true)
                    }
                    onMouseup() {
                        this.setState(false)
                    }
                    init() {
                        const touchControls = document.getElementById("touch-controls-fullscreen")
                        touchControls.addEventListener("mousemove", this.onMousemove.bind(this))
                        touchControls.addEventListener("mousedown", this.onMousedown.bind(this))
                        touchControls.addEventListener("mouseup", this.onMouseup.bind(this))
                    }
                }
                
export default Mouse;
/***/
