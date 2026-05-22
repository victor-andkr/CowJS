class CowUtils {
                    static removeProto(object) {
                        if (!(object instanceof Object)) return
                        return JSON.parse(JSON.stringify(object))
                    }
                    static randInt(min, max) {
                        return Math.floor(CowUtils.randFloat(min, max))
                    }
                    static randFloat(min, max) {
                        if (typeof max === 'undefined') {
                            max = min
                            min = 0
                        }
                        return (Math.random() * (max - min + 1)) + min
                    }
                    static toRadians(degree) {
                        return degree * 0.01745329251
                    }
                    static lerp(value1, value2, amount) {
                        return value1 + (value2 - value1) * amount
                    }
                    static kFormat(value) {
                        value = parseFloat(value)
                        return value > 999 ? `${(value / 1000).toFixed(1)}k` : value
                    }
                    static fixAngle(angle) {
                        return Math.atan2(Math.cos(angle), Math.sin(angle))
                    }
                    static getDistance(x1, y1, x2, y2) {
                        if (x1 instanceof Object && y1 instanceof Object) {
                            return Math.hypot(x1.y - y1.y, x1.x - y1.x)
                        }
                        return Math.hypot(y1 - y2, x1 - x2)
                    }
                    static getDirection(x1, y1, x2, y2) {
                        if (x1 instanceof Object && y1 instanceof Object) {
                            return Math.atan2(x1.y - y1.y, x1.x - y1.x)
                        }
                        return Math.atan2(y1 - y2, x1 - x2)
                    }
                    static getAngleDist(angleBetween, targetLookDir) {
                        const difference = Math.abs(targetLookDir - angleBetween) % (Math.PI * 2)
                        return (difference > Math.PI ? (Math.PI * 2) - difference : difference)
                    }
                    static lerpAngle(value1, value2, amount) {
                        const difference = Math.abs(value2 - value1)
                        if (difference > Math.PI) {
                            if (value1 > value2) {
                                value2 += Math.PI * 2
                            } else {
                                value1 += Math.PI * 2
                            }
                        }
                        const value = value2 + ((value1 - value2) * amount)
                        if (value >= 0 && value <= (Math.PI * 2)) return value
                        return (value % (Math.PI * 2))
                    }
                    static createHook({
                        property,
                        proto = Object.prototype,
                        setter,
                        getter
                    }) {
                        const symbol = Symbol(property)
                        Object.defineProperty(proto, property, {
                            get() {
                                typeof getter === 'function' && getter(this, this[symbol])
                                return this[symbol]
                            },
                            set(value) {
                                typeof setter === 'function' && setter(this, value)
                                this[symbol] = value
                            }
                        })
                        return symbol
                    }
                }
                
export default CowUtils;
/***/
