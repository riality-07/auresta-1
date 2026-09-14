/* AURESTA Vendor Chat — Self-contained in-page chat component
 * ---------------------------------------------------------------------------
 * Replaces the old browser prompt() flow with a proper in-page chat panel.
 * Completely local: uses ONLY the local FAQ data in js/vendor-chat-kb.js.
 * No backend calls, no external AI, no network requests.
 *
 * Public API:  window.VendorChat.open({ vendorId, bookingId })
 *              window.VendorChat.close()
 *
 * Conversation storage: single namespaced key "auresta_vendor_chat_v1",
 * storing per-conversation threads keyed by "vendorId" or "vendorId::bookingId".
 * Isolation: each vendor (or vendor+booking) gets its own thread.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'auresta_vendor_chat_v1';
  var TYPE_DELAY_MS = 520; // simulated reading/typing time
  var MIN_SCORE = 2;        // local match threshold

  var chatEl = null;        // root overlay element
  var currentKey = null;    // active conversation key
  var messages = [];        // active conversation in memory
  var opened = false;

  /* ----------------------------------------------------------- storage -- */
  function storeRead() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { conversations: {} };
    } catch (e) {
      return { conversations: {} };
    }
  }

  function storeWrite(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* storage unavailable — chat still works in-memory */ }
  }

  function loadThread(key) {
    var data = storeRead();
    return (data.conversations && data.conversations[key]) || [];
  }

  function saveThread(key, thread) {
    var data = storeRead();
    data.conversations = data.conversations || {};
    data.conversations[key] = thread;
    data.lastOpen = key;
    storeWrite(data);
  }

  /* --------------------------------------------------------- matching --- */
  var STOPWORDS = new Set(
    'a an the is are was were i you your my me we our they do does did can could will would for of to on in at with and or but not what how when where why which who'.split(' ')
  );

  function tokenize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(function (w) { return w && !STOPWORDS.has(w); });
  }

  function matchEntry(entry, queryTokens) {
    var qTokens = new Set(tokenize(entry.q));
    var tagTokens = new Set((entry.tags || []).join(' ').toLowerCase().split(/\s+/));
    var known = new Set(Array.from(qTokens).concat(Array.from(tagTokens)));
    var score = 0;
    var hits = 0; // distinct query tokens that matched anything
    for (var i = 0; i < queryTokens.length; i++) {
      var t = queryTokens[i];
      var any = false;
      if (qTokens.has(t)) { score += 2; any = true; }
      if (tagTokens.has(t)) { score += 1; any = true; }
      // prefix match against known tokens (e.g. "refund" ~ "refundable", "book" ~ "booking")
      known.forEach(function (u) {
        if (u.indexOf(t) === 0 && t.length >= 3) { score += 1; any = true; }
      });
      if (any) { hits += 1; }
    }
    return { score: score, hits: hits };
  }

  function bestAnswer(question) {
    var qTokens = tokenize(question);
    if (!qTokens.length) return null;
    var kb = (window.VENDOR_CHAT_KB || []).slice();
    var scored = kb
      .map(function (entry) { var r = matchEntry(entry, qTokens); return { entry: entry, score: r.score, hits: r.hits }; })
      .sort(function (a, b) { return b.score - a.score; });
    var top = scored[0];
    if (!top || top.score < MIN_SCORE) return null;
    // Long queries must touch at least two distinct tokens — otherwise a single
    // stray keyword (e.g. "theme") could force a confident-but-wrong answer.
    // Short one-word queries ("price?", "available?") may legitimately rely on
    // one strong token, so they are allowed with a solid score.
    if (qTokens.length > 3 && top.hits < 2) return null;
    return top.entry.a;
  }

  function fallbackReply() {
    return 'I don’t have a specific answer for that yet. Please share more detail with the vendor directly — their contact details are on your Confirmed Booking — so they can confirm it for you.';
  }

  /* --------------------------------------------------------- vendor info --- */
  function resolveVendor(vendorId) {
    if (!vendorId) return null;
    try {
      var vendors = window.CELEBRATION_DATA && window.CELEBRATION_DATA.vendors;
      if (!Array.isArray(vendors)) return null;
      for (var i = 0; i < vendors.length; i++) {
        if (String(vendors[i].id) === String(vendorId)) return vendors[i];
      }
    } catch (e) { /* ignore */ }
    return null;
  }

  function conversationKey(vendorId, bookingId) {
    var v = vendorId || 'unknown';
    return bookingId ? v + '::' + bookingId : v;
  }

  function vendorDisplayName(vendorId, bookingId) {
    var v = resolveVendor(vendorId);
    if (v && v.name) return v.name;
    return 'Vendor' + (bookingId ? ' (Booking #' + bookingId + ')' : '');
  }

  /* ------------------------------------------------------------- styles --- */
  function injectStyles() {
    if (document.getElementById('auresta-vendor-chat-styles')) return;
    var style = document.createElement('style');
    style.id = 'auresta-vendor-chat-styles';
    style.textContent = [
      '.vc-overlay{position:fixed;inset:0;z-index:2000;background:rgba(42,33,25,.45);display:flex;align-items:stretch;justify-content:flex-end;font-family:var(--font-body,"DM Sans",sans-serif);opacity:0;transition:opacity var(--transition,.2s);}',
      '.vc-overlay.vc-open{opacity:1;}',
      '.vc-panel{width:min(420px,100vw);height:100%;max-height:100%;background:var(--bg-card,#fff);display:flex;flex-direction:column;box-shadow:var(--shadow-lg,0 20px 60px rgba(42,33,25,.25));transform:translateX(100%);transition:transform var(--transition,.2s);}',
      '.vc-open .vc-panel{transform:translateX(0);}',
      '.vc-header{padding:0.9rem 1.1rem;background:var(--bg-main,#FFF6F0);border-bottom:1px solid var(--border-color,#E8D8BD);display:flex;align-items:center;gap:0.7rem;}',
      '.vc-avatar{width:40px;height:40px;border-radius:var(--radius-full,999px);background:var(--primary-gold,#ECC479);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading,"Cormorant Garamond",serif);font-weight:700;color:var(--text-primary,#2A2119);flex:none;}',
      '.vc-info{flex:1;min-width:0;}',
      '.vc-name{font-family:var(--font-heading,"Cormorant Garamond",serif);font-size:1.05rem;font-weight:700;color:var(--text-primary,#2A2119);line-height:1.2;}',
      '.vc-meta{font-size:0.72rem;color:var(--text-secondary,#6C5F51);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.vc-meta .vc-badge{display:inline-block;background:var(--primary-gold,#ECC479);color:var(--text-primary,#2A2119);border-radius:var(--radius-full,999px);padding:1px 8px;font-weight:700;}',
      '.vc-close{background:none;border:none;cursor:pointer;font-size:1.3rem;color:var(--text-secondary,#6C5F51);line-height:1;padding:4px;}',
      '.vc-close:hover{color:var(--text-primary,#2A2119);}',
      '.vc-body{flex:1;overflow-y:auto;padding:1rem 1.1rem;display:flex;flex-direction:column;gap:0.6rem;background:var(--bg-card,#fff);scroll-behavior:smooth;}',
      '.vc-bubble{max-width:82%;padding:0.6rem 0.85rem;border-radius:var(--radius-md,14px);font-size:0.9rem;line-height:1.45;white-space:pre-wrap;word-break:break-word;}',
      '.vc-bubble.vc-user{align-self:flex-end;background:var(--primary-gold,#ECC479);color:var(--text-primary,#2A2119);border-bottom-right-radius:var(--radius-sm,8px);}',
      '.vc-bubble.vc-vendor{align-self:flex-start;background:var(--bg-main,#FFF6F0);border:1px solid var(--border-color,#E8D8BD);color:var(--text-primary,#2A2119);border-bottom-left-radius:var(--radius-sm,8px);}',
      '.vc-bubble.vc-typing{align-self:flex-start;font-size:0.85rem;color:var(--text-secondary,#6C5F51);}',
      '.vc-bubble.vc-typing::after{content:"…";animation:vc-blink 1.1s infinite;}',
      '@keyframes vc-blink{0%,100%{opacity:.3}50%{opacity:1}}',
      '.vc-empty{color:var(--text-secondary,#6C5F51);font-size:0.8rem;text-align:center;padding:1rem 0;}',
      '.vc-input-row{display:flex;align-items:flex-end;gap:0.5rem;padding:0.75rem 1rem;border-top:1px solid var(--border-color,#E8D8BD);background:var(--bg-card,#fff);}',
      '.vc-input{flex:1;border:1px solid var(--border-color,#E8D8BD);border-radius:var(--radius-md,14px);padding:0.6rem 0.85rem;font-family:inherit;font-size:0.9rem;color:var(--text-primary,#2A2119);background:var(--bg-card,#fff);resize:none;max-height:110px;outline:none;transition:border-color var(--transition,.2s),box-shadow var(--transition,.2s);}',
      '.vc-input:focus{border-color:var(--primary-gold,#ECC479);box-shadow:0 0 0 3px rgba(236,196,121,.35);}',
      '.vc-send{flex:none;height:38px;padding:0 1rem;border:none;border-radius:var(--radius-md,14px);background:var(--primary-gold,#ECC479);color:var(--text-primary,#2A2119);font-weight:700;font-family:inherit;font-size:0.88rem;cursor:pointer;transition:background var(--transition,.2s);}',
      '.vc-send:hover{background:var(--primary-gold-hover,#e3b764);}',
      '.vc-send:disabled{opacity:.6;cursor:not-allowed;}',
      '.vc-note{font-size:0.68rem;color:var(--text-secondary,#6C5F51);text-align:center;padding:0.5rem 1rem 0.75rem;background:var(--bg-card,#fff);border-top:1px solid var(--border-color,#E8D8BD);}',
      '@media (max-width:480px){.vc-overlay{align-items:flex-end;}.vc-panel{width:100vw;height:85vh;border-radius:var(--radius-lg,20px) var(--radius-lg,20px) 0 0;transform:translateY(100%);}.vc-open .vc-panel{transform:translateY(0);}}'
    ].join('');
    document.head.appendChild(style);
  }

  /* ------------------------------------------------------------- dom ------- */
  function ensureChat() {
    if (chatEl) return chatEl;
    injectStyles();

    chatEl = document.createElement('div');
    chatEl.className = 'vc-overlay';
    chatEl.setAttribute('role', 'dialog');
    chatEl.setAttribute('aria-label', 'Vendor Chat');
    chatEl.innerHTML =
      '<div class="vc-panel">' +
        '<div class="vc-header">' +
          '<div class="vc-avatar">A</div>' +
          '<div class="vc-info">' +
            '<div class="vc-name"></div>' +
            '<div class="vc-meta"></div>' +
          '</div>' +
          '<button class="vc-close" type="button" aria-label="Close vendor chat">✕</button>' +
        '</div>' +
        '<div class="vc-body"></div>' +
        '<div class="vc-input-row">' +
          '<textarea class="vc-input" rows="1" placeholder="Ask the vendor about availability, pricing, packages…"></textarea>' +
          '<button class="vc-send" type="button">Send</button>' +
        '</div>' +
        '<div class="vc-note">Replies are instant local answers from this vendor’s FAQ.</div>' +
      '</div>';

    document.body.appendChild(chatEl);

    chatEl.querySelector('.vc-close').addEventListener('click', function () { close(); });
    chatEl.addEventListener('click', function (e) {
      if (e.target === chatEl) close();
    });
    chatEl.querySelector('.vc-send').addEventListener('click', sendMessage);
    chatEl.querySelector('.vc-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && opened) close();
    });

    return chatEl;
  }

  function bodyEl() { return chatEl.querySelector('.vc-body'); }
  function inputEl() { return chatEl.querySelector('.vc-input'); }

  /* --------------------------------------------------------- rendering ----- */
  function renderMessages() {
    var body = bodyEl();
    body.innerHTML = '';
    if (!messages.length) {
      var empty = document.createElement('div');
      empty.className = 'vc-empty';
      empty.textContent = 'Start the conversation — ask about availability, pricing, packages, or anything else.';
      body.appendChild(empty);
      return;
    }
    messages.forEach(function (m) {
      var bubble = document.createElement('div');
      bubble.className = 'vc-bubble ' + (m.role === 'user' ? 'vc-user' : 'vc-vendor');
      bubble.textContent = m.text;
      body.appendChild(bubble);
    });
    body.scrollTop = body.scrollHeight;
  }

  function setTyping(on) {
    var body = bodyEl();
    var existing = body.querySelector('.vc-typing');
    if (existing) existing.remove();
    if (on) {
      var t = document.createElement('div');
      t.className = 'vc-bubble vc-typing';
      t.textContent = 'typing';
      body.appendChild(t);
    }
    body.scrollTop = body.scrollHeight;
  }

  function updateHeader(vendorId, bookingId) {
    var v = resolveVendor(vendorId);
    var name = v && v.name ? v.name : vendorDisplayName(vendorId, bookingId);
    var metaParts = [];
    if (v && v.categoryName) metaParts.push(v.categoryName);
    if (v && v.location) metaParts.push(v.location);
    if (v && typeof v.rating === 'number') metaParts.push('★ ' + v.rating.toFixed(1));
    if (v && v.responseTime) metaParts.push('Responds ' + v.responseTime);
    if (!metaParts.length && bookingId) metaParts.push('Booking #' + bookingId);

    chatEl.querySelector('.vc-name').textContent = name;
    chatEl.querySelector('.vc-meta').innerHTML = '';
    var badge = document.createElement('span');
    badge.className = 'vc-badge';
    badge.textContent = 'Verified';
    chatEl.querySelector('.vc-meta').appendChild(badge);
    if (metaParts.length) {
      var sep = document.createTextNode(' · ' + metaParts.join(' · '));
      chatEl.querySelector('.vc-meta').appendChild(sep);
    }
  }

  /* ------------------------------------------------------------ actions ----- */
  function sendMessage() {
    var input = inputEl();
    var text = input.value.trim();
    if (!text) return;

    messages.push({ role: 'user', text: text, ts: Date.now() });
    saveThread(currentKey, messages.slice());
    renderMessages();
    input.value = '';

    setTyping(true);
    var autoResize = input; // keep reference
    var reply = bestAnswer(text) || fallbackReply();

    setTimeout(function () {
      autoResize.scrollHeight; // no-op to satisfy linters; not used
      setTyping(false);
      messages.push({ role: 'vendor', text: reply, ts: Date.now() });
      saveThread(currentKey, messages.slice());
      renderMessages();
    }, TYPE_DELAY_MS + Math.random() * 150);
  }

  function resizeInput() {
    var input = inputEl();
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 110) + 'px';
  }

  /* ----------------------------------------------------------- public API --- */
  window.VendorChat = {
    open: function (opts) {
      opts = opts || {};
      var vendorId = opts.vendorId || null;
      var bookingId = opts.bookingId || null;
      var key = conversationKey(vendorId, bookingId);

      if (chatEl && opened) {
        // Re-opening from a different booking swaps to that conversation.
        if (key === currentKey) return;
      }

      ensureChat();
      currentKey = key;
      messages = loadThread(key);
      chatEl.querySelector('.vc-input').value = '';
      updateHeader(vendorId, bookingId);
      renderMessages();

      chatEl.classList.add('vc-open');
      opened = true;
      var input = inputEl();
      setTimeout(function () {
        if (opened) input.focus();
      }, 80);
    },

    close: function () {
      if (!chatEl || !opened) return;
      opened = false;
      chatEl.classList.remove('vc-open');
    }
  };

  // Keep the textarea auto-growing after the first open.
  document.addEventListener('input', function (e) {
    if (e.target && e.target.className === 'vc-input') {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 110) + 'px';
    }
  });
})();