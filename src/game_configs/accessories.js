const accessories = [{
                    id: 12,
                    name: "Snowball",
                    price: 1e3,
                    scale: 105,
                    xOff: 18,
                    desc: "no effect"
                }, {
                    id: 9,
                    name: "Tree Cape",
                    price: 1e3,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 10,
                    name: "Stone Cape",
                    price: 1e3,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 3,
                    name: "Cookie Cape",
                    price: 1500,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 8,
                    name: "Cow Cape",
                    price: 2e3,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 11,
                    name: "Monkey Tail",
                    price: 2e3,
                    scale: 97,
                    xOff: 25,
                    desc: "Super speed but reduced damage",
                    spdMult: 1.35,
                    dmgMultO: .2
                }, {
                    id: 17,
                    name: "Apple Basket",
                    price: 3e3,
                    scale: 80,
                    xOff: 12,
                    desc: "slowly regenerates health over time",
                    healthRegen: 1
                }, {
                    id: 6,
                    name: "Winter Cape",
                    price: 3e3,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 4,
                    name: "Skull Cape",
                    price: 4e3,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 5,
                    name: "Dash Cape",
                    price: 5e3,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 2,
                    name: "Dragon Cape",
                    price: 6e3,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 1,
                    name: "Super Cape",
                    price: 8e3,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 7,
                    name: "Troll Cape",
                    price: 8e3,
                    scale: 90,
                    desc: "no effect"
                }, {
                    id: 14,
                    name: "Thorns",
                    price: 1e4,
                    scale: 115,
                    xOff: 20,
                    desc: "no effect"
                }, {
                    id: 15,
                    name: "Blockades",
                    price: 1e4,
                    scale: 95,
                    xOff: 15,
                    desc: "no effect"
                }, {
                    id: 20,
                    name: "Devils Tail",
                    price: 1e4,
                    scale: 95,
                    xOff: 20,
                    desc: "no effect"
                }, {
                    id: 16,
                    name: "Sawblade",
                    price: 12e3,
                    scale: 90,
                    spin: !0,
                    xOff: 0,
                    desc: "deal damage to players that damage you",
                    dmg: .15
                }, {
                    id: 13,
                    name: "Angel Wings",
                    price: 15e3,
                    scale: 138,
                    xOff: 22,
                    desc: "slowly regenerates health over time",
                    healthRegen: 3
                }, {
                    id: 19,
                    name: "Shadow Wings",
                    price: 15e3,
                    scale: 138,
                    xOff: 22,
                    desc: "increased movement speed",
                    spdMult: 1.1
                }, {
                    id: 18,
                    name: "Blood Wings",
                    price: 2e4,
                    scale: 178,
                    xOff: 26,
                    desc: "restores health when you deal damage",
                    healD: .2
                }, {
                    id: 21,
                    name: "Corrupt X Wings",
                    price: 2e4,
                    scale: 178,
                    xOff: 26,
                    desc: "deal damage to players that damage you",
                    dmg: .25
                }]
                accessories.searchById = function(id) {
                    return this.find((accessory) => accessory.id === id)
                }
                
export default accessories;
/***/
