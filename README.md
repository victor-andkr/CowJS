# CowJS

CowJS is an open-source API for modding [MooMoo.io](https://moomoo.io/), structured like [MooMoo.js](https://github.com/NuroC/MooMoo.js). It hooks WebSocket traffic, exposes game state (players, objects, input, rendering), and lets you build Tampermonkey mods without hand-parsing packets.

## Features

- **Packet hooks** — listen to and send named packets via `Cow.onPacket` / `Cow.sendPacket`
- **Game state** — players, objects, animals, local player, camera, ticker
- **Input** — keyboard and mouse helpers
- **Placement** — automated build placement with delay control
- **Rendering** — custom render passes on the game canvas
- **Plugins** — built-in helpers (e.g. auto-reconnect)
- **Config** — hats, weapons, groups, packet designations in `src/game_configs/`

## Project layout (mirrors MooMoo.js)

```
CowJS/
├── src/
│   ├── index.js          # entry — exposes window.Cow & window.CowUtils
│   ├── Cow.js            # main API class
│   ├── constants.js      # singletons (socket, managers, cow instance)
│   ├── hooks.js          # WebSocket / codec hooks
│   ├── config.json
│   ├── game_configs/
│   ├── modules/
│   └── utils/
├── dist/
│   └── bundle.js         # webpack output (userscript / Greasy Fork)
├── webpack.config.js
└── package.json
```

## First-time setup

See **[SETUP.md](SETUP.md)**. On Windows, from this folder:

```powershell
npm run setup
```

This copies `Downloads\CowJS.js`, extracts all `src/` modules from the bundle, installs dependencies, and builds `dist/bundle.js`.

## Development

```bash
npm install
npm run build      # produces dist/bundle.js
npm run watch      # rebuild on change
npm run extract    # re-extract src/ from vendor/CowJS.bundle.js
```

## Game compatibility (`index-CRtgW-HM.js` v1.8.1)

Validated against **`index-CRtgW-HM.js-1.8.1.user.js`** (May 2026 client). Packet letters are unchanged vs `index-eb87bff7.js`; the client now uses Svelte UI and no longer exposes `window.config`.

See **[COMPATIBILITY.md](COMPATIBILITY.md)** for packet codes, Vultr, and why `window.me` is a UI store (not the player).

```javascript
// Server packet (letter "a")
Cow.onPacket(Cow.serverPackets.UPDATE_PLAYERS, (data) => { /* ... */ });

// Client packet (letter "F" = attack — not the old "d")
Cow.sendPacket(Cow.clientPackets.ATTACK_STATE, 1, angle);

// Local player — use Cow.player, not window.me
if (Cow.player?.alive) { /* ... */ }
```

## Usage in a userscript

Load `dist/bundle.js` on `moomoo.io` (before or with the game bundle):

```javascript
Cow.onPacket("a", (data) => {
  Cow.playersManager.updatePlayers(data);
});

Cow.sendPacket("6", "hello from CowJS");
```

Globals: `window.Cow`, `window.CowUtils`, `window.CowJS` (Vultr helpers).

## License

MIT — see [LICENSE](LICENSE).

## Credits

- Architecture inspired by [MooMoo.js](https://github.com/NuroC/MooMoo.js) by NuroC
- CowJS original bundle and API design
