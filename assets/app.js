// The Black Man's Toolkit — shared app logic
// Progress, bookmarks, audio narration, share, tweakable palette, journal.
(function () {
  const STORE = {
    progress: "bmt:progress",
    bookmarks: "bmt:bookmarks",
    journal: "bmt:journal",
    palette: "bmt:palette",
    checkin: "bmt:checkin",     // [{at:ts, feeling:str, note:str}]
    nudge: "bmt:nudge",         // {channel, value, day, when}
    streakHide: "bmt:streakHide", // bool
  };

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }

  // ---------- PALETTE ----------
  const PALETTES = [
    { id: "navy", name: "Navy", swatches: ["#0a1f44", "#c89b3c", "#ffffff", "#4a5a7a"] },
    { id: "sankofa", name: "Sankofa", swatches: ["#8a1a1a", "#e8a93a", "#f3e9d2", "#1a0d07"] },
    { id: "brixton", name: "Brixton", swatches: ["#c7522a", "#2f5233", "#efe6d3", "#1f1815"] },
    { id: "mansa", name: "Mansa", swatches: ["#2a3a87", "#d97c3a", "#ece4d2", "#0e1428"] },
  ];

  function applyPalette(id) {
    document.documentElement.setAttribute("data-palette", id || "navy");
    write(STORE.palette, id || "navy");
  }

  function buildTweaksPanel() {
    if (document.querySelector(".tweaks-fab")) return;
    const fab = document.createElement("button");
    fab.className = "tweaks-fab";
    fab.setAttribute("aria-label", "Open palette tweaks");
    fab.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`;
    document.body.appendChild(fab);

    const panel = document.createElement("div");
    panel.className = "tweaks-panel";
    panel.innerHTML = `
      <h5>Tweaks <button aria-label="close">&times;</button></h5>
      <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin-bottom:10px;opacity:.65">Colour palette</div>
      <div class="palette-options">
        ${PALETTES.map(p => `
          <button class="palette-option" data-palette="${p.id}">
            <div class="swatches">
              ${p.swatches.map(s => `<span style="background:${s}"></span>`).join("")}
            </div>
            <span>${p.name}</span>
          </button>
        `).join("")}
      </div>
    `;
    document.body.appendChild(panel);

    fab.addEventListener("click", () => {
      panel.classList.toggle("open");
      fab.style.display = panel.classList.contains("open") ? "none" : "inline-flex";
    });
    panel.querySelector("button[aria-label=close]").addEventListener("click", () => {
      panel.classList.remove("open");
      fab.style.display = "inline-flex";
    });
    panel.querySelectorAll(".palette-option").forEach(btn => {
      btn.addEventListener("click", () => {
        applyPalette(btn.dataset.palette);
        refreshPaletteUI();
      });
    });
    refreshPaletteUI();
  }

  function refreshPaletteUI() {
    const cur = document.documentElement.getAttribute("data-palette") || "navy";
    document.querySelectorAll(".palette-option").forEach(b => {
      b.classList.toggle("active", b.dataset.palette === cur);
    });
  }

  // ---------- TOAST ----------
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2400);
  }

  // ---------- PROGRESS ----------
  function markRead(slug) {
    const p = read(STORE.progress, {});
    p[slug] = { done: true, at: Date.now() };
    write(STORE.progress, p);
  }
  function getProgress() { return read(STORE.progress, {}); }

  // ---------- BOOKMARKS ----------
  function getBookmarks() { return read(STORE.bookmarks, []); }
  function isBookmarked(link) { return getBookmarks().some(b => b.link === link); }
  function toggleBookmark(resource, chapterSlug) {
    const list = getBookmarks();
    const i = list.findIndex(b => b.link === resource.link);
    if (i >= 0) {
      list.splice(i, 1);
      write(STORE.bookmarks, list);
      toast("Removed from your saved");
      return false;
    } else {
      list.push({ ...resource, chapter: chapterSlug, savedAt: Date.now() });
      write(STORE.bookmarks, list);
      toast("Saved for later");
      return true;
    }
  }

  // ---------- CHECK-INS ----------
  function getCheckins() { return read(STORE.checkin, []); }
  function addCheckin(entry) {
    const list = getCheckins();
    list.push({ at: Date.now(), ...entry });
    write(STORE.checkin, list);
    return list;
  }
  function lastCheckin() {
    const list = getCheckins();
    return list.length ? list[list.length - 1] : null;
  }

  // ---------- STREAK ----------
  // Streak resets if no check-in in 7 days (brief: not 1).
  // A "day" is a unique calendar date in the local timezone.
  function dayKey(ts) {
    const d = new Date(ts);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function getStreak() {
    const list = getCheckins();
    if (!list.length) return 0;
    // Unique sorted days descending
    const days = Array.from(new Set(list.map(e => dayKey(e.at)))).sort().reverse();
    const now = Date.now();
    const lastDay = new Date(days[0]).getTime();
    // If last check-in older than 7 days, streak is 0.
    if (now - lastDay > 7 * 24 * 60 * 60 * 1000) return 0;
    // Count consecutive days back from the most recent.
    let streak = 1;
    for (let i = 1; i < days.length; i++) {
      const a = new Date(days[i-1]).getTime();
      const b = new Date(days[i]).getTime();
      const diffDays = Math.round((a - b) / (24 * 60 * 60 * 1000));
      if (diffDays === 1) streak++;
      else break;
    }
    return streak;
  }
  function streakHidden() { return !!read(STORE.streakHide, false); }
  function setStreakHidden(v) { write(STORE.streakHide, !!v); }

  // ---------- WEEKLY NUDGE ----------
  function getNudge() { return read(STORE.nudge, null); }
  function setNudge(cfg) { write(STORE.nudge, cfg); }
  function clearNudge() { write(STORE.nudge, null); }

  // ---------- JOURNAL ----------
  function getJournal() { return read(STORE.journal, {}); }
  function saveJournal(slug, idx, text) {
    const j = getJournal();
    if (!j[slug]) j[slug] = {};
    j[slug][idx] = text;
    write(STORE.journal, j);
  }

  // ---------- SHARE ----------
  function share({ title, text, url }) {
    const fullUrl = url || location.href;
    if (navigator.share) {
      navigator.share({ title, text, url: fullUrl }).catch(() => {});
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).then(() => toast("Link copied. Send it to a brother."));
      return;
    }
    toast(fullUrl);
  }
  function shareWhatsApp({ text, url }) {
    const fullUrl = url || location.href;
    const msg = encodeURIComponent(`${text}\n${fullUrl}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  // ---------- AUDIO NARRATION ----------
  let audioState = { playing: false, utter: null };
  function narrate(text) {
    if (!("speechSynthesis" in window)) {
      toast("Audio narration not supported in this browser");
      return false;
    }
    if (audioState.playing) {
      window.speechSynthesis.cancel();
      audioState.playing = false;
      return false;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.92;
    u.pitch = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => /en-GB|UK English Male|British/i.test(v.name + v.lang)) ||
                      voices.find(v => /Male/i.test(v.name)) ||
                      voices[0];
    if (preferred) u.voice = preferred;
    u.onend = () => { audioState.playing = false; updateAudioBtns(); };
    u.onerror = () => { audioState.playing = false; updateAudioBtns(); };
    audioState.utter = u;
    audioState.playing = true;
    window.speechSynthesis.speak(u);
    return true;
  }
  function updateAudioBtns() {
    document.querySelectorAll("[data-narrate]").forEach(b => {
      b.setAttribute("data-active", String(audioState.playing));
    });
  }

  // ---------- INIT on every page ----------
  function init() {
    const saved = read(STORE.palette, "navy");
    applyPalette(saved);
    buildTweaksPanel();

    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {};
    }
  }

  document.addEventListener("DOMContentLoaded", init);

  // expose
  window.BMT = {
    PALETTES, applyPalette,
    toast,
    markRead, getProgress,
    getBookmarks, isBookmarked, toggleBookmark,
    getJournal, saveJournal,
    share, shareWhatsApp,
    narrate, updateAudioBtns, audioState,
    getCheckins, addCheckin, lastCheckin,
    getStreak, streakHidden, setStreakHidden,
    getNudge, setNudge, clearNudge,
  };
})();
