class Keyboard {
                    constructor() {
                        this.activeKeys = new Map()
                        this.events = new Map()
                        this.init()
                    }
                    on(keyName, listener, options = {
                        repeat: true
                    }) {
                        if (!(listener instanceof Function)) return
                        if (!this.events.has(keyName)) {
                            this.events.set(keyName, new Map())
                        }
                        const listeners = this.events.get(keyName)
                        const id = parseInt(Date.now() / 1000 + (Math.random() * 100e3))
                        const value = {
                            listener,
                            options
                        }
                        listeners.set(id, value)
                        return {
                            rebind: (newKeyName) => {
                                const listener = this.events.get(keyName).get(id)
                                if (this.events.get(keyName).has(id)) {
                                    this.events.get(keyName).delete(id)
                                }
                                return this.on(newKeyName, listener.listener, listener.options)
                            }
                        }
                    }
                    trigger(code, doRepeat) {
                        this.events.forEach((eventsChunk, keyName) => {
                            if (!eventsChunk.size || keyName !== code) return
                            eventsChunk.forEach((event) => {
                                if (!event?.options?.repeat && doRepeat) return
                                event.listener()
                            })
                        })
                    }
                    onKeydown(event) {
                        if (!this.activeKeys.get(event.code)) {
                            this.activeKeys.set(event.code, true)
                            this.activeKeys.set(event.which, true)
                            this.trigger(event.code)
                            this.trigger(event.which)
                        }
                    }
                    onKeyup(event) {
                        if (this.activeKeys.get(event.code)) {
                            this.activeKeys.set(event.code, false)
                            this.activeKeys.set(event.which, false)
                        }
                    }
                    update() {
                        this.activeKeys.forEach((state, keyName) => {
                            if (!state) return
                            this.trigger(keyName, true)
                        })
                    }
                    init() {
                        window.addEventListener("keydown", this.onKeydown.bind(this))
                        window.addEventListener("keyup", this.onKeyup.bind(this))
                    }
                }
                
export default Keyboard;
/***/
