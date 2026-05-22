class Plugin {
                    constructor({
                        name,
                        description,
                        once,
                        isCanChangeActiveState = true
                    }) {
                        this.name = name
                        this.description = description
                        this.once = once
                        this._isCanChangeActiveState = isCanChangeActiveState
                        this.isActiveState = false
                        this.lastActive = null
                    }
                    setActiveState(state) {
                        if (!this._isCanChangeActiveState) return
                        this.isActiveState = state
                    }
                    execute(callback) {
                        if (this.once && this.lastActive) return
                        if (callback instanceof Function) {
                            callback()
                        }
                        this.lastActive = Date.now()
                    }
                }
                
export default Plugin;
/***/
