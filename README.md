# MetaStamp website

A dependency-free static landing page for MetaStamp. In this GitHub Pages repository the site is served from the repository root. The source version is maintained in the iOS project's `website/` directory and uses a compressed WebP sample image.

## Preview locally

From the source project's repository root:

```bash
python3 -m http.server 8765 --directory website
```

Then open <http://127.0.0.1:8765>.

The page is intentionally plain HTML, CSS, and JavaScript so it can be hosted by any static file server.
