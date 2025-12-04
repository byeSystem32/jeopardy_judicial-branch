# Judicial Branch Jeopardy (Web Version)

A high-quality, Jeopardy-style review game focused on the **U.S. judicial branch**, designed to be hosted on **GitHub Pages** and played directly in the browser.

- No backend required
- Pure **HTML / CSS / JavaScript**
- Works on desktop, Chromebook, Mac, Windows, and tablets
- Great for civics review or classroom games

## Files

- `index.html` – main page and layout
- `style.css` – Jeopardy-style theming and responsive layout
- `script.js` – game logic, questions, scoring
- `README.md` – this file

## How to Run Locally

1. Download or clone the project.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

No build steps, no dependencies — everything is static.

## How to Deploy on GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Add these files to the **root** of the repo (or a `docs/` folder).
3. Commit and push.

### Enable GitHub Pages

1. Go to your repository **Settings** → **Pages**.
2. Under **Source**, choose:
   - `main` branch, `/ (root)` (if files are in root), or
   - `main` branch, `/docs` (if files are in `docs/`).
3. Click **Save**.

After a short time, your Jeopardy game will be live at:

```text
https://<your-username>.github.io/<your-repo-name>/
```

You and your students can now play directly in the browser.

## Game Content Overview

Categories:
- Supreme Court Basics
- Federal Court System
- Constitution & Powers
- Landmark Cases
- Judicial Vocabulary

Each category has five clues (values $100–$500) covering:
- Structure and powers of the judicial branch
- Federal court levels and jurisdiction
- Key constitutional principles (judicial review, checks and balances, Supremacy Clause)
- Landmark Supreme Court cases
- Essential legal and judicial vocabulary

The answer checking is **forgiving**:
- Ignores capitalization and punctuation
- Accepts equivalent numeric forms (e.g., `9` vs. `nine`)
- Allows minor wording differences as long as key terms are present

Perfect for quick review, test prep, or interactive classroom competition.
