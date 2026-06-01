// Homepage extras (Build 4). Loaded after data.js and app.js, before the existing inline chapter-grid script.
// - Streak chip in hero
// - Check-in section
// - Weekly nudge form
// - Chapter progress strip
(function () {
  if (!window.BMT) return;

  /* ------------------------------------------------------------
     STREAK CHIP — top right of hero
  ------------------------------------------------------------ */
  function mountStreak() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const streak = window.BMT.getStreak();
    const hidden = window.BMT.streakHidden();
    if (!streak || hidden) return;
    const chip = document.createElement("div");
    chip.className = "streak-chip";
    chip.setAttribute("title", "Tap × to hide");
    chip.innerHTML = `
      <span class="flame" aria-hidden="true">🔥</span>
      <span><span class="num">${streak}</span> day${streak === 1 ? "" : "s"}. You showed up.</span>
      <button class="hide-btn" aria-label="Hide streak">&times;</button>
    `;
    hero.appendChild(chip);
    chip.querySelector(".hide-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      window.BMT.setStreakHidden(true);
      chip.remove();
      window.BMT.toast("Streak hidden. Settings on /about.");
    });
  }

  /* ------------------------------------------------------------
     CHECK-IN SECTION — inserted after .letter
  ------------------------------------------------------------ */
  function mountCheckin() {
    const letter = document.querySelector(".letter");
    if (!letter) return;
    const recent = window.BMT.getCheckins().slice(-5).reverse();
    const recentChips = recent
      .filter(e => e.feeling)
      .slice(0, 4)
      .map(e => `<span class="chip">${e.feeling}</span>`)
      .join("");

    const section = document.createElement("section");
    section.className = "checkin";
    section.setAttribute("data-screen-label", "Check-in");
    section.innerHTML = `
      <div class="checkin-inner">
        <div>
          <h2>How are you today, brother?</h2>
          <p class="lede">Two minutes. One question. No login.</p>
          <p class="privacy">Everything you write stays on your device. Nobody sees this, including us.</p>
        </div>
        <div class="checkin-card">
          <div class="checkin-row">
            <span class="num">01</span>
            <div class="label-block">
              <p class="title">How are you feeling right now?</p>
              <p class="note">Opens the Feelings Wheel.</p>
            </div>
            <a class="go" href="tools/feelings-wheel.html">
              Open
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
          <div class="checkin-row" style="flex-direction:column;align-items:stretch;gap:0">
            <div style="display:flex;gap:16px;align-items:center;width:100%">
              <span class="num">02</span>
              <div class="label-block">
                <p class="title">What is on your mind?</p>
                <p class="note">One sentence. Saves to your private journal.</p>
              </div>
            </div>
            <textarea class="checkin-textarea" id="ci-note" placeholder="Be honest. Type freely. Saved as you write."></textarea>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;gap:12px;flex-wrap:wrap">
              <span style="font-family:var(--sans);font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:var(--ink-soft)" id="ci-status">Not saved yet</span>
              <button class="go" id="ci-save">Log today</button>
            </div>
          </div>
          ${recentChips ? `
            <div class="checkin-recent">
              <span>Recent words you used:</span>
              ${recentChips}
            </div>
          ` : ""}
        </div>
      </div>
    `;
    letter.parentNode.insertBefore(section, letter.nextSibling);

    const ta = section.querySelector("#ci-note");
    const status = section.querySelector("#ci-status");
    const saveBtn = section.querySelector("#ci-save");
    saveBtn.addEventListener("click", () => {
      const text = ta.value.trim();
      if (!text) {
        status.textContent = "Type something first";
        return;
      }
      window.BMT.addCheckin({ note: text });
      ta.value = "";
      status.textContent = "Saved. Come back tomorrow.";
      window.BMT.toast("Logged. Saved on your device only.");
      // Refresh streak chip if it appears now
      if (!document.querySelector(".streak-chip") && !window.BMT.streakHidden()) {
        mountStreak();
      }
    });
  }

  /* ------------------------------------------------------------
     WEEKLY NUDGE — inserted before footer
  ------------------------------------------------------------ */
  function mountNudge() {
    const footer = document.querySelector("footer.site-footer");
    if (!footer) return;
    const existing = window.BMT.getNudge();

    const section = document.createElement("section");
    section.className = "nudge";
    section.setAttribute("data-screen-label", "Weekly nudge");
    section.innerHTML = `
      <div class="nudge-inner">
        <div>
          <h3>Want a nudge?</h3>
          <p>Once a week, we will send you one short message: a check-in question, a reminder of where you left off, a story from another brother. Pick the day. We will not spam you. You can stop any time.</p>
        </div>
        <div>
          <div class="nudge-form" id="nudge-form">
            <button type="button" class="channel" data-channel="email" aria-pressed="${existing?.channel === 'email'}">Email</button>
            <button type="button" class="channel" data-channel="sms" aria-pressed="${existing?.channel === 'sms'}">Phone (text)</button>
            <button type="button" class="channel" data-channel="none" aria-pressed="${existing?.channel === 'none'}">No thanks, I will come back when I am ready</button>
          </div>
          <form class="nudge-form" id="nudge-detail" style="margin-top:14px;${existing?.channel && existing.channel !== 'none' ? '' : 'display:none'}">
            <input class="nudge-input" id="nudge-value" type="text" placeholder="${existing?.channel === 'sms' ? 'Phone number' : 'Email address'}" value="${existing?.value || ''}" />
            <select class="channel" id="nudge-day" style="font-weight:700">
              <option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option>
            </select>
            <button class="nudge-submit" type="submit">Save</button>
          </form>
          <p class="nudge-status" id="nudge-status">${existing ? (existing.channel === 'none' ? 'No nudges. We will be here when you come back.' : `Nudge set for ${existing.day}s by ${existing.channel}.`) : ''}</p>
        </div>
      </div>
    `;
    footer.parentNode.insertBefore(section, footer);

    const form = section.querySelector("#nudge-detail");
    const input = section.querySelector("#nudge-value");
    const daySel = section.querySelector("#nudge-day");
    const status = section.querySelector("#nudge-status");
    if (existing?.day) daySel.value = existing.day;

    section.querySelectorAll(".channel[data-channel]").forEach(btn => {
      btn.addEventListener("click", () => {
        section.querySelectorAll(".channel[data-channel]").forEach(b => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        const ch = btn.dataset.channel;
        if (ch === "none") {
          form.style.display = "none";
          window.BMT.setNudge({ channel: "none" });
          status.textContent = "No nudges. We will be here when you come back.";
          window.BMT.toast("Preferences saved");
        } else {
          form.style.display = "flex";
          input.placeholder = ch === "sms" ? "Phone number" : "Email address";
          input.type = ch === "sms" ? "tel" : "email";
          input.focus();
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ch = section.querySelector(".channel[aria-pressed='true']")?.dataset.channel;
      if (!ch || ch === "none") return;
      const value = input.value.trim();
      if (!value) return;
      const day = daySel.value;
      window.BMT.setNudge({ channel: ch, value, day, when: Date.now() });
      status.textContent = ch === "sms"
        ? `Got it. We will text you on ${day}s once we launch SMS, and confirm before we do.`
        : `Got it. We will email you on ${day}s.`;
      window.BMT.toast("Nudge saved");
    });
  }

  /* ------------------------------------------------------------
     CHAPTER PROGRESS STRIP — above .chapter-grid
  ------------------------------------------------------------ */
  function mountProgress() {
    const grid = document.getElementById("chapter-grid");
    if (!grid) return;
    const chapters = (window.TOOLKIT && window.TOOLKIT.chapters) || [];
    const prog = window.BMT.getProgress();
    const visited = chapters.filter(c => prog[c.slug]?.done).length;
    const total = chapters.length || 6;
    const pct = Math.round((visited / total) * 100);

    const head = document.querySelector(".section-head");
    if (!head) return;
    const strip = document.createElement("div");
    strip.className = "progress-strip";
    strip.innerHTML = `
      <span class="count">${visited} of ${total} chapters visited</span>
      <span class="bar" style="--p:${pct}%"></span>
      <span>${pct}%</span>
    `;
    head.insertBefore(strip, head.firstChild);
  }

  /* ------------------------------------------------------------
     INIT — wait for DOM + data + app
  ------------------------------------------------------------ */
  function start() {
    mountStreak();
    mountCheckin();
    mountNudge();
    mountProgress();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
