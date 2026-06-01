# How to update the live site

Your site is live at **https://blackmanstoolkit.netlify.app/** and auto-deploys from the
GitHub repo **github.com/richardfagbolagun1-tech/blackmanstoolkit**.

Every time you push to the `main` branch, Netlify rebuilds and the site goes live in ~30 seconds.
You do NOT need to touch the Netlify dashboard ever again.

This folder is a clean, ready-to-deploy copy of the site. Here is the loop.

---

## ONE-TIME SETUP (do this once)

1. Install git if you don't have it: https://git-scm.com/downloads
2. Clone your repo to your computer (pick a folder you'll remember):

   ```
   git clone https://github.com/richardfagbolagun1-tech/blackmanstoolkit.git
   ```

   That makes a folder called `blackmanstoolkit`. This is your "local repo".

---

## EVERY TIME YOU WANT TO PUBLISH CHANGES

1. In the design tool, say **"ship it"** — I rebuild this `deploy/` folder and give you a
   fresh download.
2. Unzip the download.
3. Copy **everything inside the deploy folder** into your local repo folder, replacing the
   old files when asked. (Copy the contents — `index.html`, `assets/`, `chapters/`, `tools/`,
   `netlify.toml`, etc. — into the `blackmanstoolkit` folder.)
4. Open a terminal in the `blackmanstoolkit` folder and run:

   ```
   bash push.sh
   ```

   (Or, if you prefer to type the commands yourself:)

   ```
   git add -A
   git commit -m "Update site"
   git push origin main
   ```

5. Wait ~30 seconds. Refresh https://blackmanstoolkit.netlify.app/ — your changes are live.

---

## WHAT IS IN THIS FOLDER

These are the only files that make up the website:

```
index.html              Homepage
about.html              Introduction
quiz.html               Where-to-start quiz
resources.html          Resource finder
bookmarks.html          Saved-for-later list
lgbtq.html              For LGBTQ+ brothers
listen-watch.html       Listen & watch
print.html              Print & pocket cards
netlify.toml            Netlify config (publish dir + clean URLs) — keep this
push.sh                 The one-command publish script

chapters/               The 6 chapters (body, mind, money, spirit, brotherhood, community)
tools/                  In-the-moment tools (de-mask, feelings-wheel, field-guide, etc.)
assets/                 style.css, the JS files, and assets/img/ (all the photos)
```

Anything NOT in this folder (booklets, print exports, design experiments) is intentionally
left out — it is not part of the public website.

---

## IMPORTANT: heads-up before your first push

The version you've been building in the design tool is a NEWER design than what is currently
live (new Hanken Grotesk type, navy palette, and new pages: LGBTQ+, Listen & watch, Print,
Tools). Pushing this will REPLACE the older live design with your new one. That's expected —
just know the public site will visibly change the moment you push.
