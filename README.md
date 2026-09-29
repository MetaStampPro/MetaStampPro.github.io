# MetaStamp website

A dependency-free static landing page for MetaStamp. The page lives in `website/` and uses a compressed WebP version of the local sample image from the iOS project.

## Preview locally

From the repository root:

```bash
python3 -m http.server 8765 --directory website
```

Then open <http://127.0.0.1:8765>.

The page is intentionally plain HTML, CSS, and JavaScript so it can be hosted by any static file server.
