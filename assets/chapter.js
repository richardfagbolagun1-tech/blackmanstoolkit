// Chapter page renderer. Reads window.CHAPTER_SLUG, fills #chapter-root.
(function () {

  // Conversation starter scripts section (Build 6)
  function renderScripts(slug) {
    const pack = (window.TOOLKIT_SCRIPTS || {})[slug];
    if (!pack || !pack.items || !pack.items.length) return "";
    return `
      <section id="scripts" class="chapter-section chapter-scripts">
        <div class="section-label">Scripts \u00B7 When the words are hard to find</div>
        <p class="scripts-intro">${pack.intro}</p>
        <div class="scripts-deck">
          ${pack.items.map((s, i) => `
            <article class="script-card" data-script-i="${i}">
              <header>
                <span class="script-num">${i + 1}</span>
                <h4>${s.situation}</h4>
              </header>
              <blockquote>
                <p>${s.text}</p>
              </blockquote>
              <button class="script-copy" data-copy="${i}" aria-label="Copy script">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copy
              </button>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  // PDF download + Share with a brother CTA at chapter end (Build 5a / 5c)
  function renderChapterFooterCTA(c, slug) {
    const circleCTA = slug === "brotherhood" ? `
      <a class="chapter-circle-cta" href="../circle.html">
        <div class="cc-text">
          <div class="cc-eyebrow">Do not just read this. Act on it.</div>
          <h3>Find your circle.</h3>
          <p>Walk into a men's group that already exists, or start your own five-man circle. A guide, a message to send, and the real groups.</p>
        </div>
        <span class="cc-arrow">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </a>
    ` : "";
    return `
      ${circleCTA}
    `;
  }

  const slug = window.CHAPTER_SLUG;
  const c = (function(orig) {
    if (!orig) return orig;
    const fix = u => (typeof u === 'string' && u.startsWith('assets/')) ? '../' + u : u;
    return Object.assign({}, orig, {
      hero_image: fix(orig.hero_image),
      portrait: fix(orig.portrait)
    });
  })(window.getChapter(slug));
  // prefix chapter assets
  if (!c) {
    document.getElementById("chapter-root").innerHTML = "<p style='padding:80px;text-align:center'>Chapter not found.</p>";
    return;
  }

  document.title = `${c.title} \u2014 The Black Man's Toolkit`.replace("\u2014", "|");

  const chapters = window.TOOLKIT.chapters;
  const idx = chapters.findIndex(x => x.slug === slug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  const root = document.getElementById("chapter-root");

  const storyText = c.story.join(" ");
  const fullChapterText = `${c.title}. ${c.promise}. ${storyText} ${c.pull_quote}`;

  root.setAttribute("data-screen-label", `${c.number} ${c.title}`);

  root.innerHTML = `
    <section class="chapter-hero">
      <div class="hero-img" style="background-image:url('${c.hero_image}')"></div>
      <div class="hero-grain"></div>
      <div class="chapter-hero-content">
        <h1>${c.title}</h1>
        <p class="promise">${c.promise}</p>
        <p class="character-tag">Meet <strong>${c.character.name.split(" ")[0]}</strong>, who is ${c.character.line}.</p>
      </div>
    </section>

    ${c.testimonial ? `
    <section class="chapter-testimonial" aria-label="From our conversations">
      <div class="testimonial-inner">
        <blockquote class="testimonial-quote">
          <span class="testimonial-mark" aria-hidden="true">&ldquo;</span>
          <p>${c.testimonial.quote}</p>
          <cite>${c.testimonial.attribution}</cite>
        </blockquote>
        ${c.testimonial.counterpoint ? `
          <blockquote class="testimonial-quote testimonial-counterpoint">
            <span class="testimonial-mark" aria-hidden="true">&ldquo;</span>
            <p>${c.testimonial.counterpoint.quote}</p>
            <cite>${c.testimonial.counterpoint.attribution}</cite>
          </blockquote>
        ` : ''}
      </div>
    </section>
    ` : ''}

    <div class="chapter-subnav">
      <div class="subnav-links">
        <a href="#story" class="active">Story</a>
        <a href="#reflect">Questions to sit with</a>
        <a href="#act">What to actually do</a>
        <a href="#resources">UK resources</a>
      </div>
      <div class="chapter-actions-bar">
        <button class="icon-btn" data-narrate title="Listen to this chapter" aria-label="Listen to this chapter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        </button>
        <button class="icon-btn" data-share title="Share this chapter" aria-label="Share">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
        <button class="icon-btn" data-whatsapp title="Send to someone on WhatsApp" aria-label="Send on WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </button>
      </div>
    </div>

    <div class="chapter-body">

      <section id="story" class="chapter-section">
        <div class="story-grid">
          ${c.story.map(p => `<p>${p}</p>`).join("")}
        </div>
        ${c.pull_quote ? `<blockquote class="pull-quote">${c.pull_quote}</blockquote>` : ""}
        <div class="chapter-stats">
          ${c.stats.map(s => `
            <div class="stat">
              <span class="big">${s.big}</span>
              <span class="label">${s.label}</span>
            </div>
          `).join("")}
        </div>
      </section>

      <section id="reflect" class="chapter-section">
        <div class="section-label">Questions to sit with</div>
        <p style="font-family:var(--display);font-weight:600;font-size:clamp(19px,1.7vw,22px);line-height:1.3;letter-spacing:-.01em;color:var(--ink);margin:0 0 8px 0">Tap a question to write your own answer.</p>
        <p style="font-family:var(--serif);font-style:normal;font-size:16px;color:var(--ink-soft);margin:0 0 36px 0">Your notes are saved on your device only. No account, no sign-in, no one is reading this but you.</p>
        <ol class="questions-list" id="questions-list">
          ${c.questions.map((q, i) => `
            <li data-q="${i}">
              <div class="q-text">${q}</div>
              <textarea class="journal-input" placeholder="Be honest. Type freely. Saved as you write." data-q-input="${i}"></textarea>
            </li>
          `).join("")}
        </ol>
      </section>

      <section id="act" class="chapter-section">
        <div class="section-label">What to actually do</div>
        <div class="actions-list">
          ${c.actions.map((a, i) => {
            const txt = (a.p || "").trim();
            const m = txt.match(/^([\s\S]*?[.!?])(\s+)([\s\S]+)$/);
            const lead = m ? m[1] : txt;
            const rest = m ? m[3] : "";
            return `
            <div class="action-card">
              <div class="action-num">${i + 1}</div>
              <div class="action-main">
                <h4>${a.h}</h4>
                ${lead ? `<p class="action-lead">${lead}</p>` : ""}
                ${rest ? `
                  <div class="action-rest" id="act-rest-${i}" hidden><p>${rest}</p></div>
                  <button class="action-toggle" type="button" aria-expanded="false" aria-controls="act-rest-${i}">Show full advice</button>
                ` : ""}
              </div>
            </div>
          `;
          }).join("")}
        </div>
      </section>

      <section id="resources" class="chapter-section">
        <div class="section-label">Free or low-cost UK organisations</div>
        <div class="resources-list" id="resources-list">
          ${c.resources.map((r, i) => `
            <a href="${r.link}" target="_blank" rel="noopener" class="resource" data-r="${i}">
              <div class="resource-text">
                <div class="name">${r.name}${r.black_led ? '<span class="badge">Black-led</span>' : ''}</div>
                <div class="note">${r.note}</div>
              </div>
              <div class="resource-actions">
                <button class="bookmark-btn" data-bookmark="${i}" aria-label="Save for later" title="Save for later">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </button>
              </div>
            </a>
          `).join("")}
        </div>
      </section>

      ${renderScripts(slug)}

      ${renderChapterFooterCTA(c, slug)}

    </div>

    <nav class="chapter-nav">
      ${prev ? `
        <a class="prev" href="${prev.slug}.html">
          <div class="label">&larr; Previous chapter</div>
          <h4>${prev.title}.</h4>
          <p>${prev.promise}</p>
        </a>
      ` : `<a class="prev" href="../index.html"><div class="label">&larr; Back to home</div><h4>The directory.</h4><p>Six chapters, one toolkit.</p></a>`}
      ${next ? `
        <a class="next" href="${next.slug}.html">
          <div class="label">Next chapter &rarr;</div>
          <h4>${next.title}.</h4>
          <p>${next.promise}</p>
        </a>
      ` : `<a class="next" href="../index.html"><div class="label">You finished. Well done. &rarr;</div><h4>Back to the directory.</h4><p>Or read another chapter.</p></a>`}
    </nav>

    <footer class="site-footer">
      <div class="footer-grid" style="grid-template-columns:repeat(3,1fr)">
        <div>
          <h4>Chapters</h4>
          <ul>
            <li><a href="../chapters/body.html">Body</a></li>
            <li><a href="../chapters/mind.html">Mind</a></li>
            <li><a href="../chapters/money.html">Money</a></li>
            <li><a href="../chapters/spirit.html">Spirit</a></li>
            <li><a href="../chapters/brotherhood.html">Brotherhood</a></li>
            <li><a href="../chapters/community.html">Community</a></li>
          </ul>
        </div>
        <div>
          <h4>Tools</h4>
          <ul>
            <li><a href="../quiz.html">Where to start quiz</a></li>
            <li><a href="../tools/index.html">In-the-moment tools</a></li>
            <li><a href="../resources.html">Resource finder</a></li>
            <li><a href="../listen-watch.html">Listen &amp; watch</a></li>
            <li><a href="../print.html">Print &amp; pocket cards</a></li>
            <li><a href="../bookmarks.html">Saved for later</a></li>
            <li><a href="../lgbtq.html">For LGBTQ+ brothers</a></li>
            <li><a href="../about.html">About this work</a></li>
          </ul>
        </div>
        <div>
          <h4>If you need help now</h4>
          <ul>
            <li><a href="tel:116123">Samaritans 116 123</a></li>
            <li><a href="sms:85258&body=SHOUT">Text SHOUT to 85258</a></li>
            <li><a href="tel:0800585858">CALM 0800 58 58 58</a></li>
            <li><a href="tel:999">Emergency 999</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-meta">
        <span>&copy; 2026 Black Thrive Lambeth</span>
        <span>Designed by The Office of Art and Technology</span>
      </div>
    </footer>
  `;

  // Mark chapter as read after 8s of viewing
  setTimeout(() => window.BMT.markRead(slug), 8000);

  // Scroll-spy for sub-nav
  const sectionIds = ["story", "reflect", "act", "resources"];
  const navLinks = document.querySelectorAll(".subnav-links a");
  function spy() {
    const offset = 220;
    let cur = sectionIds[0];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.getBoundingClientRect().top < offset) cur = id;
    });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  }
  window.addEventListener("scroll", spy, { passive: true });

  // Sub-nav smooth scroll
  navLinks.forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const id = a.getAttribute("href").replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // "What to actually do" — show full advice toggles
  document.querySelectorAll(".action-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.getAttribute("aria-controls"));
      if (!target) return;
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      target.hidden = open;
      btn.textContent = open ? "Show full advice" : "Show less";
    });
  });

  // Question journals
  const journalState = window.BMT.getJournal()[slug] || {};
  document.querySelectorAll("#questions-list li").forEach(li => {
    const i = li.dataset.q;
    const ta = li.querySelector(".journal-input");
    if (journalState[i]) {
      ta.value = journalState[i];
      li.dataset.open = "true";
    }
    li.querySelector(".q-text").addEventListener("click", () => {
      li.dataset.open = li.dataset.open === "true" ? "false" : "true";
      if (li.dataset.open === "true") setTimeout(() => ta.focus(), 50);
    });
    ta.addEventListener("input", () => window.BMT.saveJournal(slug, i, ta.value));
    ta.addEventListener("click", e => e.stopPropagation());
  });

  // Bookmarks
  function refreshBookmarkBtns() {
    document.querySelectorAll("[data-bookmark]").forEach(b => {
      const r = c.resources[b.dataset.bookmark];
      b.setAttribute("data-saved", String(window.BMT.isBookmarked(r.link)));
    });
  }
  refreshBookmarkBtns();
  document.querySelectorAll("[data-bookmark]").forEach(b => {
    b.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      const r = c.resources[b.dataset.bookmark];
      window.BMT.toggleBookmark(r, slug);
      refreshBookmarkBtns();
    });
  });

  // Audio narration
  const narrateBtn = document.querySelector("[data-narrate]");
  narrateBtn.addEventListener("click", () => {
    window.BMT.narrate(fullChapterText);
    setTimeout(window.BMT.updateAudioBtns, 100);
  });

  // Share
  document.querySelector("[data-share]").addEventListener("click", () => {
    window.BMT.share({
      title: `${c.title} \u00B7 The Black Man's Toolkit`,
      text: `${c.promise} A toolkit for Black men, from Black Thrive Lambeth.`,
    });
  });
  // Share with a brother (bottom CTA)
  const shareBrotherBtn = document.querySelector("[data-share-brother]");
  if (shareBrotherBtn) {
    shareBrotherBtn.addEventListener("click", () => {
      window.BMT.share({
        title: `${c.title} \u00B7 The Black Man's Toolkit`,
        text: `Hey. Thought this might be useful. From the Black Man's Toolkit, by Black Thrive Lambeth.`,
      });
    });
  }

  // Script copy buttons
  document.querySelectorAll("[data-copy]").forEach(b => {
    b.addEventListener("click", () => {
      const i = b.dataset.copy;
      const pack = (window.TOOLKIT_SCRIPTS || {})[slug];
      if (!pack) return;
      const text = pack.items[i].text;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => window.BMT.toast("Script copied. Paste it where you need it."));
      } else {
        window.BMT.toast(text);
      }
    });
  });

  // QR code on demand (loads qrcode.js lazily)
  const qrBtn = document.getElementById("chapter-qr-btn");
  const qrAnchor = document.getElementById("chapter-qr");
  if (qrBtn && qrAnchor) {
    qrBtn.addEventListener("click", () => {
      if (qrAnchor.dataset.rendered === "true") {
        qrAnchor.dataset.open = qrAnchor.dataset.open === "true" ? "false" : "true";
        return;
      }
      const ensure = (cb) => {
        if (window.QRCode) return cb();
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js";
        s.onload = cb;
        document.head.appendChild(s);
      };
      ensure(() => {
        window.QRCode.toCanvas(location.href, { width: 220, margin: 1, color: { dark: "#0a1f44", light: "#fafaf7" } }, (err, canvas) => {
          if (err) return;
          qrAnchor.innerHTML = "";
          qrAnchor.appendChild(canvas);
          const dl = document.createElement("a");
          dl.textContent = "Download PNG";
          dl.className = "qr-dl";
          dl.href = canvas.toDataURL("image/png");
          dl.download = `bmt-${slug}-qr.png`;
          qrAnchor.appendChild(dl);
          qrAnchor.dataset.rendered = "true";
          qrAnchor.dataset.open = "true";
        });
      });
    });
  }
})();
