# MetaStamp website

A dependency-free static landing page for MetaStamp. In this GitHub Pages repository the site is served from the repository root. The source version is maintained in the iOS project's `website/` directory and uses a compressed WebP sample image.

The demo follows the app’s three steps. Choose photos, clean their metadata on device, then save or send the verified copies. The before-and-after demo changes the metadata report and keeps the same photograph visible.

The header, footer, favicon and Apple touch icon share `assets/app-icon.png`, a 180 × 180 export of the iOS master at `MetaStamp/MetaStamp/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png` in the source project.

## Preview locally

From the source project's repository root:

```bash
python3 -m http.server 8765 --directory website
```

Then open <http://127.0.0.1:8765>.

The page is intentionally plain HTML, CSS, and JavaScript so it can be hosted by any static file server.
