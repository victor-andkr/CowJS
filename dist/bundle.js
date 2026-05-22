(() => {
    "use strict";
    var e = {};
    (() => {
        e.d = (t, n) => {
            for (var r in n) {
                if (e.o(n, r) && !e.o(t, r)) {
                    Object.defineProperty(t, r, {
                        enumerable: true,
                        get: n[r]
                    });
                }
            }
        };
    })();
    (() => {
        e.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    })();
    (() => {
        e.r = e => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(e, "__esModule", {
                value: true
            });
        };
    })();
    var t = {};
    e.r(t);
    e.d(t, {
        accessories: () => g,
        aiTypes: () => m,
        groups: () => y,
        hats: () => b,
        list: () => O,
        projectiles: () => E,
        variants: () => M,
        weapons: () => S
    });
    const n = JSON.parse('{"NAME":"Cow.JS","VERSION":"1.1.0","maxScreenWidth":1920,"maxScreenHeight":1080,"mapScale":14400,"riverWidth":724,"gatherAngle":1.208304866765305,"hitAngle":1.5707963267948966,"shieldAngle":1.0471975511965976,"gatherWiggle":10,"serverUpdateRate":9,"designations":{"plugins":{"AUTO_RECONECT":"auto-reconect","CHECK_PLACEMENT":"check-placement"},"packets":{"server":{"INIT_DATA":"A","DISCONNECT":"B","SETUP_GAME":"C","ADD_PLAYER":"D","REMOVE_PLAYER":"E","UPDATE_PLAYERS":"a","UPDATE_LEADERBOARD":"G","LOAD_GAME_OBJECT":"H","LOAD_AI":"I","ANIMATE_AI":"J","GATHER_ANIMATION":"K","WIGGLE_GAME_OBJECT":"L","SHOOT_TURRET":"M","UPDATE_PLAYER_VALUE":"N","UPDATE_HEALTH":"O","KILL_PLAYER":"P","KILL_OBJECT":"Q","KILL_OBJECTS":"R","UPDATE_ITEM_COUNTS":"S","UPDATE_AGE":"T","UPDATE_UPGRADES":"U","UPDATE_ITEMS":"V","ADD_PROJECTILE":"X","REMOVE_PROJECTILE":"Y","SERVER_SHUTDOWN_NOTICE":"Z","ADD_ALLIANCE":"g","DELETE_ALLIANCE":"1","ALLIANCE_NOTIFICATION":"2","SET_PLAYER_TEAM":"3","SET_ALLIANCE_PLAYERS":"4","UPDATE_STORE_ITEMS":"5","RECEIVE_CHAT":"6","UPDATE_MINIMAP":"7","SHOW_TEXT":"8","PING_MAP":"9","PING_SOCKET_RESPONSE":"0","IO_INIT":"io-init"},"client":{"ATTACK_STATE":"F","MOVE_DIR":"9","LOOK_DIR":"D","LOCK_MOVE_DIR":"K","MAP_PING":"S","SELECT_WEAPON":"z","SPAWN":"M","SELECT_UPGRADE":"H","STORE_EQUIP":"c","CHAT_MESSAGE":"6","PING_SOCKET":"e","ALLIANCE_JOIN_REQUEST":"P","KICK_FROM_CLAN":"Q","SEND_ALLIANCE_JOIN":"b","CREATE_ALLIANCE":"L","LEAVE_ALLIANCE":"N"},"items":{"FOOD":0,"WALL":1,"SPIKE":2,"MILL":3,"TRAP":4,"TURRET":5}}},"vultr":{"regionPrefix":"vultr:","digitalOceanPrefix":"do:","defaultApiProd":"https://api.moomoo.io","defaultApiSandbox":"https://api-sandbox.moomoo.io","defaultApiDev":"https://api-dev.moomoo.io"}}');
    class Player extends _Entity_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
        constructor({id: e, sid: t}) {
            super({
                id: e,
                sid: t
            });
            this.skinColor = void 0;
            this.buildIndex = -1;
            this.weaponIndex = 0;
            this.weaponVariant = 0;
            this.team = "";
            this.skinIndex = 0;
            this.tailIndex = 0;
            this.isLeader = false;
            this.iconIndex = 0;
            this.items = [ 0, 3, 6, 10 ];
            this.weapons = [ 0 ];
            this.skins = {};
            this.tails = {};
            const defineFreeCaps = (e, t) => {
                for (let n = 0; n < e.length; ++n) {
                    const r = e[n];
                    if (r.price > 0) continue;
                    this[t][r.id] = true;
                }
            };
            defineFreeCaps(re.items.hats, "skins");
            defineFreeCaps(re.items.accessories, "tails");
            this.itemCounts = {};
            this.gold = 100;
            this.stone = 100;
            this.wood = 100;
            this.food = 100;
            this.reloads = new _reloads_js__WEBPACK_IMPORTED_MODULE_2__["default"];
            this.maxXP = 300;
            this.XP = 0;
            this.age = 1;
            this.kills = 0;
            this.upgrAge = 2;
            this.upgradePoints = 0;
            this.hitTime = null;
            this.shameCount = 0;
            this.shameTimer = 0;
            this.speed = 0;
            this.moveDir = 0;
            this.isPlayer = true;
            this.lastDeath = {};
            this.createdInstance = {};
            this._updateCreatedInstance();
        }
        get isMe() {
            return Boolean(this.sid === re.player?.sid && re.player?.alive);
        }
        get isAlly() {
            return Boolean(this.sid === re.player?.sid || this.team && this.team === re.player.team);
        }
        get weapon() {
            return re.items.weapons[this.weaponIndex];
        }
        get lookAngle() {
            return this.isMe ? re.input.mouse.angle : this.dir || this.dir2;
        }
        get skin() {
            return re.items.hats.searchById(this.skinIndex);
        }
        get tail() {
            return re.items.accessories.searchById(this.tailIndex);
        }
        _updateCreatedInstance() {
            this.createdInstance = {};
            const e = [ "skins", "tails", "sid", "id", "lastDeath", "reloads" ];
            for (const t in this) {
                if (t === "createdInstance") continue;
                if (e.includes(t)) continue;
                this.createdInstance[t] = this[t];
            }
        }
        spawn() {
            this.alive = true;
            if (!this.isMe) return;
            for (const e in this.createdInstance) {
                const t = this.createdInstance[e];
                this[e] = t;
            }
            this._updateCreatedInstance();
            this.reloads = new _reloads_js__WEBPACK_IMPORTED_MODULE_2__["default"];
            re.setInGame(true);
        }
        kill() {
            if (!this.isMe) return;
            this.alive = false;
            this.lastDeath = {
                x: this.x,
                y: this.y
            };
            re.setInGame(false);
        }
        disable() {
            this.visible = false;
        }
        hasResources(e) {
            for (let t = 0; t < e.req.length; t += 2) {
                if (this[e.req[t]] >= Math.round(e.req[t + 1])) continue;
                return false;
            }
            return true;
        }
        isCanBuild(e) {
            return this.hasResources(e);
        }
        setTickData(e) {
            if (!Array.isArray(e) || !e?.length) return;
            const {CowUtils: t} = window;
            this.dt = 0;
            this.x1 = this.x;
            this.y1 = this.y;
            this.speed = t.getDistance(this.x2, this.y2, e[1], e[2]);
            this.x2 = e[1];
            this.y2 = e[2];
            this.moveDir = t.getDirection(this.x1, this.y1, this.x2, this.y2);
            this.dir1 = this.dir2 !== null ? this.dir2 : e[3];
            this.dir2 = e[3];
            this.time1 = this.time2 !== null ? this.time2 : Date.now();
            this.time2 = Date.now();
            this.buildIndex = e[4];
            this.weaponIndex = e[5];
            this.weaponVariant = e[6];
            this.team = e[7];
            this.isLeader = e[8];
            this.skinIndex = e[9];
            this.tailIndex = e[10];
            this.iconIndex = e[11];
            this.zIndex = e[12];
            this.visible = true;
            this.tick();
        }
        updateShame() {
            const e = re.ticker.ticks - this.hitTime;
            if (e < 2) {
                this.shameCount += 1;
                if (this.shameCount >= 8) {
                    this.shameTimer = 3e4;
                    this.shameCount = 0;
                }
            } else {
                this.shameCount = Math.max(0, this.shameCount - 2);
            }
        }
        changeHealth(e) {
            if (this.health < e) {
                this.updateShame();
                this.hitTime = 0;
            } else {
                this.hitTime = re.ticker.ticks;
            }
            this.health = e;
        }
        onGather(e, t) {
            const n = t > 8 ? "secondary" : "primary";
            const r = this.reloads[n];
            if (this.weaponIndex === r.id) {
                r.count = 0;
                r.date = Date.now();
            }
            const h = this.skin;
            if (e) {
                const {CowUtils: e} = window;
                re.objectsManager.eachVisible(t => {
                    if (!t.isItem || t.dontGather) return;
                    const n = t.scale || t.getScale();
                    const r = e.getDistance(this, t) - n;
                    const p = e.getDirection(t, this);
                    const g = e.getAngleDist(p, this.dir2);
                    const m = g <= re.config.gatherAngle;
                    const y = r <= this.weapon.range;
                    if (!m || !y) return;
                    const k = this.weapon.dmg * (re.items.variants[this.weaponVariant].val || 1);
                    const b = k * (this.weapon.sDmg || 1) * (h?.bDmg || 1);
                    t.changeHealth(-b);
                });
            }
        }
        updateReloads() {
            const e = this.weaponIndex > 8 ? "secondary" : "primary";
            const t = this.reloads[e];
            if (t.id != this.weapon.id) {
                t.setData(this.weapon, this.weaponVariant);
            }
            if (this.weaponVariant != t.rarity) {
                t.rarity = this.weaponVariant;
            }
            if (this.weaponIndex === t.id && this.buildIndex === -1) {
                if (t.count < t.max) {
                    t.add();
                }
            }
            this.reloads[e] = t;
            if (this.reloads.turret.count < this.reloads.turret.max) {
                this.reloads.turret.add();
            }
        }
        tick() {
            this.updateReloads();
            if (this.skinIndex != 45) {
                if (this.shameCount === 8) {
                    this.shameTimer = 0;
                    this.shameCont = 0;
                }
                if (this.shameTimer > 0) this.shameTimer = 0;
            } else {
                if (this.shameCount != 8) {
                    this.shameCount = 8;
                    this.shameTimer = 270;
                }
                if (this.shameTimer > 0) this.shameTimer -= 1;
            }
        }
        canSee(e) {
            if (!e) return false;
            const t = Math.abs(e.x - this.x) - e.scale;
            const n = Math.abs(e.y - this.y) - e.scale;
            return t <= re.config.maxScreenWidth / 2 * 1.3 && n <= re.config.maxScreenHeight / 2 * 1.3;
        }
    }
    const r = Player;
    class AutoReconect extends _Plugin_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
        constructor() {
            super({
                name: "auto-reconect",
                description: "Automatically reloads the page after the connection is closed or the game could not be logged in",
                once: true
            });
        }
        execute() {
            super.execute(() => {
                location.reload();
            });
        }
    }
    const h = AutoReconect;
    const p = [ {
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
    } ];
    p.searchById = function(e) {
        return this.find(t => t.id === e);
    };
    const g = p;
    const m = [ {
        id: 0,
        src: "cow_1",
        killScore: 150,
        health: 500,
        weightM: .8,
        speed: 95e-5,
        turnSpeed: .001,
        scale: 72,
        drop: [ "food", 50 ]
    }, {
        id: 1,
        src: "pig_1",
        killScore: 200,
        health: 800,
        weightM: .6,
        speed: 85e-5,
        turnSpeed: .001,
        scale: 72,
        drop: [ "food", 80 ]
    }, {
        id: 2,
        name: "Bull",
        src: "bull_2",
        hostile: true,
        dmg: 20,
        killScore: 1e3,
        health: 1800,
        weightM: .5,
        speed: 94e-5,
        turnSpeed: 74e-5,
        scale: 78,
        viewRange: 800,
        chargePlayer: true,
        drop: [ "food", 100 ]
    }, {
        id: 3,
        name: "Bully",
        src: "bull_1",
        hostile: true,
        dmg: 20,
        killScore: 2e3,
        health: 2800,
        weightM: .45,
        speed: .001,
        turnSpeed: 8e-4,
        scale: 90,
        viewRange: 900,
        chargePlayer: true,
        drop: [ "food", 400 ]
    }, {
        id: 4,
        name: "Wolf",
        src: "wolf_1",
        hostile: true,
        dmg: 8,
        killScore: 500,
        health: 300,
        weightM: .45,
        speed: .001,
        turnSpeed: .002,
        scale: 84,
        viewRange: 800,
        chargePlayer: true,
        drop: [ "food", 200 ]
    }, {
        id: 5,
        name: "Quack",
        src: "chicken_1",
        dmg: 8,
        killScore: 2e3,
        noTrap: true,
        health: 300,
        weightM: .2,
        speed: .0018,
        turnSpeed: .006,
        scale: 70,
        drop: [ "food", 100 ]
    }, {
        id: 6,
        name: "MOOSTAFA",
        nameScale: 50,
        src: "enemy",
        hostile: true,
        dontRun: true,
        fixedSpawn: true,
        spawnDelay: 6e4,
        noTrap: true,
        colDmg: 100,
        dmg: 40,
        killScore: 8e3,
        health: 18e3,
        weightM: .4,
        speed: 7e-4,
        turnSpeed: .01,
        scale: 80,
        spriteMlt: 1.8,
        leapForce: .9,
        viewRange: 1e3,
        hitRange: 210,
        hitDelay: 1e3,
        chargePlayer: true,
        drop: [ "food", 100 ]
    }, {
        id: 7,
        name: "Treasure",
        hostile: true,
        nameScale: 35,
        src: "crate_1",
        fixedSpawn: true,
        spawnDelay: 12e4,
        colDmg: 200,
        killScore: 5e3,
        health: 2e4,
        weightM: .1,
        speed: 0,
        turnSpeed: 0,
        scale: 70,
        spriteMlt: 1
    }, {
        id: 8,
        name: "MOOFIE",
        src: "wolf_2",
        hostile: true,
        fixedSpawn: true,
        dontRun: true,
        hitScare: 4,
        spawnDelay: 3e4,
        noTrap: true,
        nameScale: 35,
        dmg: 10,
        colDmg: 100,
        killScore: 3e3,
        health: 7e3,
        weightM: .45,
        speed: .0015,
        turnSpeed: .002,
        scale: 90,
        viewRange: 800,
        chargePlayer: true,
        drop: [ "food", 1e3 ]
    } ];
    const y = [ {
        id: 0,
        name: "food",
        layer: 0
    }, {
        id: 1,
        name: "walls",
        place: !0,
        limit: 30,
        layer: 0
    }, {
        id: 2,
        name: "spikes",
        place: !0,
        limit: 15,
        layer: 0
    }, {
        id: 3,
        name: "mill",
        place: !0,
        limit: 7,
        sandboxLimit: 299,
        layer: 1
    }, {
        id: 4,
        name: "mine",
        place: !0,
        limit: 1,
        layer: 0
    }, {
        id: 5,
        name: "trap",
        place: !0,
        limit: 6,
        layer: -1
    }, {
        id: 6,
        name: "booster",
        place: !0,
        limit: 12,
        sandboxLimit: 299,
        layer: -1
    }, {
        id: 7,
        name: "turret",
        place: !0,
        limit: 2,
        layer: 1
    }, {
        id: 8,
        name: "watchtower",
        place: !0,
        limit: 12,
        layer: 1
    }, {
        id: 9,
        name: "buff",
        place: !0,
        limit: 4,
        layer: -1
    }, {
        id: 10,
        name: "spawn",
        place: !0,
        limit: 1,
        layer: -1
    }, {
        id: 11,
        name: "sapling",
        place: !0,
        limit: 2,
        layer: 0
    }, {
        id: 12,
        name: "blocker",
        place: !0,
        limit: 3,
        layer: -1
    }, {
        id: 13,
        name: "teleporter",
        place: !0,
        limit: 2,
        sandboxLimit: 299,
        layer: -1
    } ];
    const k = [ {
        id: 45,
        name: "Shame!",
        dontSell: !0,
        price: 0,
        scale: 120,
        desc: "hacks are for losers"
    }, {
        id: 51,
        name: "Moo Cap",
        price: 0,
        scale: 120,
        desc: "coolest mooer around"
    }, {
        id: 50,
        name: "Apple Cap",
        price: 0,
        scale: 120,
        desc: "apple farms remembers"
    }, {
        id: 28,
        name: "Moo Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 29,
        name: "Pig Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 30,
        name: "Fluff Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 36,
        name: "Pandou Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 37,
        name: "Bear Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 38,
        name: "Monkey Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 44,
        name: "Polar Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 35,
        name: "Fez Hat",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 42,
        name: "Enigma Hat",
        price: 0,
        scale: 120,
        desc: "join the enigma army"
    }, {
        id: 43,
        name: "Blitz Hat",
        price: 0,
        scale: 120,
        desc: "hey everybody i'm blitz"
    }, {
        id: 49,
        name: "Bob XIII Hat",
        price: 0,
        scale: 120,
        desc: "like and subscribe"
    }, {
        id: 57,
        name: "Pumpkin",
        price: 50,
        scale: 120,
        desc: "Spooooky"
    }, {
        id: 8,
        name: "Bummle Hat",
        price: 100,
        scale: 120,
        desc: "no effect"
    }, {
        id: 2,
        name: "Straw Hat",
        price: 500,
        scale: 120,
        desc: "no effect"
    }, {
        id: 15,
        name: "Winter Cap",
        price: 600,
        scale: 120,
        desc: "allows you to move at normal speed in snow",
        coldM: 1
    }, {
        id: 5,
        name: "Cowboy Hat",
        price: 1e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 4,
        name: "Ranger Hat",
        price: 2e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 18,
        name: "Explorer Hat",
        price: 2e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 31,
        name: "Flipper Hat",
        price: 2500,
        scale: 120,
        desc: "have more control while in water",
        watrImm: !0
    }, {
        id: 1,
        name: "Marksman Cap",
        price: 3e3,
        scale: 120,
        desc: "increases arrow speed and range",
        aMlt: 1.3
    }, {
        id: 10,
        name: "Bush Gear",
        price: 3e3,
        scale: 160,
        desc: "allows you to disguise yourself as a bush"
    }, {
        id: 48,
        name: "Halo",
        price: 3e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 6,
        name: "Soldier Helmet",
        price: 4e3,
        scale: 120,
        desc: "reduces damage taken but slows movement",
        spdMult: .94,
        dmgMult: .75
    }, {
        id: 23,
        name: "Anti Venom Gear",
        price: 4e3,
        scale: 120,
        desc: "makes you immune to poison",
        poisonRes: 1
    }, {
        id: 13,
        name: "Medic Gear",
        price: 5e3,
        scale: 110,
        desc: "slowly regenerates health over time",
        healthRegen: 3
    }, {
        id: 9,
        name: "Miners Helmet",
        price: 5e3,
        scale: 120,
        desc: "earn 1 extra gold per resource",
        extraGold: 1
    }, {
        id: 32,
        name: "Musketeer Hat",
        price: 5e3,
        scale: 120,
        desc: "reduces cost of projectiles",
        projCost: .5
    }, {
        id: 7,
        name: "Bull Helmet",
        price: 6e3,
        scale: 120,
        desc: "increases damage done but drains health",
        healthRegen: -5,
        dmgMultO: 1.5,
        spdMult: .96
    }, {
        id: 22,
        name: "Emp Helmet",
        price: 6e3,
        scale: 120,
        desc: "turrets won't attack but you move slower",
        antiTurret: 1,
        spdMult: .7
    }, {
        id: 12,
        name: "Booster Hat",
        price: 6e3,
        scale: 120,
        desc: "increases your movement speed",
        spdMult: 1.16
    }, {
        id: 26,
        name: "Barbarian Armor",
        price: 8e3,
        scale: 120,
        desc: "knocks back enemies that attack you",
        dmgK: .6
    }, {
        id: 21,
        name: "Plague Mask",
        price: 1e4,
        scale: 120,
        desc: "melee attacks deal poison damage",
        poisonDmg: 5,
        poisonTime: 6
    }, {
        id: 46,
        name: "Bull Mask",
        price: 1e4,
        scale: 120,
        desc: "bulls won't target you unless you attack them",
        bullRepel: 1
    }, {
        id: 14,
        name: "Windmill Hat",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "generates points while worn",
        pps: 1.5
    }, {
        id: 11,
        name: "Spike Gear",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "deal damage to players that damage you",
        dmg: .45
    }, {
        id: 53,
        name: "Turret Gear",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "you become a walking turret",
        turret: {
            proj: 1,
            range: 700,
            rate: 2500
        },
        spdMult: .7
    }, {
        id: 20,
        name: "Samurai Armor",
        price: 12e3,
        scale: 120,
        desc: "increased attack speed and fire rate",
        atkSpd: .78
    }, {
        id: 58,
        name: "Dark Knight",
        price: 12e3,
        scale: 120,
        desc: "restores health when you deal damage",
        healD: .4
    }, {
        id: 27,
        name: "Scavenger Gear",
        price: 15e3,
        scale: 120,
        desc: "earn double points for each kill",
        kScrM: 2
    }, {
        id: 40,
        name: "Tank Gear",
        price: 15e3,
        scale: 120,
        desc: "increased damage to buildings but slower movement",
        spdMult: .3,
        bDmg: 3.3
    }, {
        id: 52,
        name: "Thief Gear",
        price: 15e3,
        scale: 120,
        desc: "steal half of a players gold when you kill them",
        goldSteal: .5
    }, {
        id: 55,
        name: "Bloodthirster",
        price: 2e4,
        scale: 120,
        desc: "Restore Health when dealing damage. And increased damage",
        healD: .25,
        dmgMultO: 1.2
    }, {
        id: 56,
        name: "Assassin Gear",
        price: 2e4,
        scale: 120,
        desc: "Go invisible when not moving. Can't eat. Increased speed",
        noEat: !0,
        spdMult: 1.1,
        invisTimer: 1e3
    } ];
    k.searchById = function(e) {
        return this.find(t => t.id === e);
    };
    const b = k;
    const A = [ {
        group: y[0],
        name: "apple",
        desc: "restores 20 health when consumed",
        req: [ "food", 10 ],
        consume: function(e) {
            return e.changeHealth(20, e);
        },
        scale: 22,
        holdOffset: 15
    }, {
        age: 3,
        group: y[0],
        name: "cookie",
        desc: "restores 40 health when consumed",
        req: [ "food", 15 ],
        consume: function(e) {
            return e.changeHealth(40, e);
        },
        scale: 27,
        holdOffset: 15
    }, {
        age: 7,
        group: y[0],
        name: "cheese",
        desc: "restores 30 health and another 50 over 5 seconds",
        req: [ "food", 25 ],
        consume: function(e) {
            return e.changeHealth(30, e) || e.health < 100 ? (e.dmgOverTime.dmg = -10, e.dmgOverTime.doer = e, 
            e.dmgOverTime.time = 5, !0) : !1;
        },
        scale: 27,
        holdOffset: 15
    }, {
        group: y[1],
        name: "wood wall",
        desc: "provides protection for your village",
        req: [ "wood", 10 ],
        projDmg: !0,
        health: 380,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 3,
        group: y[1],
        name: "stone wall",
        desc: "provides improved protection for your village",
        req: [ "stone", 25 ],
        health: 900,
        scale: 50,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        pre: 1,
        group: y[1],
        name: "castle wall",
        desc: "provides powerful protection for your village",
        req: [ "stone", 35 ],
        health: 1500,
        scale: 52,
        holdOffset: 20,
        placeOffset: -5
    }, {
        group: y[2],
        name: "spikes",
        desc: "damages enemies when they touch them",
        req: [ "wood", 20, "stone", 5 ],
        health: 400,
        dmg: 20,
        scale: 49,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        age: 5,
        group: y[2],
        name: "greater spikes",
        desc: "damages enemies when they touch them",
        req: [ "wood", 30, "stone", 10 ],
        health: 500,
        dmg: 35,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        age: 9,
        pre: 1,
        group: y[2],
        name: "poison spikes",
        desc: "poisons enemies when they touch them",
        req: [ "wood", 35, "stone", 15 ],
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
        group: y[2],
        name: "spinning spikes",
        desc: "damages enemies when they touch them",
        req: [ "wood", 30, "stone", 20 ],
        health: 500,
        dmg: 45,
        turnSpeed: .003,
        scale: 52,
        spritePadding: -23,
        holdOffset: 8,
        placeOffset: -5
    }, {
        group: y[3],
        name: "windmill",
        desc: "generates gold over time",
        req: [ "wood", 50, "stone", 10 ],
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
        group: y[3],
        name: "faster windmill",
        desc: "generates more gold over time",
        req: [ "wood", 60, "stone", 20 ],
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
        group: y[3],
        name: "power mill",
        desc: "generates more gold over time",
        req: [ "wood", 100, "stone", 50 ],
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
        group: y[4],
        type: 2,
        name: "mine",
        desc: "allows you to mine stone",
        req: [ "wood", 20, "stone", 100 ],
        iconLineMult: 12,
        scale: 65,
        holdOffset: 20,
        placeOffset: 0
    }, {
        age: 5,
        group: y[11],
        type: 0,
        name: "sapling",
        desc: "allows you to farm wood",
        req: [ "wood", 150 ],
        iconLineMult: 12,
        colDiv: .5,
        scale: 110,
        holdOffset: 50,
        placeOffset: -15
    }, {
        age: 4,
        group: y[5],
        name: "pit trap",
        desc: "pit that traps enemies if they walk over it",
        req: [ "wood", 30, "stone", 30 ],
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
        group: y[6],
        name: "boost pad",
        desc: "provides boost when stepped on",
        req: [ "stone", 20, "wood", 5 ],
        ignoreCollision: !0,
        boostSpeed: 1.5,
        health: 150,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: y[7],
        doUpdate: !0,
        name: "turret",
        desc: "defensive structure that shoots at enemies",
        req: [ "wood", 200, "stone", 150 ],
        health: 800,
        projectile: 1,
        shootRange: 700,
        shootRate: 2200,
        scale: 43,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: y[8],
        name: "platform",
        desc: "platform to shoot over walls and cross over water",
        req: [ "wood", 20 ],
        ignoreCollision: !0,
        zIndex: 1,
        health: 300,
        scale: 43,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: y[9],
        name: "healing pad",
        desc: "standing on it will slowly heal you",
        req: [ "wood", 30, "food", 10 ],
        ignoreCollision: !0,
        healCol: 15,
        health: 400,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 9,
        group: y[10],
        name: "spawn pad",
        desc: "you will spawn here when you die but it will dissapear",
        req: [ "wood", 100, "stone", 100 ],
        health: 400,
        ignoreCollision: !0,
        spawnPoint: !0,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: y[12],
        name: "blocker",
        desc: "blocks building in radius",
        req: [ "wood", 30, "stone", 25 ],
        ignoreCollision: !0,
        blocker: 300,
        health: 400,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    }, {
        age: 7,
        group: y[13],
        name: "teleporter",
        desc: "teleports you to a random point on the map",
        req: [ "wood", 60, "stone", 60 ],
        ignoreCollision: !0,
        teleport: !0,
        health: 200,
        colDiv: .7,
        scale: 45,
        holdOffset: 20,
        placeOffset: -5
    } ];
    for (var _ = 0; _ < A.length; ++_) {
        A[_].id = _;
        if (A[_].pre) {
            A[_].pre = _ - A[_].pre;
        }
    }
    const O = A;
    const E = [ {
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 25,
        speed: 1.6,
        scale: 103,
        range: 1e3
    }, {
        indx: 1,
        layer: 1,
        dmg: 25,
        scale: 20
    }, {
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 35,
        speed: 2.5,
        scale: 103,
        range: 1200
    }, {
        indx: 0,
        layer: 0,
        src: "arrow_1",
        dmg: 30,
        speed: 2,
        scale: 103,
        range: 1200
    }, {
        indx: 1,
        layer: 1,
        dmg: 16,
        scale: 20
    }, {
        indx: 0,
        layer: 0,
        src: "bullet_1",
        dmg: 50,
        speed: 3.6,
        scale: 160,
        range: 1400
    } ];
    const M = [ {
        id: 0,
        src: "",
        xp: 0,
        val: 1
    }, {
        id: 1,
        src: "_g",
        xp: 3e3,
        val: 1.1
    }, {
        id: 2,
        src: "_d",
        xp: 7e3,
        val: 1.18
    }, {
        id: 3,
        src: "_r",
        poison: true,
        xp: 12e3,
        val: 1.18
    } ];
    const S = [ {
        id: 0,
        type: 0,
        name: "tool hammer",
        desc: "tool for gathering all resources",
        src: "hammer_1",
        length: 140,
        width: 140,
        xOff: -3,
        yOff: 18,
        dmg: 25,
        range: 65,
        gather: 1,
        speed: 300
    }, {
        id: 1,
        type: 0,
        age: 2,
        name: "hand axe",
        desc: "gathers resources at a higher rate",
        src: "axe_1",
        length: 140,
        width: 140,
        xOff: 3,
        yOff: 24,
        dmg: 30,
        spdMult: 1,
        range: 70,
        gather: 2,
        speed: 400
    }, {
        id: 2,
        type: 0,
        age: 8,
        pre: 1,
        name: "great axe",
        desc: "deal more damage and gather more resources",
        src: "great_axe_1",
        length: 140,
        width: 140,
        xOff: -8,
        yOff: 25,
        dmg: 35,
        spdMult: 1,
        range: 75,
        gather: 4,
        speed: 400
    }, {
        id: 3,
        type: 0,
        age: 2,
        name: "short sword",
        desc: "increased attack power but slower move speed",
        src: "sword_1",
        iPad: 1.3,
        length: 130,
        width: 210,
        xOff: -8,
        yOff: 46,
        dmg: 35,
        spdMult: .85,
        range: 110,
        gather: 1,
        speed: 300
    }, {
        id: 4,
        type: 0,
        age: 8,
        pre: 3,
        name: "katana",
        desc: "greater range and damage",
        src: "samurai_1",
        iPad: 1.3,
        length: 130,
        width: 210,
        xOff: -8,
        yOff: 59,
        dmg: 40,
        spdMult: .8,
        range: 118,
        gather: 1,
        speed: 300
    }, {
        id: 5,
        type: 0,
        age: 2,
        name: "polearm",
        desc: "long range melee weapon",
        src: "spear_1",
        iPad: 1.3,
        length: 130,
        width: 210,
        xOff: -8,
        yOff: 53,
        dmg: 45,
        knock: .2,
        spdMult: .82,
        range: 142,
        gather: 1,
        speed: 700
    }, {
        id: 6,
        type: 0,
        age: 2,
        name: "bat",
        desc: "fast long range melee weapon",
        src: "bat_1",
        iPad: 1.3,
        length: 110,
        width: 180,
        xOff: -8,
        yOff: 53,
        dmg: 20,
        knock: .7,
        range: 110,
        gather: 1,
        speed: 300
    }, {
        id: 7,
        type: 0,
        age: 2,
        name: "daggers",
        desc: "really fast short range weapon",
        src: "dagger_1",
        iPad: .8,
        length: 110,
        width: 110,
        xOff: 18,
        yOff: 0,
        dmg: 20,
        knock: .1,
        range: 65,
        gather: 1,
        hitSlow: .1,
        spdMult: 1.13,
        speed: 100
    }, {
        id: 8,
        type: 0,
        age: 2,
        name: "stick",
        desc: "great for gathering but very weak",
        src: "stick_1",
        length: 140,
        width: 140,
        xOff: 3,
        yOff: 24,
        dmg: 1,
        spdMult: 1,
        range: 70,
        gather: 7,
        speed: 400
    }, {
        id: 9,
        type: 1,
        age: 6,
        name: "hunting bow",
        desc: "bow used for ranged combat and hunting",
        src: "bow_1",
        req: [ "wood", 4 ],
        length: 120,
        width: 120,
        xOff: -6,
        yOff: 0,
        projectile: 0,
        spdMult: .75,
        speed: 600
    }, {
        id: 10,
        type: 1,
        age: 6,
        name: "great hammer",
        desc: "hammer used for destroying structures",
        src: "great_hammer_1",
        length: 140,
        width: 140,
        xOff: -9,
        yOff: 25,
        dmg: 10,
        spdMult: .88,
        range: 75,
        sDmg: 7.5,
        gather: 1,
        speed: 400
    }, {
        id: 11,
        type: 1,
        age: 6,
        name: "wooden shield",
        desc: "blocks projectiles and reduces melee damage",
        src: "shield_1",
        length: 120,
        width: 120,
        shield: .2,
        xOff: 6,
        yOff: 0,
        spdMult: .7
    }, {
        id: 12,
        type: 1,
        age: 8,
        pre: 9,
        name: "crossbow",
        desc: "deals more damage and has greater range",
        src: "crossbow_1",
        req: [ "wood", 5 ],
        aboveHand: !0,
        armS: .75,
        length: 120,
        width: 120,
        xOff: -4,
        yOff: 0,
        projectile: 2,
        spdMult: .7,
        speed: 700
    }, {
        id: 13,
        type: 1,
        age: 9,
        pre: 12,
        name: "repeater crossbow",
        desc: "high firerate crossbow with reduced damage",
        src: "crossbow_2",
        req: [ "wood", 10 ],
        aboveHand: !0,
        armS: .75,
        length: 120,
        width: 120,
        xOff: -4,
        yOff: 0,
        projectile: 3,
        spdMult: .7,
        speed: 230
    }, {
        id: 14,
        type: 1,
        age: 6,
        name: "mc grabby",
        desc: "steals resources from enemies",
        src: "grab_1",
        length: 130,
        width: 210,
        xOff: -8,
        yOff: 53,
        dmg: 0,
        steal: 250,
        knock: .2,
        spdMult: 1.05,
        range: 125,
        gather: 0,
        speed: 700
    }, {
        id: 15,
        type: 1,
        age: 9,
        pre: 12,
        name: "musket",
        desc: "slow firerate but high damage and range",
        src: "musket_1",
        req: [ "stone", 10 ],
        aboveHand: !0,
        rec: .35,
        armS: .6,
        hndS: .3,
        hndD: 1.6,
        length: 205,
        width: 205,
        xOff: 25,
        yOff: 0,
        projectile: 5,
        hideProjectile: !0,
        spdMult: .6,
        speed: 1500
    } ];
    class Cow {
        constructor() {
            this.config = n;
            this.items = t;
            this.codec = Q;
            this.socket = X;
            this.playersManager = $;
            this.objectsManager = Z;
            this.animalsManager = ee;
            this.ticker = te;
            this.camera = se;
            this.renderer = ae;
            this.input = ie;
            this.placement = ne;
            this.player = void 0;
            this.inGame = false;
            this._plugins = new Map([ [ "auto-reconect", new h ] ]);
        }
        setCodec(e) {
            Q.encoder = {
                encode: e.encode
            };
            Q.decoder = {
                decode: e.decode
            };
            Q.isReady = true;
            this.codec = Q;
        }
        onPacket(e, t) {
            this.socket.handler.onPacket(e, t);
        }
        onKeyboard(e, t, n) {
            return this.input.keyboard.on(e, t, n);
        }
        sendPacket(e, ...t) {
            this.socket.send(e, t);
        }
        get clientPackets() {
            return this.config.designations.packets.client;
        }
        get serverPackets() {
            return this.config.designations.packets.server;
        }
        placeItem(e, {angle: t} = {}, n) {
            this.placement.placeItem(e, {
                angle: t
            }, n);
        }
        addRender(e, t) {
            this.renderer.addRender(e, t);
        }
        setInGame(e) {
            if (typeof e !== "boolean") return;
            this._inGame = e;
        }
        getNearPlayer(e) {
            if (!this.player) return;
            const {CowUtils: t} = window;
            let n = this.playersManager.list;
            if (!e) n = n.filter(e => e.visible);
            if (e) {
                n = n.filter(e => !e.isAlly && e.visible);
            }
            return n.sort((e, n) => {
                e = t.getDistance(e, this.player);
                n = t.getDistance(n, this.player);
                return e - n;
            })[0];
        }
        getNearEnemy() {
            return this.getNearPlayer(true);
        }
        setPlayer(e) {
            this.camera.setTo(e.x, e.y);
            if (!(e instanceof r) || typeof this.player !== "undefined") return;
            this.player = e;
        }
        setPluginState(e, t) {
            if (!this._plugins.has(e)) return;
            const n = this._plugins.get(e);
            n.setActiveState(t);
        }
        executePlugin(e) {
            if (!this._plugins.has(e)) return;
            const t = this._plugins.get(e);
            if (!t.isActiveState) return;
            t.execute();
        }
    }
    const I = n.designations.packets.client;
    class Placement {
        constructor() {
            this.delay = 0;
            this.lastPlaceTick = 0;
        }
        setDelay(e) {
            this.delay = e;
        }
        sendPlace(e, t) {
            const n = re.ticker.ticks - this.lastPlaceTick;
            if (n < this.delay) return;
            const r = re.player.weaponIndex;
            re.sendPacket(I.SELECT_WEAPON, e, re.player.weapons[Number(r > 8)] ?? 0);
            re.sendPacket(I.ATTACK_STATE, 1, t);
            re.sendPacket(I.ATTACK_STATE, 0, t);
            re.sendPacket(I.SELECT_WEAPON, re.player.weapons[Number(r > 8)] ?? 0, true);
            this.lastPlaceTick = re.ticker.ticks;
        }
        placeItem(e, {angle: t} = {}, n) {
            if (!re.player?.alive) return;
            const r = re.player.items[e];
            if (typeof r === "undefined") return;
            const h = re.items.list[r];
            if (!re.player.isCanBuild(h)) return;
            t = typeof t === "undefined" ? re.player.lookAngle : t;
            const p = re.player.scale + h.scale + (h.placeOffset || 0);
            const g = re.player.x2 + p * Math.cos(t);
            const m = re.player.y2 + p * Math.sin(t);
            const y = re.objectsManager.checkItemLocation(g, m, h.scale, .6, h.id, false);
            if (!h.consume && !y) return;
            this.sendPlace(h.id, t);
            n instanceof Function && n();
        }
    }
    class Ticker {
        constructor() {
            this.ticks = 0;
            this.tickTasks = [];
            this.isClear = false;
        }
        clear() {
            this.tickTasks = [];
            this.isClear = true;
        }
        addTickTask(e) {
            if (!(e instanceof Function)) return;
            this.tickTasks.push(e);
        }
        updateTicks() {
            this.ticks += 1;
            if (this.isClear) {
                this.isClear = false;
                return;
            }
            if (this.tickTasks.length) {
                this.tickTasks[0]();
                this.tickTasks.shift();
            }
        }
    }
    const P = Ticker;
    class Input {
        constructor() {
            this.keyboard = new _Keyboard_js__WEBPACK_IMPORTED_MODULE_0__["default"];
            this.mouse = new _Mouse_js__WEBPACK_IMPORTED_MODULE_1__["default"];
        }
    }
    const T = Input;
    class AnimalsManager {
        constructor() {
            this.animals = new Map;
            this.animalsInStream = 0;
        }
        get list() {
            return [ ...this.animals.values() ];
        }
        getById(e) {
            return this.animals.get(e);
        }
        each(e) {
            this.animals.forEach(e);
        }
        eachVisible(e) {
            this.each(t => {
                if (!t.visible) return;
                e(t);
            });
        }
        updateAnimals(e) {
            const t = 7;
            this.animalsInStream = 0;
            this.each(e => e.disable());
            if (!e?.length) return;
            for (let n = 0; n < e.length; n += t) {
                const r = e.slice(n, n + t);
                if (!this.animals.has(r[0])) {
                    const e = new _entities_Animal_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                        sid: r[0],
                        index: r[1],
                        x: r[2],
                        y: r[3],
                        dir: r[4]
                    });
                    this.animals.set(r[0], e);
                    continue;
                }
                const h = this.animals.get(r[0]);
                h.setTickData(r);
                h.visible = true;
                this.animalsInStream += 1;
            }
        }
        interpolate() {
            const {renderer: e} = cow;
            const t = e.nowUpdate - 1e3 / (window.config?.serverUpdateRate || 10);
            this.eachVisible(t => {
                t.dt += e.delta;
                const n = 170;
                const r = Math.min(1.7, t.dt / n);
                const h = t.x2 - t.x1;
                const p = t.y2 - t.y1;
                t.setTo(t.x1 + h * r, t.y1 + p * r);
            });
        }
        update() {
            this.interpolate();
        }
    }
    const x = AnimalsManager;
    class ObjectsManager {
        constructor() {
            this.objects = new Map;
            this.objectsInStream = 0;
        }
        get list() {
            return [ ...this.objects.values() ];
        }
        getById(e) {
            return this.objects.get(e);
        }
        each(e) {
            this.objects.forEach(e);
        }
        eachVisible(e) {
            const t = this.list.filter(e => e.active && e.visible);
            for (let n = 0; n < t.length; n++) {
                const r = t[n];
                if (!r.visible || !r.active) return;
                e(r);
            }
        }
        disableAllObjects(e) {
            this.each(t => {
                if (!t.owner || t.owner.sid !== e) return;
                this.objects.delete(t.sid);
            });
        }
        onAddGameObject(e) {}
        add(e, t, n, r, h, p, g, m, y) {
            let k = this.getById(e);
            if (!k) {
                k = new _entities_GameObject_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
                    sid: e
                });
                this.objects.set(e, k);
            }
            if (m) k.sid = e;
            k.init(t, n, r, h, p, g, m, y);
            this.onAddGameObject(k);
        }
        checkItemLocation(e, t, n, r, h, p, g) {
            const {CowUtils: m} = window;
            const y = {
                x: e,
                y: t
            };
            let k = true;
            let b = null;
            this.eachVisible(e => {
                if (!k) return;
                const t = e.blocker ? e.blocker : e.isItem ? e.scale : e.getScale(r, e.isItem);
                if (m.getDistance(y, e) < n + t) {
                    k = false;
                    b = e;
                }
            });
            if (!p && h != 18 && t >= re.config.mapScale / 2 - re.config.riverWidth / 2 && t <= re.config.mapScale / 2 + re.config.riverWidth / 2) {
                k = false;
            }
            return !g ? k : b;
        }
        update() {
            this.objectsInStream = 0;
            this.each(e => {
                if (!re.player.canSee(e)) {
                    return e.setVisible(false);
                }
                e.setVisible(true);
                this.objectsInStream += 1;
                e.update();
            });
        }
    }
    const C = ObjectsManager;
    class PlayersManager {
        constructor() {
            this.players = new Map;
            this.playersInStream = 0;
        }
        get list() {
            return [ ...this.players.values() ];
        }
        getById(e) {
            return this.players.get(e);
        }
        each(e) {
            this.players.forEach(e);
        }
        eachVisible(e) {
            this.each(t => {
                if (!t.visible) return;
                e(t);
            });
        }
        addPlayer(e, t) {
            if (!this.players.has(e[1])) {
                this.players.set(e[1], new r({
                    id: e[0],
                    sid: e[1]
                }));
            }
            const n = this.players.get(e[1]);
            n.visible = false;
            n.x2 = undefined;
            n.y2 = undefined;
            n.spawn();
            n.setInitData(e);
            if (t) re.setPlayer(n);
        }
        removePlayer(e) {
            if (!this.players.has(e)) return;
            this.players.delete(e);
        }
        updatePlayers(e) {
            const t = 13;
            this.playersInStream = 0;
            this.eachVisible(e => e.disable());
            for (let n = 0; n < e.length; n += t) {
                const r = e.slice(n, n + t);
                if (!this.players.has(r[0])) continue;
                const h = this.players.get(r[0]);
                h.setTickData(r);
                this.playersInStream += 1;
            }
        }
        interpolate() {
            const {CowUtils: e} = window;
            const {renderer: t} = re;
            const n = t.nowUpdate - 1e3 / (window.config?.serverUpdateRate || 9);
            this.eachVisible(r => {
                r.dt += t.delta;
                const h = r.time2 - r.time1;
                const p = n - r.time1;
                const g = h / p;
                const m = 170;
                const y = Math.min(1.7, r.dt / m);
                const k = r.x2 - r.x1;
                const b = r.y2 - r.y1;
                r.setTo(r.x1 + k * y, r.y1 + b * y);
                r.dir = e.lerpAngle(r.dir2, r.dir1, Math.min(1.2, g));
            });
        }
        update() {
            this.interpolate();
            this.eachVisible(e => {
                const t = e.weaponIndex > 8 ? "secondary" : "primary";
                const n = e.reloads[t];
                if (e.weaponIndex === n.id && n.count < n.max) {
                    n.date2 = Date.now();
                }
            });
        }
    }
    class Camera {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.distance = 0;
            this.angle = 0;
            this.speed = 0;
            this.xOffset = 0;
            this.yOffset = 0;
        }
        setTo(e, t) {
            this.x = e;
            this.y = t;
        }
        update() {
            if (re.player?.alive) {
                const {CowUtils: e} = window;
                this.distance = e.getDistance(this, re.player);
                this.angle = e.getDirection(re.player, this);
                this.speed = Math.min(this.distance * .01 * re.renderer.delta, this.distance);
                if (this.distance > .05) {
                    this.x += this.speed * Math.cos(this.angle);
                    this.y += this.speed * Math.sin(this.angle);
                } else {
                    this.setTo(re.player.x, re.player.y);
                }
            } else {
                this.setTo(re.config.mapScale / 2, re.config.mapScale / 2);
            }
            this.xOffset = this.x - re.config.maxScreenWidth / 2;
            this.yOffset = this.y - re.config.maxScreenHeight / 2;
        }
    }
    const v = Camera;
    class Renderer {
        constructor() {
            this.canvas = void 0;
            this.context = void 0;
            this.renders = new Map;
            this.nowUpdate = void 0;
            this.lastUpdate = this.nowUpdate;
            this.delta = 0;
            window.addEventListener("load", this.init.bind(this));
        }
        addRender(e, t) {
            if (typeof e !== "string") return;
            if (!(t instanceof Function)) return;
            if (!this.renders.has(e)) {
                this.renders.set(e, new Map);
            }
            const n = this.renders.get(e);
            n.set(n.size + 1, t);
        }
        _updateAll() {
            re.camera.update();
            re.playersManager.update();
            re.objectsManager.update();
            re.animalsManager.update();
            re.input.keyboard.update();
        }
        updateFrame() {
            this.nowUpdate = Date.now();
            this.delta = this.nowUpdate - this.lastUpdate;
            this.lastUpdate = this.nowUpdate;
            requestAnimationFrame(this.updateFrame.bind(this));
            this._updateAll();
            if (!re.player) return;
            this.renders.forEach(e => {
                if (!e.size) return;
                e.forEach(e => {
                    e();
                });
            });
        }
        init() {
            this.canvas = document.getElementById("gameCanvas");
            this.context = this.canvas.getContext("2d");
            this.updateFrame();
        }
    }
    const D = Renderer;
    function loadAI(e) {
        re.animalsManager.updateAnimals(e);
    }
    const R = loadAI;
    function addProjectile(e, t, n, r, h, p, g, m) {
        const y = r == 700 && h == 1.5 && p === 1;
        const {CowUtils: k} = window;
        const b = 70;
        const A = {
            x: p == 1 ? e : e - b * Math.cos(n),
            y: p == 1 ? t : t - b * Math.sin(n)
        };
        const _ = y ? "turret" : "secondary";
        const O = re.playersManager.list.filter(e => e.visible && k.getDistance(A.x, A.y, e.x2, e.y2) <= e.scale).sort((e, t) => {
            e = k.getDistance(A.x, A.y, e.x2, e.y2);
            t = k.getDistance(A.x, A.y, t.x2, t.y2);
            return e - t;
        })[0];
        if (O) {
            O.reloads[_].clear();
        }
    }
    const L = addProjectile;
    function killObject(e) {
        const t = re.objectsManager.getById(e);
        if (!t) return;
        t.setActive(false);
    }
    const U = killObject;
    function killObjects(e) {
        if (!e) return;
        re.objectsManager.disableAllObjects(e);
    }
    const j = killObjects;
    function loadGameObject(e) {
        const t = 8;
        for (let n = 0; n < e.length; n += t) {
            const r = e.slice(n, n + t);
            r[6] = re.items.list[r[6]];
            if (r[7] >= 0) {
                r[7] = {
                    sid: r[7]
                };
            }
            re.objectsManager.add(...r);
        }
    }
    const H = loadGameObject;
    function wiggleGameObject(e, t) {
        const n = re.objectsManager.getById(t);
        if (!n) return;
        n.doWiggle(e);
    }
    const B = wiggleGameObject;
    function addPlayer(e, t) {
        re.playersManager.addPlayer(e, t);
    }
    function gatherAnimation(e, t, n) {
        const r = re.playersManager.getById(e);
        if (!r) return;
        r.onGather(t, n);
    }
    const G = gatherAnimation;
    function killPlayer() {
        re.player.kill();
    }
    const N = killPlayer;
    function removePlayer(e) {
        if (re.playersManager.players.size <= 1) return;
        const t = re.playersManager.list.find(t => t.id === e);
        if (!t) return;
        re.playersManager.removePlayer(t.sid);
    }
    const W = removePlayer;
    function updateHealth(e, t) {
        const n = re.playersManager.getById(e);
        if (!n) return;
        n.changeHealth(t);
    }
    const F = updateHealth;
    function updatePlayers(e) {
        re.playersManager.updatePlayers(e);
        re.ticker.updateTicks();
    }
    const V = updatePlayers;
    function updateItemCounts(e, t) {
        re.player.itemCounts[e] = t;
    }
    const K = updateItemCounts;
    function updateItems(e, t) {
        if (!e?.length) return;
        const n = t ? "weapons" : "items";
        re.player[n] = e;
    }
    const q = updateItems;
    function updatePlayerValue(e, t, n) {
        if (!re.player) return;
        re.player[e] = t;
    }
    const J = updatePlayerValue;
    function setupGame(e) {
        X.setPlayerSid(e);
    }
    const Y = n.designations.packets.server;
    function getEvents() {
        return {
            [Y.SETUP_GAME]: setupGame,
            [Y.ADD_PLAYER]: addPlayer,
            [Y.KILL_PLAYER]: N,
            [Y.REMOVE_PLAYER]: W,
            [Y.UPDATE_PLAYERS]: V,
            [Y.UPDATE_ITEM_COUNTS]: K,
            [Y.UPDATE_PLAYER_VALUE]: J,
            [Y.UPDATE_HEALTH]: F,
            [Y.UPDATE_ITEMS]: q,
            [Y.GATHER_ANIMATION]: G,
            [Y.ADD_PROJECTILE]: L,
            [Y.LOAD_GAME_OBJECT]: H,
            [Y.KILL_OBJECT]: U,
            [Y.KILL_OBJECTS]: j,
            [Y.WIGGLE_GAME_OBJECT]: B,
            [Y.LOAD_AI]: R
        };
    }
    const z = n.designations.packets.server;
    class Handler {
        static handlerKeys={
            "socket-open": "onSocketOpen",
            "socket-message": "onSocketMessage",
            "socket-close": "onSocketClose"
        };
        constructor({socket: e}) {
            this.socket = e;
            this.packetsListeners = new Map;
            this.firstMessage = false;
        }
        onPacket(e, t) {
            if (typeof e !== "string" || !(t instanceof Function)) return;
            if (!this.packetsListeners.has(e)) {
                this.packetsListeners.set(e, new Map);
            }
            const n = this.packetsListeners.get(e);
            n.set(n.size + 1, t);
        }
        dispatchPacket(e, ...t) {
            if (e === z.IO_INIT) {
                this.socket.setIoSocketId(t[0]);
                return;
            }
            this.packetsListeners.forEach((n, r) => {
                if (!n.size || r !== e) return;
                n.forEach(e => e(...t));
            });
        }
        onSocketOpen() {}
        onSocketMessage(e) {
            if (!this.firstMessage) {
                const e = getEvents();
                for (const t in e) {
                    this.onPacket(t, e[t]);
                }
                this.firstMessage = true;
            }
            if (!(e.data instanceof ArrayBuffer) || !re.codec.isReady) return;
            const t = re.codec.decoder.decode(new Uint8Array(e.data));
            if (!t?.length) return;
            const n = t[0];
            const r = t[1] ?? [];
            this.dispatchPacket(n, ...Array.isArray(r) ? r : [ r ]);
        }
        onSocketClose() {
            const {plugins: e} = re.config.designations;
            re.executePlugin(e.AUTO_RECONECT);
        }
        handle(e, t) {
            const n = Handler.handlerKeys[e];
            const r = this[n];
            if (r instanceof Function) r.call(this, t);
        }
    }
    class Manager {
        static triggerKeys={
            "set-websocket": "onWebSocketSetted"
        };
        constructor({socket: e}) {
            this.socket = e;
        }
        onWebSocketSetted() {
            const {handler: e} = this.socket;
            this.socket.onEvent("open", e.handle.bind(e, "socket-open"));
            this.socket.onEvent("message", e.handle.bind(e, "socket-message"));
            this.socket.onEvent("close", e.handle.bind(e, "socket-close"));
        }
        trigger(e, ...t) {
            const n = Manager.triggerKeys[e];
            const r = this[n];
            if (r instanceof Function) r.call(this, ...t);
        }
    }
    class Socket {
        constructor() {
            this.websocket = undefined;
            this.ioSocketId = undefined;
            this.playerSid = undefined;
            this.handler = new Handler({
                socket: this
            });
            this.manager = new Manager({
                socket: this
            });
        }
        get isCreated() {
            return typeof this.websocket !== "undefined";
        }
        get isReady() {
            return this.websocket?.readyState === 1;
        }
        send(e, t) {
            if (!this.isReady || !Q.isReady) return;
            const n = Array.isArray(t) ? t : [ t ];
            const r = Q.encoder.encode([ e, n ]);
            this.websocket.send(r);
        }
        onEvent(e, t) {
            if (!this.isCreated) return;
            if (e.startsWith("on")) {
                this.websocket[e] = t;
                return;
            }
            this.websocket.addEventListener(e, t);
        }
        setIoSocketId(e) {
            if (typeof e === "number") this.ioSocketId = e;
        }
        setSocketId(e) {
            this.setPlayerSid(e);
        }
        setPlayerSid(e) {
            if (typeof e === "number") this.playerSid = e;
        }
        setWebSocket(e) {
            if (!Q.isReady) return;
            if (this.websocket instanceof WebSocket) return;
            if (!(e instanceof WebSocket)) return;
            const t = e.url || "";
            if (!/moomoo\.io/i.test(t) && !t.includes("localhost:3000")) return;
            this.websocket = e;
            this.manager.trigger("set-websocket");
        }
    }
    const Q = {
        decoder: void 0,
        encoder: void 0,
        isReady: false
    };
    const X = new Socket;
    const $ = new PlayersManager;
    const Z = new C;
    const ee = new x;
    const te = new P;
    const se = new v;
    const ae = new D;
    const ie = new T;
    const ne = new Placement;
    const re = new Cow;
    class CowUtils {
        static removeProto(e) {
            if (!(e instanceof Object)) return;
            return JSON.parse(JSON.stringify(e));
        }
        static randInt(e, t) {
            return Math.floor(CowUtils.randFloat(e, t));
        }
        static randFloat(e, t) {
            if (typeof t === "undefined") {
                t = e;
                e = 0;
            }
            return Math.random() * (t - e + 1) + e;
        }
        static toRadians(e) {
            return e * .01745329251;
        }
        static lerp(e, t, n) {
            return e + (t - e) * n;
        }
        static kFormat(e) {
            e = parseFloat(e);
            return e > 999 ? `${(e / 1e3).toFixed(1)}k` : e;
        }
        static fixAngle(e) {
            return Math.atan2(Math.cos(e), Math.sin(e));
        }
        static getDistance(e, t, n, r) {
            if (e instanceof Object && t instanceof Object) {
                return Math.hypot(e.y - t.y, e.x - t.x);
            }
            return Math.hypot(t - r, e - n);
        }
        static getDirection(e, t, n, r) {
            if (e instanceof Object && t instanceof Object) {
                return Math.atan2(e.y - t.y, e.x - t.x);
            }
            return Math.atan2(t - r, e - n);
        }
        static getAngleDist(e, t) {
            const n = Math.abs(t - e) % (Math.PI * 2);
            return n > Math.PI ? Math.PI * 2 - n : n;
        }
        static lerpAngle(e, t, n) {
            const r = Math.abs(t - e);
            if (r > Math.PI) {
                if (e > t) {
                    t += Math.PI * 2;
                } else {
                    e += Math.PI * 2;
                }
            }
            const h = t + (e - t) * n;
            if (h >= 0 && h <= Math.PI * 2) return h;
            return h % (Math.PI * 2);
        }
        static createHook({property: e, proto: t = Object.prototype, setter: n, getter: r}) {
            const h = Symbol(e);
            Object.defineProperty(t, e, {
                get() {
                    typeof r === "function" && r(this, this[h]);
                    return this[h];
                },
                set(e) {
                    typeof n === "function" && n(this, e);
                    this[h] = e;
                }
            });
            return h;
        }
    }
    const oe = CowUtils;
    function syncGameConfig() {
        const e = typeof window !== "undefined" ? window.config : null;
        if (!e || typeof e !== "object") return;
        const t = [ "maxScreenWidth", "maxScreenHeight", "mapScale", "riverWidth", "gatherAngle", "hitAngle", "shieldAngle", "gatherWiggle", "serverUpdateRate" ];
        for (const r of t) {
            if (e[r] !== undefined) {
                re.config[r] = e[r];
                n[r] = e[r];
            }
        }
    }
    function stripRegion(e) {
        if (typeof e !== "string") return e;
        const {regionPrefix: t, digitalOceanPrefix: n} = getVultrConfig();
        if (e.startsWith(t)) return e.slice(t.length);
        if (e.startsWith(n)) return e.slice(n.length);
        return e;
    }
    function parseServerQuery(e) {
        const t = new URLSearchParams(location.search);
        const n = e ?? t.get("server");
        if (typeof n !== "string" || !n.length) return null;
        const [r, h] = n.split(":");
        return {
            region: stripRegion(r),
            gameIndex: h,
            password: t.get("password"),
            wssPath: `wss://${stripRegion(r)}`
        };
    }
    function getVultrConfig() {
        return window.Cow?.config?.vultr ?? {
            regionPrefix: "vultr:",
            digitalOceanPrefix: "do:"
        };
    }
    function resolveApiBase(e = location.hostname) {
        const t = getVultrConfig();
        if (e === "sandbox-dev.moomoo.io" || e === "sandbox.moomoo.io") return t.defaultApiSandbox ?? "https://api-sandbox.moomoo.io";
        if (e === "dev.moomoo.io" || e === "dev2.moomoo.io") return t.defaultApiDev ?? "https://api-dev.moomoo.io";
        return t.defaultApiProd ?? "https://api.moomoo.io";
    }
    const encode = function(e) {
        const t = 4294967296;
        let n, r, h = new Uint8Array(128), p = 0;
        return a(e), h.subarray(0, p);
        function a(e) {
            switch (typeof e) {
              case "undefined":
                o();
                break;

              case "boolean":
                !function(e) {
                    s(e ? 195 : 194);
                }(e);
                break;

              case "number":
                !function(e) {
                    if (isFinite(e) && Math.floor(e) === e) if (e >= 0 && e <= 127) s(e); else if (e < 0 && e >= -32) s(e); else if (e > 0 && e <= 255) c([ 204, e ]); else if (e >= -128 && e <= 127) c([ 208, e ]); else if (e > 0 && e <= 65535) c([ 205, e >>> 8, e ]); else if (e >= -32768 && e <= 32767) c([ 209, e >>> 8, e ]); else if (e > 0 && e <= 4294967295) c([ 206, e >>> 24, e >>> 16, e >>> 8, e ]); else if (e >= -2147483648 && e <= 2147483647) c([ 210, e >>> 24, e >>> 16, e >>> 8, e ]); else if (e > 0 && e <= 0x10000000000000000) {
                        let n = e / t, r = e % t;
                        c([ 211, n >>> 24, n >>> 16, n >>> 8, n, r >>> 24, r >>> 16, r >>> 8, r ]);
                    } else e >= -0x8000000000000000 && e <= 0x8000000000000000 ? (s(211), u(e)) : c(e < 0 ? [ 211, 128, 0, 0, 0, 0, 0, 0, 0 ] : [ 207, 255, 255, 255, 255, 255, 255, 255, 255 ]); else r || (n = new ArrayBuffer(8), 
                    r = new DataView(n)), r.setFloat64(0, e), s(203), c(new Uint8Array(n));
                }(e);
                break;

              case "string":
                !function(e) {
                    let t = function(e) {
                        let t = !0, n = e.length;
                        for (let r = 0; r < n; r++) if (e.charCodeAt(r) > 127) {
                            t = !1;
                            break;
                        }
                        let r = 0, h = new Uint8Array(e.length * (t ? 1 : 4));
                        for (let t = 0; t !== n; t++) {
                            let p = e.charCodeAt(t);
                            if (p < 128) h[r++] = p; else {
                                if (p < 2048) h[r++] = p >> 6 | 192; else {
                                    if (p > 55295 && p < 56320) {
                                        if (++t >= n) throw new Error("UTF-8 encode: incomplete surrogate pair");
                                        let g = e.charCodeAt(t);
                                        if (g < 56320 || g > 57343) throw new Error("UTF-8 encode: second surrogate out of range");
                                        p = 65536 + ((1023 & p) << 10) + (1023 & g);
                                        h[r++] = p >> 18 | 240;
                                        h[r++] = p >> 12 & 63 | 128;
                                    } else h[r++] = p >> 12 | 224;
                                    h[r++] = p >> 6 & 63 | 128;
                                }
                                h[r++] = 63 & p | 128;
                            }
                        }
                        return t ? h : h.subarray(0, r);
                    }(e), n = t.length;
                    n <= 31 ? s(160 + n) : c(n <= 255 ? [ 217, n ] : n <= 65535 ? [ 218, n >>> 8, n ] : [ 219, n >>> 24, n >>> 16, n >>> 8, n ]), 
                    c(t);
                }(e);
                break;

              case "object":
                null === e ? o() : e instanceof Date ? function(e) {
                    let n = e.getTime() / 1e3;
                    if (0 === e.getMilliseconds() && n >= 0 && n < 4294967296) c([ 214, 255, n >>> 24, n >>> 16, n >>> 8, n ]); else if (n >= 0 && n < 17179869184) {
                        let r = 1e6 * e.getMilliseconds();
                        c([ 215, 255, r >>> 22, r >>> 14, r >>> 6, r << 2 >>> 0 | n / t, n >>> 24, n >>> 16, n >>> 8, n ]);
                    } else {
                        let t = 1e6 * e.getMilliseconds();
                        c([ 199, 12, 255, t >>> 24, t >>> 16, t >>> 8, t ]), u(n);
                    }
                }(e) : Array.isArray(e) ? f(e) : e instanceof Uint8Array || e instanceof Uint8ClampedArray ? function(e) {
                    let t = e.length;
                    c(t <= 15 ? [ 196, t ] : t <= 65535 ? [ 197, t >>> 8, t ] : [ 198, t >>> 24, t >>> 16, t >>> 8, t ]), 
                    c(e);
                }(e) : e instanceof Int8Array || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array ? f(e) : function(e) {
                    let t = 0;
                    for (let n in e) t++;
                    t <= 15 ? s(128 + t) : c(t <= 65535 ? [ 222, t >>> 8, t ] : [ 223, t >>> 24, t >>> 16, t >>> 8, t ]);
                    for (let t in e) a(t), a(e[t]);
                }(e);
            }
        }
        function o() {
            s(192);
        }
        function f(e) {
            let t = e.length;
            t <= 15 ? s(144 + t) : c(t <= 65535 ? [ 220, t >>> 8, t ] : [ 221, t >>> 24, t >>> 16, t >>> 8, t ]);
            for (let n = 0; n < t; n++) a(e[n]);
        }
        function s(e) {
            if (h.length < p + 1) {
                let e = 2 * h.length;
                for (;e < p + 1; ) e *= 2;
                let t = new Uint8Array(e);
                t.set(h), h = t;
            }
            h[p] = e, p++;
        }
        function c(e) {
            if (h.length < p + e.length) {
                let t = 2 * h.length;
                for (;t < p + e.length; ) t *= 2;
                let n = new Uint8Array(t);
                n.set(h), h = n;
            }
            h.set(e, p), p += e.length;
        }
        function u(e) {
            let n, r;
            e >= 0 ? (n = e / t, r = e % t) : (e++, n = Math.abs(e) / t, r = Math.abs(e) % t, 
            n = ~n, r = ~r), c([ n >>> 24, n >>> 16, n >>> 8, n, r >>> 24, r >>> 16, r >>> 8, r ]);
        }
    };
    const ce = encode;
    const decode = function(e) {
        const t = 4294967296;
        let n = 0;
        if (e instanceof ArrayBuffer) e = new Uint8Array(e);
        if (typeof e != "object" || e.length === undefined) throw new Error("Expected byte array to deserialize.");
        if (!e.length) throw new Error("Empty MessagePack buffer.");
        e instanceof Uint8Array || (e = new Uint8Array(e));
        return i();
        function i() {
            const t = e[n++];
            if (t >= 0 && t <= 127) return t;
            if (t >= 128 && t <= 143) return l(t - 128);
            if (t >= 144 && t <= 159) return c(t - 144);
            if (t >= 160 && t <= 191) return d(t - 160);
            if (192 === t) return null;
            if (193 === t) throw new Error("Invalid byte code 0xc1.");
            if (194 === t) return !1;
            if (195 === t) return !0;
            if (196 === t) return a(-1, 1);
            if (197 === t) return a(-1, 2);
            if (198 === t) return a(-1, 4);
            if (199 === t) return w(-1, 1);
            if (200 === t) return w(-1, 2);
            if (201 === t) return w(-1, 4);
            if (202 === t) return u(4);
            if (203 === t) return u(8);
            if (204 === t) return o(1);
            if (205 === t) return o(2);
            if (206 === t) return o(4);
            if (207 === t) return o(8);
            if (208 === t) return f(1);
            if (209 === t) return f(2);
            if (210 === t) return f(4);
            if (211 === t) return f(8);
            if (212 === t) return w(1);
            if (213 === t) return w(2);
            if (214 === t) return w(4);
            if (215 === t) return w(8);
            if (216 === t) return w(16);
            if (217 === t) return d(-1, 1);
            if (218 === t) return d(-1, 2);
            if (219 === t) return d(-1, 4);
            if (220 === t) return c(-1, 2);
            if (221 === t) return c(-1, 4);
            if (222 === t) return l(-1, 2);
            if (223 === t) return l(-1, 4);
            if (t >= 224 && t <= 255) return t - 256;
            throw new Error("Invalid msgpack byte at index " + (n - 1));
        }
        function f(t) {
            let r = 0, h = !0;
            for (;t-- > 0; ) if (h) {
                let t = e[n++];
                r += 127 & t, 128 & t && (r -= 128), h = !1;
            } else r *= 256, r += e[n++];
            return r;
        }
        function o(t) {
            let r = 0;
            for (;t-- > 0; ) r *= 256, r += e[n++];
            return r;
        }
        function u(t) {
            let r = new DataView(e.buffer, n, t);
            return n += t, 4 === t ? r.getFloat32(0, !1) : r.getFloat64(0, !1);
        }
        function a(t, r) {
            t < 0 && (t = o(r));
            let h = e.subarray(n, n + t);
            return n += t, h;
        }
        function l(e, t) {
            e < 0 && (e = o(t));
            let n = {};
            for (;e-- > 0; ) n[i()] = i();
            return n;
        }
        function c(e, t) {
            e < 0 && (e = o(t));
            let n = [];
            for (;e-- > 0; ) n.push(i());
            return n;
        }
        function d(t, r) {
            t < 0 && (t = o(r));
            let h = n;
            n += t;
            let p = h, g = t + h, m = "";
            for (;p < g; ) {
                let t = e[p++];
                if (t > 127) {
                    if (t > 191 && t < 224) {
                        if (p >= g) throw new Error("UTF-8: incomplete 2-byte");
                        t = (31 & t) << 6 | 63 & e[p++];
                    } else if (t > 223 && t < 240) {
                        if (p + 1 >= g) throw new Error("UTF-8: incomplete 3-byte");
                        t = (15 & t) << 12 | (63 & e[p++]) << 6 | 63 & e[p++];
                    } else {
                        if (!(t > 239 && t < 248)) throw new Error("UTF-8: bad start");
                        if (p + 2 >= g) throw new Error("UTF-8: incomplete 4-byte");
                        t = (7 & t) << 18 | (63 & e[p++]) << 12 | (63 & e[p++]) << 6 | 63 & e[p++];
                    }
                }
                if (t <= 65535) m += String.fromCharCode(t); else {
                    t -= 65536;
                    m += String.fromCharCode(t >> 10 | 55296, 1023 & t | 56320);
                }
            }
            return m;
        }
        function w(e, n) {
            e < 0 && (e = o(n));
            let r = o(1), h = a(e);
            if (255 === r) {
                if (4 === h.length) {
                    let e = (h[0] << 24) + (h[1] << 16) + (h[2] << 8) + h[3];
                    return new Date(1e3 * e);
                }
                if (8 === h.length) {
                    let e = (h[0] << 22) + (h[1] << 14) + (h[2] << 6) + (h[3] >>> 2), n = (3 & h[3]) * t + (h[4] << 24) + (h[5] << 16) + (h[6] << 8) + h[7];
                    return new Date(1e3 * n + e / 1e6);
                }
            }
            return {
                type: r,
                data: h
            };
        }
    };
    const le = decode;
    function initCodec() {
        Q.encoder = {
            encode: ce
        };
        Q.decoder = {
            decode: le
        };
        Q.isReady = true;
    }
    function tryHookExtensionCodec() {
        oe.createHook({
            property: "extensionCodec",
            setter(e) {
                if (typeof Q.encoder !== "undefined" && Q.encoder.encode) {
                    Q.decoder = {
                        decode: t => e.decode(t)
                    };
                    Q.isReady = true;
                    return;
                }
                Q.encoder = {
                    encode: t => e.encode(t)
                };
            }
        });
    }
    initCodec();
    tryHookExtensionCodec();
    const de = WebSocket.prototype.send;
    WebSocket.prototype.send = new Proxy(de, {
        apply(e, t, n) {
            if (!X.isCreated && isGameSocket(t)) {
                X.setWebSocket(t);
            }
            return Reflect.apply(e, t, n);
        }
    });
    const he = Object.getOwnPropertyDescriptor(WebSocket.prototype, "onmessage");
    if (he?.set) {
        const e = he.set;
        Object.defineProperty(WebSocket.prototype, "onmessage", {
            configurable: true,
            enumerable: true,
            get: he.get,
            set(t) {
                e.call(this, function(e) {
                    if (X.websocket === this && Q.isReady) {
                        dispatchToCow(e);
                    }
                    if (typeof t === "function") {
                        t.call(this, e);
                    }
                });
            }
        });
    }
    function isGameSocket(e) {
        if (!(e instanceof WebSocket)) return false;
        const t = e.url || "";
        return /moomoo\.io/i.test(t) || t.includes("localhost:3000");
    }
    function dispatchToCow(e) {
        const t = e.data;
        if (!(t instanceof ArrayBuffer)) return;
        try {
            const e = new Uint8Array(t);
            const n = Q.decoder.decode(e);
            if (!Array.isArray(n) || n.length < 1) return;
            const r = n[0];
            const h = n[1] ?? [];
            X.handler.dispatchPacket(r, ...Array.isArray(h) ? h : [ h ]);
        } catch (e) {}
    }
    const fe = setInterval(() => {
        const e = document.getElementById("linksContainer2");
        if (!e) return;
        const t = e.innerHTML;
        e.innerHTML = t.replace(/(v\d\.\d\.\d)/gi, `$1 </a> | <a href="#" target="_blank" class="menuLink" style="color: #9f1a1a">${re.config.NAME}</a>`);
        clearInterval(fe);
    }, 3e4);
    setTimeout(() => clearInterval(fe), 3e4);
    const pe = setInterval(() => {
        syncGameConfig();
        if (window.config) clearInterval(pe);
    }, 500);
    setTimeout(() => clearInterval(pe), 6e4);
    window.CowUtils = oe;
    window.Cow = re;
    window.CowJS = {
        stripRegion,
        parseServerQuery,
        syncGameConfig
    };
})();
//# sourceMappingURL=bundle.js.map