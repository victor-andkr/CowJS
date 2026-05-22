class Ticker {
                    constructor() {
                        this.ticks = 0
                        this.tickTasks = []
                        this.isClear = false
                    }
                    clear() {
                        this.tickTasks = []
                        this.isClear = true
                    }
                    addTickTask(callback) {
                        if (!(callback instanceof Function)) return
                        this.tickTasks.push(callback)
                    }
                    updateTicks() {
                        this.ticks += 1
                        if (this.isClear) {
                            this.isClear = false
                            return
                        }
                        if (this.tickTasks.length) {
                            this.tickTasks[0]()
                            this.tickTasks.shift()
                        }
                    }
                }
                
export default Ticker;
/***/
