class Reload {
                    constructor(id, speed, ticks) {
                        const tick = 111
                        ticks = ticks || Math.ceil(speed / tick)
                        this.id = id
                        this.count = ticks
                        this.date = 0
                        this.date2 = this.date
                        this.max = ticks
                        this.max2 = speed
                        this.rarity = 0
                        this.done = true
                        this.active = false
                        const {
                            CowUtils
                        } = window
                        this._default = CowUtils.removeProto(this)
                    }
                    get dif() {
                        return this.count / this.max
                    }
                    get smoothValue() {
                        if (this.done) return 1
                        return (this.date2 - this.date) / this.max2
                    }
                    setData(weapon, weaponVariant) {
                        this.id = weapon.id
                        this.max = weapon.speed ? Math.ceil(weapon.speed / (1e3 / 9)) : 0
                        this.max2 = weapon.speed
                        this.count = parseInt(this.max)
                        this.done = true
                        this.rarity = weaponVariant
                        this.active = true
                    }
                    add() {
                        this.count += 1
                        this.count = parseInt(this.count)
                        this.done = this.count === this.max
                    }
                    clear() {
                        this.count = 0
                        this.done = false
                        this.date = Date.now()
                    }
                }
                class Reloads {
                    constructor() {
                        this.primary = new Reload(5, 300),
                            this.secondary = new Reload(15, 1500),
                            this.turret = new Reload(null, 2500, 23)
                    }
                }
                
export default Reloads;
/***/
