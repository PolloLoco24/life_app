# Planner — Rey's life app

A personal web app with six sections: **Planner, Tasks, Work, Gym, School, News**.
Everything you add is saved in the browser on the device you use it on.

## Files
- `index.html` — the whole app (layout, styles and code)
- `manifest.json`, `icon-*.png`, `apple-touch-icon.png` — let it install like an app on your home screen
- `sw.js` — lets it open without internet once it's hosted

## Try it on your Mac
Double-click `index.html` to open it in your browser. (Data you add here stays in that browser only.)

## Put it on your phone (free, with GitHub Pages)
1. Make a free account at github.com and create a new **public** repository, e.g. `life-app`.
2. Click **Add file → Upload files**, drag in everything in this folder, and click **Commit changes**.
3. Go to **Settings → Pages**. Under "Branch" pick `main` and `/ (root)`, then **Save**.
4. After a minute your app is live at `https://YOUR-USERNAME.github.io/life-app/`.
5. On iPhone: open that link in **Safari** → Share button → **Add to Home Screen**.

## Updating the app later
Upload the changed `index.html` to the same repository. If an old version keeps showing on your phone,
change `VERSION` at the top of `sw.js` (e.g. `planner-v2`) and upload that too.

## Good to know
- Your data lives on the phone's browser. Deleting Safari website data will erase it.
- News headlines come from public RSS feeds (Cageside Seats, 411Mania, Wrestling Inc, IGN, GameSpot, Polygon)
  through the free rss2json.com service. If headlines don't load, the app shows links to the sites instead.

## Ideas for the next version (good Claude Code projects)
- Sync between devices (Firebase or Supabase)
- Reminders for shifts and bills
- Repeating tasks (every week, every month)
- Move to Expo / React Native for an App Store version
