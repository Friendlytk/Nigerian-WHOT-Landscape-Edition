# Nigerian WHOT — Landscape Edition

A standalone, browser-based Nigerian WHOT card game packaged as a single HTML file. No build step or external JavaScript framework is required at runtime.

## Game rules and presentation

- Landscape-first, compact game layout designed to avoid page scrolling.
- White card faces with red numbers and shapes.
- Card **3** has no special function.
- Card **5** is **Pick 3** and can only be blocked by another card numbered **5**.
- Card **14** is **General Market**.

## Play locally

Open `index.html` in a modern browser and rotate your phone to landscape. Browsers may restrict programmatic screen-orientation locking, so rotating the device manually may be necessary.

## Publish with GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open the **Actions** tab and check the deployment workflow.
4. After a successful deployment, open **Settings → Pages** and use **Visit site**.

The game is a static website and does not require a server or database. Test the complete gameplay flow on your target phone before treating it as release-ready.

## Project structure

```text
.
├── index.html
├── README.md
├── LICENSE
├── .gitignore
├── .nojekyll
└── .github/
    └── workflows/
        └── pages.yml
```
