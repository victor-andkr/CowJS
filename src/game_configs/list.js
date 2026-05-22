import groups from "./groups.js";

const list = [{
                    group: groups[0],
                    name: "apple",
                    desc: "restores 20 health when consumed",
                    req: ["food", 10],
                    consume: function(e) {
                        return e.changeHealth(20, e)
                    },
                    scale: 22,
                    holdOffset: 15
                }, {
                    age: 3,
                    group: groups[0],
                    name: "cookie",
                    desc: "restores 40 health when consumed",
                    req: ["food", 15],
                    consume: function(e) {
                        return e.changeHealth(40, e)
                    },
                    scale: 27,
                    holdOffset: 15
                }, {
                    age: 7,
                    group: groups[0],
                    name: "cheese",
                    desc: "restores 30 health and another 50 over 5 seconds",
                    req: ["food", 25],
                    consume: function(e) {
                        return e.changeHealth(30, e) || e.health < 100 ? (e.dmgOverTime.dmg = -10,
                            e.dmgOverTime.doer = e,
                            e.dmgOverTime.time = 5,
                            !0) : !1
                    },
                    scale: 27,
                    holdOffset: 15
                }, {
                    group: groups[1],
                    name: "wood wall",
                    desc: "provides protection for your village",
                    req: ["wood", 10],
                    projDmg: !0,
                    health: 380,
                    scale: 50,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    age: 3,
                    group: groups[1],
                    name: "stone wall",
                    desc: "provides improved protection for your village",
                    req: ["stone", 25],
                    health: 900,
                    scale: 50,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    age: 7,
                    pre: 1,
                    group: groups[1],
                    name: "castle wall",
                    desc: "provides powerful protection for your village",
                    req: ["stone", 35],
                    health: 1500,
                    scale: 52,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    group: groups[2],
                    name: "spikes",
                    desc: "damages enemies when they touch them",
                    req: ["wood", 20, "stone", 5],
                    health: 400,
                    dmg: 20,
                    scale: 49,
                    spritePadding: -23,
                    holdOffset: 8,
                    placeOffset: -5
                }, {
                    age: 5,
                    group: groups[2],
                    name: "greater spikes",
                    desc: "damages enemies when they touch them",
                    req: ["wood", 30, "stone", 10],
                    health: 500,
                    dmg: 35,
                    scale: 52,
                    spritePadding: -23,
                    holdOffset: 8,
                    placeOffset: -5
                }, {
                    age: 9,
                    pre: 1,
                    group: groups[2],
                    name: "poison spikes",
                    desc: "poisons enemies when they touch them",
                    req: ["wood", 35, "stone", 15],
                    health: 600,
                    dmg: 30,
                    pDmg: 5,
                    scale: 52,
                    spritePadding: -23,
                    holdOffset: 8,
                    placeOffset: -5
                }, {
                    age: 9,
                    pre: 2,
                    group: groups[2],
                    name: "spinning spikes",
                    desc: "damages enemies when they touch them",
                    req: ["wood", 30, "stone", 20],
                    health: 500,
                    dmg: 45,
                    turnSpeed: .003,
                    scale: 52,
                    spritePadding: -23,
                    holdOffset: 8,
                    placeOffset: -5
                }, {
                    group: groups[3],
                    name: "windmill",
                    desc: "generates gold over time",
                    req: ["wood", 50, "stone", 10],
                    health: 400,
                    pps: 1,
                    turnSpeed: .0016,
                    spritePadding: 25,
                    iconLineMult: 12,
                    scale: 45,
                    holdOffset: 20,
                    placeOffset: 5
                }, {
                    age: 5,
                    pre: 1,
                    group: groups[3],
                    name: "faster windmill",
                    desc: "generates more gold over time",
                    req: ["wood", 60, "stone", 20],
                    health: 500,
                    pps: 1.5,
                    turnSpeed: .0025,
                    spritePadding: 25,
                    iconLineMult: 12,
                    scale: 47,
                    holdOffset: 20,
                    placeOffset: 5
                }, {
                    age: 8,
                    pre: 1,
                    group: groups[3],
                    name: "power mill",
                    desc: "generates more gold over time",
                    req: ["wood", 100, "stone", 50],
                    health: 800,
                    pps: 2,
                    turnSpeed: .005,
                    spritePadding: 25,
                    iconLineMult: 12,
                    scale: 47,
                    holdOffset: 20,
                    placeOffset: 5
                }, {
                    age: 5,
                    group: groups[4],
                    type: 2,
                    name: "mine",
                    desc: "allows you to mine stone",
                    req: ["wood", 20, "stone", 100],
                    iconLineMult: 12,
                    scale: 65,
                    holdOffset: 20,
                    placeOffset: 0
                }, {
                    age: 5,
                    group: groups[11],
                    type: 0,
                    name: "sapling",
                    desc: "allows you to farm wood",
                    req: ["wood", 150],
                    iconLineMult: 12,
                    colDiv: .5,
                    scale: 110,
                    holdOffset: 50,
                    placeOffset: -15
                }, {
                    age: 4,
                    group: groups[5],
                    name: "pit trap",
                    desc: "pit that traps enemies if they walk over it",
                    req: ["wood", 30, "stone", 30],
                    trap: !0,
                    ignoreCollision: !0,
                    hideFromEnemy: !0,
                    health: 500,
                    colDiv: .2,
                    scale: 50,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    age: 4,
                    group: groups[6],
                    name: "boost pad",
                    desc: "provides boost when stepped on",
                    req: ["stone", 20, "wood", 5],
                    ignoreCollision: !0,
                    boostSpeed: 1.5,
                    health: 150,
                    colDiv: .7,
                    scale: 45,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    age: 7,
                    group: groups[7],
                    doUpdate: !0,
                    name: "turret",
                    desc: "defensive structure that shoots at enemies",
                    req: ["wood", 200, "stone", 150],
                    health: 800,
                    projectile: 1,
                    shootRange: 700,
                    shootRate: 2200,
                    scale: 43,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    age: 7,
                    group: groups[8],
                    name: "platform",
                    desc: "platform to shoot over walls and cross over water",
                    req: ["wood", 20],
                    ignoreCollision: !0,
                    zIndex: 1,
                    health: 300,
                    scale: 43,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    age: 7,
                    group: groups[9],
                    name: "healing pad",
                    desc: "standing on it will slowly heal you",
                    req: ["wood", 30, "food", 10],
                    ignoreCollision: !0,
                    healCol: 15,
                    health: 400,
                    colDiv: .7,
                    scale: 45,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    age: 9,
                    group: groups[10],
                    name: "spawn pad",
                    desc: "you will spawn here when you die but it will dissapear",
                    req: ["wood", 100, "stone", 100],
                    health: 400,
                    ignoreCollision: !0,
                    spawnPoint: !0,
                    scale: 45,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    age: 7,
                    group: groups[12],
                    name: "blocker",
                    desc: "blocks building in radius",
                    req: ["wood", 30, "stone", 25],
                    ignoreCollision: !0,
                    blocker: 300,
                    health: 400,
                    colDiv: .7,
                    scale: 45,
                    holdOffset: 20,
                    placeOffset: -5
                }, {
                    age: 7,
                    group: groups[13],
                    name: "teleporter",
                    desc: "teleports you to a random point on the map",
                    req: ["wood", 60, "stone", 60],
                    ignoreCollision: !0,
                    teleport: !0,
                    health: 200,
                    colDiv: .7,
                    scale: 45,
                    holdOffset: 20,
                    placeOffset: -5
                }]
                for (var i = 0; i < list.length; ++i) {
                    list[i].id = i
                    if (list[i].pre) {
                        list[i].pre = i - list[i].pre
                    }
                }
                
export default list;
/***/
