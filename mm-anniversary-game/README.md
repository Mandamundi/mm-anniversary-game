MM 10th Anniversary Interactive Story Game
=========================================

A desktop-first, pixel-art interactive story quiz built with HTML, CSS, and vanilla JavaScript.

Run Locally
-----------

- Serve the folder with a static server (required for audio policies).
- macOS example:

```bash
cd mm-anniversary-game
python3 -m http.server 8080
```

Open `http://localhost:8080`.

Assets
------

- Add images under `assets/images/` and audio under `assets/audio/`.
- Add font file at `assets/fonts/VCR_OSD_MONO.ttf`.

Notes
-----

- Music starts after pressing Start.
- Mute with the speaker button (🔊/🔇).
- Wire loop mini-game path is a placeholder; adjust `generateLogoPath()` in `js/wiregame.js` for the real logo.

