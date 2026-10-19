# Chess with Claude: standalone site

A static, installable version of the Chess with Claude game. The `site/` folder is ready to host on
Cloudflare Pages (or any static host). On a phone it can be added to the home screen and works offline.

## What's in this folder

| Path | What it is |
|---|---|
| `app.html` | The game page. This is the same page as the claude.ai artifact and the one place to make changes. |
| `build.py` | Turns `app.html` into `site/index.html` and regenerates the offline service worker `site/sw.js`. |
| `make_icons.js` | Renders the app icons into `site/icons/` (only needed if you change the icon). |
| `site/` | The finished website: page, local fonts, icons, web-app manifest, service worker and Cloudflare headers. |

## Put it on Cloudflare Pages

Pick one of these:

**A. Upload the folder (quickest, no Git needed)**
1. In the Cloudflare dashboard, open **Workers & Pages** and create a new **Pages** project.
2. Choose to **upload assets** and drop in the `chess/site` folder.
3. Name the project and deploy. You get an address like `https://your-project.pages.dev`.

**B. Connect this GitHub repository (redeploys automatically on every push)**
1. Create a Pages project and connect it to this repository.
2. Build settings: no framework preset, leave the build command empty, set the build output directory to `chess/site`.
3. Deploy. Every push to the chosen branch publishes the latest `site/`.

**C. From a terminal**
```
npx wrangler pages deploy chess/site --project-name chess-with-claude
```

## Install it on a phone

Open the site address once on the phone, then:
- **Android (Chrome):** menu (⋮) → **Install app** or **Add to Home screen**.
- **iPhone (Safari):** Share → **Add to Home Screen**.

It opens full screen with its own icon. After the first visit it also works offline: the engine runs on the phone.

## Updating the site

1. Change `app.html` (or copy in the latest version of the artifact).
2. Run `python3 build.py` from this folder.
3. Deploy `site/` again (or push, with option B). Installed apps pick up the new version the next time they are opened online.

## Differences from the claude.ai version

- **No Claude features.** Claude as an opponent and "Ask Claude to explain" need claude.ai, so they are hidden; the built-in engine (1000 to 2100 Elo) is the opponent.
- **Your data stays on the device.** Finished games (without takebacks), line progress, practice totals and settings are stored in the phone's browser. **New game → Download my games (PGN)** exports your game history. Clearing the browser's site data for the address deletes it.
- **Fonts are served locally** (Bodoni Moda, Figtree, IBM Plex Mono and Noto Sans Symbols 2, all under the SIL Open Font License), so nothing loads from other sites.
