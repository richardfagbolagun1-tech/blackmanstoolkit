#!/usr/bin/env bash
# Run this from the root of your local blackmanstoolkit repo,
# AFTER you've copied the new files in over the old ones.
# It stages everything (including deletions), commits, and pushes.
# Netlify then auto-deploys within ~30s.

set -e

git add -A
git commit -m "Update site — $(date '+%Y-%m-%d %H:%M')"
git push origin main

echo ""
echo "Pushed. Watch the deploy at: https://app.netlify.com  ->  your site  ->  Deploys"
echo "Live in ~30 seconds at: https://blackmanstoolkit.netlify.app/"
