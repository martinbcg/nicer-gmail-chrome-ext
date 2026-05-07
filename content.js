// --- 1. CSS Injection (With Image Inversion Protection) ---
const styleTag = document.createElement('style');
styleTag.id = 'gmail-custom-theme-engine';
document.documentElement.appendChild(styleTag);

const darkStyles = `
  /* The Core Dark Mode Filter - only applies after Gmail is ready */
  html.gmail-ready[data-custom-theme="dark"] {
    filter: invert(0.9) hue-rotate(180deg) !important;
    background-color: #111 !important;
  }

  @media (prefers-color-scheme: dark) {
    html.gmail-ready[data-custom-theme="system"] {
      filter: invert(0.9) hue-rotate(180deg) !important;
      background-color: #111 !important;
    }
  }
  
  /* RE-INVERT: Only images and videos should be re-inverted to show correctly */
  html.gmail-ready[data-custom-theme="dark"] img,
  html.gmail-ready[data-custom-theme="dark"] video,
  html.gmail-ready[data-custom-theme="dark"] canvas,
  html.gmail-ready[data-custom-theme="dark"] .aH9,
  html.gmail-ready[data-custom-theme="dark"] .gb_Ab {
    filter: invert(1) hue-rotate(180deg) !important;
  }
  
  @media (prefers-color-scheme: dark) {
    html.gmail-ready[data-custom-theme="system"] img,
    html.gmail-ready[data-custom-theme="system"] video,
    html.gmail-ready[data-custom-theme="system"] canvas,
    html.gmail-ready[data-custom-theme="system"] .aH9,
    html.gmail-ready[data-custom-theme="system"] .gb_Ab {
      filter: invert(1) hue-rotate(180deg) !important;
    }
  }
  
  /* Navigation Bar Button Style */
  .theme-toggle-btn {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: background 0.2s, transform 0.2s;
    vertical-align: middle;
    z-index: 999;
    flex-shrink: 0;
    margin: 0;
    position: relative;
  }
  .theme-toggle-btn:hover {
    background: rgba(60, 64, 67, 0.1) !important;
    transform: scale(1.1);
  }
  .theme-toggle-btn:active {
    transform: scale(0.95);
  }
  .theme-toggle-btn svg {
    fill: #5f6368;
    width: 20px;
    height: 20px;
    pointer-events: none;
    transition: fill 0.2s;
  }
  .theme-toggle-btn[data-theme="dark"] svg {
    fill: #8ab4f8;
  }
  .theme-toggle-btn[data-theme="system"] svg {
    fill: #81c995;
  }
  .theme-toggle-btn[data-sidebar-enabled="true"] {
    background: transparent !important;
  }
  html.gmail-ready[data-custom-theme="dark"] .theme-toggle-btn,
  html.gmail-ready[data-custom-theme="dark"] .gmail-extension-button-slot {
    filter: invert(1) hue-rotate(180deg) !important;
  }
  @media (prefers-color-scheme: dark) {
    html.gmail-ready[data-custom-theme="system"] .theme-toggle-btn,
    html.gmail-ready[data-custom-theme="system"] .gmail-extension-button-slot {
      filter: invert(1) hue-rotate(180deg) !important;
    }
  }

  .gmail-extension-button-slot {
    align-items: center;
    display: inline-flex;
    height: 48px;
    justify-content: center;
    left: 304px;
    position: fixed;
    top: 8px;
    width: 48px;
    z-index: 2147483647;
  }

  .gmail-sidebar-hidden-by-extension {
    display: none !important;
  }
  .gmail-sidebar-pinned-row {
    box-sizing: border-box;
  }
  .gmail-sidebar-pinned-row a {
    color: inherit !important;
    text-decoration: none !important;
  }
  .gmail-sidebar-pinned-row .gmail-sidebar-pinned-link {
    display: inline !important;
    padding: 0 !important;
  }
  .gmail-sidebar-pinned-row .gmail-sidebar-pinned-link:hover {
    background: transparent;
  }

  .gmail-sidebar-panel {
    position: fixed;
    top: 64px;
    left: 84px;
    width: min(340px, calc(100vw - 32px));
    max-height: min(640px, calc(100vh - 96px));
    z-index: 2147483647;
    background: #fff;
    color: #202124;
    border: 1px solid rgba(60, 64, 67, 0.18);
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(60, 64, 67, 0.24);
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    overflow: hidden;
  }
  .gmail-sidebar-panel[data-theme-active="true"] {
    filter: invert(1) hue-rotate(180deg);
  }
  .gmail-sidebar-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px 10px;
    border-bottom: 1px solid rgba(60, 64, 67, 0.12);
  }
  .gmail-sidebar-panel-title {
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
  }
  .gmail-sidebar-panel-close {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    color: #5f6368;
    font-size: 22px;
    line-height: 32px;
  }
  .gmail-sidebar-panel-close:hover {
    background: rgba(60, 64, 67, 0.1);
  }
  .gmail-sidebar-panel-body {
    max-height: calc(min(640px, calc(100vh - 96px)) - 62px);
    overflow: auto;
    padding: 10px 0 12px;
  }
  .gmail-sidebar-section-title {
    color: #5f6368;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 16px;
    padding: 10px 16px 6px;
    text-transform: uppercase;
  }
  .gmail-theme-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    padding: 0 16px 10px;
    border-bottom: 1px solid rgba(60, 64, 67, 0.12);
  }
  .gmail-theme-option {
    align-items: center;
    background: transparent;
    border: 1px solid rgba(60, 64, 67, 0.2);
    border-radius: 6px;
    color: #202124;
    cursor: pointer;
    display: flex;
    font: inherit;
    font-size: 13px;
    gap: 6px;
    height: 34px;
    justify-content: center;
    padding: 0 8px;
  }
  .gmail-theme-option:hover {
    background: rgba(60, 64, 67, 0.08);
  }
  .gmail-theme-option[data-active="true"] {
    background: rgba(26, 115, 232, 0.12);
    border-color: #1a73e8;
    color: #1a73e8;
    font-weight: 600;
  }
  .gmail-theme-option svg {
    fill: currentColor;
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
  }
  .gmail-sidebar-master-row,
  .gmail-sidebar-option {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 40px;
    padding: 0 16px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .gmail-sidebar-master-row {
    font-weight: 500;
    border-bottom: 1px solid rgba(60, 64, 67, 0.12);
    margin-bottom: 8px;
    padding-bottom: 8px;
  }
  .gmail-sidebar-option input,
  .gmail-sidebar-master-row input {
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
  }
  .gmail-sidebar-option span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .gmail-sidebar-panel-empty {
    color: #5f6368;
    font-size: 13px;
    line-height: 18px;
    padding: 6px 16px 12px;
  }
  .gmail-sidebar-panel-actions {
    display: flex;
    justify-content: flex-end;
    padding: 10px 16px 2px;
  }
  .gmail-sidebar-reset {
    border: none;
    background: transparent;
    color: #1a73e8;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    padding: 8px;
    border-radius: 4px;
  }
  .gmail-sidebar-reset:hover {
    background: rgba(26, 115, 232, 0.08);
  }
`;
styleTag.textContent = darkStyles;

// Icons for each theme state
const ICONS = {
  light: `<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>`,
  dark: `<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`,
  system: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
};

const THEME_LABELS = {
  light: 'Light',
  dark: 'Dark',
  system: 'System'
};

const SIDEBAR_DEFAULT_VISIBLE = ['inbox', 'sent', 'drafts'];
const SIDEBAR_STORAGE_KEYS = ['gmailSidebarSimplifyEnabled', 'gmailSidebarVisibleItems'];
const SIDEBAR_SCOPE_SELECTOR = '[role="navigation"], nav, .byl, .aeN, .wT, .ajl, .nM';

const SETTINGS_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="2.35"/><circle cx="16" cy="8" r="2.35"/><circle cx="8" cy="16" r="2.35"/><circle cx="16" cy="16" r="2.35"/></svg>`;

const CORE_SIDEBAR_ITEMS = {
  inbox: 'Inbox',
  starred: 'Starred',
  snoozed: 'Snoozed',
  important: 'Important',
  sent: 'Sent',
  drafts: 'Drafts',
  scheduled: 'Scheduled',
  all: 'All Mail',
  spam: 'Spam',
  trash: 'Trash',
  chats: 'Chats'
};

const CORE_SIDEBAR_HREFS = {
  inbox: '#inbox',
  starred: '#starred',
  snoozed: '#snoozed',
  important: '#imp',
  sent: '#sent',
  drafts: '#drafts',
  scheduled: '#scheduled',
  all: '#all',
  spam: '#spam',
  trash: '#trash',
  chats: '#chats'
};

// --- 2. Update Toggle Button Appearance ---
function updateToggleButton(theme) {
    const btn = document.getElementById('gmail-theme-toggle-btn');
    if (!btn) return;

    btn.innerHTML = SETTINGS_ICON;
    btn.title = 'Gmail extension settings';
    btn.setAttribute('data-theme', theme);
}

// --- 3. Inject Button into Gmail UI ---
function createSettingsButton() {
    const btn = document.createElement('button');
    btn.id = 'gmail-theme-toggle-btn';
    btn.className = 'theme-toggle-btn';
    btn.setAttribute('aria-label', 'Open Gmail extension settings');
    btn.type = 'button';
    btn.innerHTML = SETTINGS_ICON;
    btn.title = 'Gmail extension settings';

    chrome.storage.sync.get(['gmailTheme'], (res) => {
        const currentTheme = res.gmailTheme || 'system';
        updateToggleButton(currentTheme);
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebarSettingsPanel();
    });

    return btn;
}

function rectFromElement(el) {
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    if (rect.right <= 0 || rect.bottom <= 0) return null;
    if (rect.left >= window.innerWidth || rect.top >= window.innerHeight) return null;
    return rect;
}

function getVisibleGmailLogoRect(searchRect) {
    const gb = document.getElementById('gb');
    const logoCandidates = [
        ...document.querySelectorAll('a[aria-label="Gmail"], [aria-label="Gmail"], img[alt="Gmail"], .gb_gd, .gb_fd'),
        ...(gb ? Array.from(gb.querySelectorAll('*')).filter((el) => cleanSidebarText(el.textContent) === 'Gmail') : [])
    ];

    return logoCandidates
        .map(rectFromElement)
        .filter((rect) => rect && (!searchRect || rect.right < searchRect.left))
        .sort((a, b) => b.right - a.right)[0] || null;
}

function positionSettingsButtonSlot() {
    const slot = document.querySelector('.gmail-extension-button-slot');
    if (!slot) return;

    const searchRect = rectFromElement(document.querySelector('form[role="search"]')) ||
        rectFromElement(document.querySelector('[role="search"]'));
    const logoRect = getVisibleGmailLogoRect(searchRect);

    let left = logoRect ? logoRect.right + 26 : 304;
    if (searchRect) {
        left = Math.min(left, searchRect.left - 92);
    }
    left = Math.max(224, Math.round(left));

    const top = logoRect
        ? Math.max(8, Math.round(logoRect.top + (logoRect.height - 40) / 2))
        : 12;

    slot.style.left = `${left}px`;
    slot.style.top = `${top}px`;
}

function placeSettingsButtonNearLogo(btn) {
    const slot = document.createElement('div');
    slot.className = 'gmail-extension-button-slot';
    slot.appendChild(btn);
    document.body.appendChild(slot);
    positionSettingsButtonSlot();
    return true;
}

function injectSwitcher() {
    // Check if button already exists
    if (document.getElementById('gmail-theme-toggle-btn')) {
        positionSettingsButtonSlot();
        return;
    }

    const gb = document.getElementById('gb');
    let possibleAnchors = [];

    const logoArea = document.querySelector('a.gb_jd') || 
                     document.querySelector('a[aria-label="Gmail"]') || 
                     document.querySelector('.gb_gd') || 
                     document.querySelector('.gb_fd');

    if (logoArea) {
        possibleAnchors.push(logoArea);
    }

    if (gb) {
        const candidates = [
            gb.querySelector('[aria-label*="Help"]'),
            gb.querySelector('[aria-label*="Ayuda"]'),
            gb.querySelector('[aria-label*="Settings"]'),
            gb.querySelector('[aria-label*="Configuración"]'),
            gb.querySelector('.gb_ue'), 
            gb.querySelector('.gb_re'),
            gb.querySelector('.gb_Kd')
        ];
        
        candidates.forEach(c => {
            if (c) possibleAnchors.push(c);
        });
    }

    const anchor = possibleAnchors.find(el => {
        if (!el) return false;
        if (el.offsetParent === null) return false;
        if (el.textContent && el.textContent.includes('Gmail help center')) return false;
        return true;
    });

    if (anchor) {
        const btn = createSettingsButton();
        placeSettingsButtonNearLogo(btn);
        updateSidebarButtonAppearance();
    } else {
        const btn = createSettingsButton();
        placeSettingsButtonNearLogo(btn);
        updateSidebarButtonAppearance();
    }
}

// --- 4. Sidebar Simplifier ---
function getSidebarSettings(callback) {
    chrome.storage.sync.get(SIDEBAR_STORAGE_KEYS, (res) => {
        callback({
            enabled: res.gmailSidebarSimplifyEnabled !== false,
            visibleItems: Array.isArray(res.gmailSidebarVisibleItems)
                ? res.gmailSidebarVisibleItems
                : [...SIDEBAR_DEFAULT_VISIBLE]
        });
    });
}

function saveSidebarSettings(partial, callback) {
    getSidebarSettings((current) => {
        const next = {
            gmailSidebarSimplifyEnabled: current.enabled,
            gmailSidebarVisibleItems: current.visibleItems,
            ...partial
        };

        chrome.storage.sync.set(next, () => {
            applySidebarSimplifier();
            updateSidebarButtonAppearance();
            if (document.getElementById('gmail-sidebar-settings-panel')) {
                renderSidebarSettingsPanel({
                    enabled: next.gmailSidebarSimplifyEnabled,
                    visibleItems: next.gmailSidebarVisibleItems
                });
            }
            if (callback) callback();
        });
    });
}

function cleanSidebarText(text) {
    return (text || '')
        .replace(/\s+/g, ' ')
        .replace(/\s+\d+(\s+unread)?$/i, '')
        .trim();
}

function getSidebarElementText(el) {
    return cleanSidebarText(el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent);
}

function normalizeSidebarControlText(text) {
    return cleanSidebarText(text)
        .replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function isMoreToggleText(text) {
    const normalized = normalizeSidebarControlText(text);
    return /^(more|mas|más|less|menos|more labels|less labels|mas etiquetas|más etiquetas|menos etiquetas)$/i.test(normalized) ||
        /\b(show more|show less|mostrar mas|mostrar más|mostrar menos)\b/i.test(normalized);
}

function isLessToggleText(text) {
    const normalized = normalizeSidebarControlText(text);
    return /^(less|menos|less labels|menos etiquetas)$/i.test(normalized) ||
        /\b(show less|mostrar menos)\b/i.test(normalized);
}

function keyToLabel(key) {
    if (CORE_SIDEBAR_ITEMS[key]) return CORE_SIDEBAR_ITEMS[key];
    if (key.startsWith('category:')) {
        const name = key.slice('category:'.length);
        return `Category: ${titleCase(name)}`;
    }
    if (key.startsWith('label:')) {
        return `Label: ${decodeURIComponent(key.slice('label:'.length))}`;
    }
    return titleCase(key);
}

function titleCase(value) {
    return (value || '')
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getSidebarItemKey(link) {
    const href = link.getAttribute('href') || '';
    if (!href.includes('#')) return null;

    let hash = '';
    try {
        hash = decodeURIComponent(new URL(href, window.location.href).hash || '');
    } catch (e) {
        hash = decodeURIComponent(href.slice(href.indexOf('#')));
    }

    hash = hash.replace(/^#/, '').split('?')[0];
    if (!hash) return null;

    if (hash.startsWith('category/')) {
        const category = hash.slice('category/'.length).split('/')[0];
        return category ? `category:${category.toLowerCase()}` : null;
    }

    if (hash.startsWith('label/')) {
        const label = hash.slice('label/'.length).split('/')[0];
        return label ? `label:${label.toLowerCase()}` : null;
    }

    const key = hash.split('/')[0].toLowerCase();
    return CORE_SIDEBAR_ITEMS[key] ? key : null;
}

function getSidebarItemLabel(link, key) {
    const explicitLabel = cleanSidebarText(
        link.getAttribute('aria-label') ||
        link.getAttribute('title') ||
        link.textContent
    );

    if (explicitLabel) return explicitLabel;
    return keyToLabel(key);
}

function getSidebarRow(el) {
    const pinnedRow = el.closest('.gmail-sidebar-pinned-row');
    if (pinnedRow) return pinnedRow;

    const explicitRow = el.closest('.TO') ||
        el.closest('.aim') ||
        el.closest('[role="treeitem"]') ||
        el.closest('[role="button"]') ||
        el.closest('[role="link"]') ||
        null;

    if (explicitRow) return explicitRow;

    let row = el;
    let parent = el.parentElement;
    while (parent && getSidebarScope(parent) && !parent.matches(SIDEBAR_SCOPE_SELECTOR)) {
        const text = cleanSidebarText(parent.textContent);
        if (text.length > 90 || parent.children.length > 8) break;
        row = parent;
        parent = parent.parentElement;
    }

    return row;
}

function getSidebarScope(el) {
    return el.closest('.byl') ||
        el.closest('.wT') ||
        el.closest('.ajl') ||
        el.closest('.nM') ||
        el.closest('[role="navigation"], nav') ||
        el.closest('.aeN');
}

function getSidebarScopeElements() {
    return Array.from(document.querySelectorAll(SIDEBAR_SCOPE_SELECTOR));
}

function getSidebarControlRow(el) {
    const explicitRow = getSidebarRow(el);
    if (explicitRow !== el) return explicitRow;

    let row = el;
    let parent = el.parentElement;
    while (parent && getSidebarScope(parent) && !parent.matches(SIDEBAR_SCOPE_SELECTOR)) {
        const text = cleanSidebarText(parent.textContent);
        if (text.length > 90 || parent.children.length > 8) break;
        row = parent;
        parent = parent.parentElement;
    }

    return row;
}

function detectSidebarItems() {
    const links = Array.from(document.querySelectorAll('a[href*="#"]'));
    const seenRows = new Set();
    const items = [];

    links.forEach((link) => {
        if (link.closest('#gb') || link.closest('.gmail-sidebar-panel')) return;
        if (!getSidebarScope(link)) return;

        const key = getSidebarItemKey(link);
        if (!key) return;

        const row = getSidebarRow(link);
        if (!row || seenRows.has(row)) return;

        seenRows.add(row);
        row.dataset.gmailSidebarKey = key;
        items.push({
            key,
            label: getSidebarItemLabel(link, key),
            row
        });
    });

    return items;
}

function removeStalePinnedSidebarRows(visibleItems, nativeItems, expectedParent) {
    const nativeKeys = new Set(nativeItems
        .filter((item) => !item.row.closest('.gmail-sidebar-pinned-row'))
        .map((item) => item.key));

    document.querySelectorAll('.gmail-sidebar-pinned-row').forEach((row) => {
        const key = row.dataset.gmailSidebarKey;
        if (!visibleItems.has(key) || nativeKeys.has(key) || (expectedParent && row.parentElement !== expectedParent)) {
            row.remove();
        }
    });
}

function getSidebarInsertParent(nativeItems, moreToggle) {
    const firstNativeRow = nativeItems.find((item) => item.row && item.row.parentElement)?.row;
    if (firstNativeRow) {
        const listRow = firstNativeRow.closest('.aim') || firstNativeRow;
        if (listRow.parentElement) return listRow.parentElement;
    }

    const moreRow = moreToggle ? getSidebarControlRow(moreToggle) : null;
    if (moreRow && moreRow.parentElement) {
        const listRow = moreRow.closest('.n6') || moreRow;
        if (listRow.parentElement) return listRow.parentElement;
    }

    const scope = getSidebarScopeElements().find((el) => el.querySelector('a[href*="#"], [role="button"], [aria-expanded]'));
    return scope || null;
}

function createPinnedSidebarRow(key) {
    const label = keyToLabel(key);
    const href = CORE_SIDEBAR_HREFS[key];
    if (!href) return null;

    const row = document.createElement('div');
    row.className = 'aim gmail-sidebar-pinned-row';
    row.dataset.gmailSidebarKey = key;
    row.innerHTML = `
        <div class="TO">
            <div class="TN bzz">
                <div class="qj"></div>
                <div class="aio">
                    <span class="nU">
                        <a class="J-Ke n0 gmail-sidebar-pinned-link" href="${escapeAttribute(href)}" aria-label="${escapeAttribute(label)}">${escapeHTML(label)}</a>
                    </span>
                </div>
            </div>
        </div>
    `;

    return row;
}

function ensurePinnedVisibleSidebarItems(visibleItems, nativeItems, moreToggle) {
    const nativeKeys = new Set(nativeItems
        .filter((item) => !item.row.closest('.gmail-sidebar-pinned-row'))
        .map((item) => item.key));
    const parent = getSidebarInsertParent(nativeItems, moreToggle);
    if (!parent) return;

    removeStalePinnedSidebarRows(visibleItems, nativeItems, parent);

    Array.from(visibleItems).forEach((key) => {
        if (!CORE_SIDEBAR_HREFS[key] || nativeKeys.has(key)) return;
        if (document.querySelector(`.gmail-sidebar-pinned-row[data-gmail-sidebar-key="${CSS.escape(key)}"]`)) return;

        const row = createPinnedSidebarRow(key);
        if (row) parent.appendChild(row);
    });
}

function getSidebarMoreToggles() {
    const seen = new Set();

    return Array.from(document.querySelectorAll('[role="button"], [aria-expanded], a, div'))
        .filter((el) => {
            if (el.closest('#gb') || el.closest('.gmail-sidebar-panel')) return false;
            if (!getSidebarScope(el)) return false;
            const text = getSidebarElementText(el);
            if (text.length > 40) return false;
            return isMoreToggleText(text);
        })
        .filter((el) => {
            const isMoreToggle = isMoreToggleText(getSidebarElementText(el));
            const row = getSidebarControlRow(el);
            if (!isMoreToggle || seen.has(row)) return false;
            seen.add(row);
            return true;
        });
}

function getSidebarMoreToggle() {
    return getSidebarMoreToggles()[0] || null;
}

function isSidebarMoreExpanded(toggle) {
    if (!toggle) return false;
    const text = getSidebarElementText(toggle);
    return toggle.getAttribute('aria-expanded') === 'true' ||
        isLessToggleText(text);
}

function getAuxiliarySidebarHeaderRows() {
    const seen = new Set();

    return getSidebarScopeElements()
        .flatMap((scope) => Array.from(scope.querySelectorAll('*')))
        .filter((el) => {
            if (el.closest('#gb') || el.closest('.gmail-sidebar-panel')) return false;
            const text = normalizeSidebarControlText(getSidebarElementText(el));
            return /^(labels|etiquetas|categories|categorias|categorías)$/i.test(text);
        })
        .map(getSidebarControlRow)
        .filter((row) => {
            if (!row || seen.has(row)) return false;
            seen.add(row);
            return true;
        });
}

function isUnsafeSidebarAuxiliaryRow(row, visibleItems) {
    if (!row || row.matches('[role="navigation"], nav')) return true;

    const visibleItemRows = detectSidebarItems()
        .filter((item) => visibleItems.has(item.key))
        .map((item) => item.row);

    return visibleItemRows.some((itemRow) => row !== itemRow && row.contains(itemRow));
}

function toggleAuxiliarySidebarControls(settings, primaryMoreToggle, visibleItems) {
    const primaryMoreRow = primaryMoreToggle ? getSidebarControlRow(primaryMoreToggle) : null;
    const primaryMoreExpanded = isSidebarMoreExpanded(primaryMoreToggle);
    const secondaryMoreRows = getSidebarMoreToggles()
        .map(getSidebarControlRow)
        .filter((row) => row && row !== primaryMoreRow);
    const headerRows = getAuxiliarySidebarHeaderRows();
    const shouldHideHeaders = settings.enabled && Boolean(primaryMoreToggle) && !primaryMoreExpanded;

    secondaryMoreRows.forEach((row) => {
        if (isUnsafeSidebarAuxiliaryRow(row, visibleItems)) return;
        row.classList.toggle('gmail-sidebar-hidden-by-extension', settings.enabled);
    });

    headerRows.forEach((row) => {
        if (isUnsafeSidebarAuxiliaryRow(row, visibleItems)) return;
        row.classList.toggle('gmail-sidebar-hidden-by-extension', shouldHideHeaders);
    });
}

function applySidebarSimplifier() {
    getSidebarSettings((settings) => {
        const visibleItems = new Set(settings.visibleItems);
        const moreToggle = getSidebarMoreToggle();
        const moreExpanded = isSidebarMoreExpanded(moreToggle);
        const sidebarItems = detectSidebarItems();

        if (settings.enabled) {
            ensurePinnedVisibleSidebarItems(visibleItems, sidebarItems, moreToggle);
        } else {
            document.querySelectorAll('.gmail-sidebar-pinned-row').forEach((row) => row.remove());
        }

        const updatedSidebarItems = detectSidebarItems();

        toggleAuxiliarySidebarControls(settings, moreToggle, visibleItems);

        updatedSidebarItems.forEach((item) => {
            const shouldHide = settings.enabled && !moreExpanded && !visibleItems.has(item.key);
            item.row.classList.toggle('gmail-sidebar-hidden-by-extension', shouldHide);
        });

        updateSidebarButtonAppearance(settings);

        const panel = document.getElementById('gmail-sidebar-settings-panel');
        if (panel) {
            const theme = document.documentElement.getAttribute('data-custom-theme');
            const darkActive = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            panel.dataset.themeActive = String(darkActive);
        }
    });
}

function scheduleSidebarSimplifier(delay = 300) {
    if (window._sidebarSimplifyTimeout) return;
    window._sidebarSimplifyTimeout = setTimeout(() => {
        window._sidebarSimplifyTimeout = null;
        applySidebarSimplifier();
    }, delay);
}

function updateSidebarButtonAppearance(settings) {
    const btn = document.getElementById('gmail-theme-toggle-btn');
    if (!btn) return;

    if (settings) {
        btn.setAttribute('data-sidebar-enabled', String(settings.enabled));
        return;
    }

    getSidebarSettings((nextSettings) => {
        btn.setAttribute('data-sidebar-enabled', String(nextSettings.enabled));
    });
}

function toggleSidebarSettingsPanel() {
    const existing = document.getElementById('gmail-sidebar-settings-panel');
    if (existing) {
        existing.remove();
        return;
    }

    getSidebarSettings(renderSidebarSettingsPanel);
}

function getSidebarOptions() {
    const detected = detectSidebarItems();
    const options = new Map();

    Object.entries(CORE_SIDEBAR_ITEMS).forEach(([key, label]) => {
        options.set(key, { key, label });
    });

    detected.forEach((item) => {
        options.set(item.key, { key: item.key, label: item.label || keyToLabel(item.key) });
    });

    return Array.from(options.values()).sort((a, b) => {
        const aCoreIndex = Object.keys(CORE_SIDEBAR_ITEMS).indexOf(a.key);
        const bCoreIndex = Object.keys(CORE_SIDEBAR_ITEMS).indexOf(b.key);
        if (aCoreIndex !== -1 || bCoreIndex !== -1) {
            if (aCoreIndex === -1) return 1;
            if (bCoreIndex === -1) return -1;
            return aCoreIndex - bCoreIndex;
        }
        return a.label.localeCompare(b.label);
    });
}

function renderSidebarSettingsPanel(settings) {
    const previous = document.getElementById('gmail-sidebar-settings-panel');
    if (previous) previous.remove();

    const panel = document.createElement('div');
    panel.id = 'gmail-sidebar-settings-panel';
    panel.className = 'gmail-sidebar-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Gmail extension settings');

    const theme = document.documentElement.getAttribute('data-custom-theme') || 'system';
    const darkActive = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    panel.dataset.themeActive = String(darkActive);

    const visibleItems = new Set(settings.visibleItems);
    const options = getSidebarOptions();

    panel.innerHTML = `
        <div class="gmail-sidebar-panel-header">
            <div class="gmail-sidebar-panel-title">Gmail settings</div>
            <button class="gmail-sidebar-panel-close" type="button" aria-label="Close sidebar settings">&times;</button>
        </div>
        <div class="gmail-sidebar-panel-body">
            <div class="gmail-sidebar-section-title">Theme</div>
            <div class="gmail-theme-options">
                ${['light', 'system', 'dark'].map((themeKey) => `
                    <button class="gmail-theme-option" type="button" data-theme-choice="${themeKey}" data-active="${theme === themeKey}">
                        ${ICONS[themeKey]}
                        <span>${THEME_LABELS[themeKey]}</span>
                    </button>
                `).join('')}
            </div>
            <div class="gmail-sidebar-section-title">Sidebar</div>
            <label class="gmail-sidebar-master-row">
                <input type="checkbox" data-sidebar-master ${settings.enabled ? 'checked' : ''}>
                <span>Simplify sidebar</span>
            </label>
            <div data-sidebar-options></div>
            <div class="gmail-sidebar-panel-actions">
                <button class="gmail-sidebar-reset" type="button">Reset defaults</button>
            </div>
        </div>
    `;

    const optionsContainer = panel.querySelector('[data-sidebar-options]');
    if (options.length === 0) {
        optionsContainer.innerHTML = '<div class="gmail-sidebar-panel-empty">Open Gmail navigation once to detect sidebar items.</div>';
    } else {
        options.forEach((option) => {
            const row = document.createElement('label');
            row.className = 'gmail-sidebar-option';
            row.innerHTML = `
                <input type="checkbox" data-sidebar-key="${escapeAttribute(option.key)}" ${visibleItems.has(option.key) ? 'checked' : ''}>
                <span title="${escapeAttribute(option.label)}">${escapeHTML(option.label)}</span>
            `;
            optionsContainer.appendChild(row);
        });
    }

    panel.querySelector('.gmail-sidebar-panel-close').onclick = () => panel.remove();
    panel.querySelectorAll('[data-theme-choice]').forEach((button) => {
        button.onclick = () => {
            const nextTheme = button.dataset.themeChoice;
            chrome.storage.sync.set({ gmailTheme: nextTheme }, () => {
                updateTheme(nextTheme);
                updateToggleButton(nextTheme);
                renderSidebarSettingsPanel(settings);
            });
        };
    });
    panel.querySelector('[data-sidebar-master]').onchange = (e) => {
        saveSidebarSettings({ gmailSidebarSimplifyEnabled: e.target.checked });
    };
    panel.querySelector('.gmail-sidebar-reset').onclick = () => {
        saveSidebarSettings({
            gmailSidebarSimplifyEnabled: true,
            gmailSidebarVisibleItems: [...SIDEBAR_DEFAULT_VISIBLE]
        });
    };

    panel.querySelectorAll('[data-sidebar-key]').forEach((input) => {
        input.onchange = () => {
            const nextVisible = new Set(settings.visibleItems);
            const key = input.dataset.sidebarKey;
            if (input.checked) {
                nextVisible.add(key);
            } else {
                nextVisible.delete(key);
            }

            saveSidebarSettings({ gmailSidebarVisibleItems: Array.from(nextVisible) });
        };
    });

    document.body.appendChild(panel);

    setTimeout(() => {
        const closeOnOutsideClick = (e) => {
            if (!panel.contains(e.target) && !e.target.closest('#gmail-theme-toggle-btn')) {
                panel.remove();
                document.removeEventListener('click', closeOnOutsideClick, true);
            }
        };
        document.addEventListener('click', closeOnOutsideClick, true);
    }, 0);
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
    return escapeHTML(value);
}

// --- 5. Update Theme Function ---
function updateTheme(theme) {
    document.documentElement.setAttribute('data-custom-theme', theme);
    
    // Apply or remove email background fixes
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        fixEmailBackgrounds();
    } else {
        restoreEmailBackgrounds();
    }
}

// --- 5. Fix Email Backgrounds with JavaScript ---
const originalStyles = new WeakMap();

function fixEmailBackgrounds() {
    const emailContainers = document.querySelectorAll('.a3s, .ii, .adn, .gs');
    
    emailContainers.forEach(container => {
        // Process all table elements and common containers
        const allElements = container.querySelectorAll('table, td, tr, th, tbody, thead, div, span, p');
        allElements.forEach(el => {
            const computed = window.getComputedStyle(el);
            const bgColor = computed.backgroundColor;
            
            if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
                const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (match) {
                    const r = parseInt(match[1]);
                    const g = parseInt(match[2]);
                    const b = parseInt(match[3]);
                    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
                    
                    if (luminance < 80) {
                        if (!originalStyles.has(el)) {
                            originalStyles.set(el, el.getAttribute('style'));
                        }
                        el.style.setProperty('background-color', 'transparent', 'important');
                        el.style.setProperty('background', 'transparent', 'important');
                    }
                }
            }
        });
        
        // Process embedded style tags
        container.querySelectorAll('style').forEach(styleTag => {
            if (!styleTag.dataset.darkModeProcessed) {
                const originalCSS = styleTag.textContent;
                const darkCSS = originalCSS
                    .replace(/background(-color)?:\s*#[0-9a-fA-F]{3,6}/gi, 'background-color:transparent')
                    .replace(/background:\s*[^;]+;/gi, 'background:transparent;')
                    .replace(/background-color:\s*(white|beige|ivory|snow|seashell|linen|oldlace|floralwhite|cornsilk|lightyellow|#[fFeEdDcCbBaA9][0-9a-fA-F]{2,5})[^;]*/gi, 'background-color:transparent');
                
                styleTag.textContent = darkCSS;
                styleTag.dataset.darkModeProcessed = 'true';
                styleTag.dataset.originalCSS = originalCSS;
            }
        });
    });
    
    // Elements with inline background styles
    document.querySelectorAll('[style*="background"]').forEach(el => {
        if (el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'CANVAS') return;
        if (el.closest('#gb') || el.closest('.theme-toggle-btn') || el.closest('.gmail-sidebar-panel')) return;
        
        if (!originalStyles.has(el)) {
            originalStyles.set(el, el.getAttribute('style'));
        }
        el.style.setProperty('background', 'transparent', 'important');
        el.style.setProperty('background-color', 'transparent', 'important');
        el.style.setProperty('background-image', 'none', 'important');
    });
    
    // Elements with bgcolor attribute
    document.querySelectorAll('[bgcolor]').forEach(el => {
        if (el.closest('#gb') || el.closest('.gmail-sidebar-panel')) return;
        if (!originalStyles.has(el)) {
            originalStyles.set(el, el.getAttribute('style'));
        }
        el.setAttribute('bgcolor', 'transparent');
        el.style.setProperty('background-color', 'transparent', 'important');
    });
    
    // Newsletter-specific selectors
    const newsletterSelectors = [
        '#templateHeader', '#templateBody', '#templateFooter', '#templatePreheader',
        '.bodyContainer', '.headerContainer', '.footerContainer',
        '.mcnTextContent', '.mcnTextBlock'
    ];
    
    newsletterSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (!originalStyles.has(el)) {
                originalStyles.set(el, el.getAttribute('style'));
            }
            el.style.setProperty('background', 'transparent', 'important');
            el.style.setProperty('background-color', 'transparent', 'important');
            el.style.setProperty('background-image', 'none', 'important');
        });
    });
}

// --- 6. Restore Email Backgrounds ---
function restoreEmailBackgrounds() {
    document.querySelectorAll('[style*="background"]').forEach(el => {
        if (originalStyles.has(el)) {
            const original = originalStyles.get(el);
            if (original) {
                el.setAttribute('style', original);
            } else {
                el.removeAttribute('style');
            }
            originalStyles.delete(el);
        }
    });
    
    // Restore style tags
    document.querySelectorAll('style[data-dark-mode-processed]').forEach(styleTag => {
        if (styleTag.dataset.originalCSS) {
            styleTag.textContent = styleTag.dataset.originalCSS;
        }
        delete styleTag.dataset.darkModeProcessed;
        delete styleTag.dataset.originalCSS;
    });
}

// --- 7. Check if Gmail is Ready ---
function checkGmailReady() {
    // Gmail is ready when the header bar (#gb) or main content area exists
    const isReady = document.getElementById('gb') || document.querySelector('[role="navigation"]') || document.querySelector('.nH');
    if (isReady && !document.documentElement.classList.contains('gmail-ready')) {
        document.documentElement.classList.add('gmail-ready');
    }
    return isReady;
}

// --- 8. Initialization ---
chrome.storage.sync.get(['gmailTheme'], (res) => {
    const theme = res.gmailTheme || 'system';
    updateTheme(theme);
    updateToggleButton(theme);
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.gmailTheme) {
        updateTheme(changes.gmailTheme.newValue);
        updateToggleButton(changes.gmailTheme.newValue);
        applySidebarSimplifier();
        if (document.getElementById('gmail-sidebar-settings-panel')) {
            getSidebarSettings(renderSidebarSettingsPanel);
        }
    }

    if (changes.gmailSidebarSimplifyEnabled || changes.gmailSidebarVisibleItems) {
        applySidebarSimplifier();
    }
});

injectSwitcher();
checkGmailReady();
scheduleSidebarSimplifier();
window.addEventListener('resize', positionSettingsButtonSlot);

// Gmail SPA observer - watch for DOM changes
const observer = new MutationObserver(() => {
    checkGmailReady();
    injectSwitcher();
    positionSettingsButtonSlot();
    scheduleSidebarSimplifier();

    const theme = document.documentElement.getAttribute('data-custom-theme');
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        clearTimeout(window._fixBgTimeout);
        window._fixBgTimeout = setTimeout(fixEmailBackgrounds, 100);
    }
});
observer.observe(document.body, { attributes: true, characterData: true, childList: true, subtree: true });

document.addEventListener('click', (e) => {
    if (getSidebarScope(e.target)) {
        scheduleSidebarSimplifier(75);
        setTimeout(applySidebarSimplifier, 350);
        setTimeout(applySidebarSimplifier, 900);
    }
}, true);

// Backup checks for dynamic content
setInterval(() => {
    checkGmailReady();
    injectSwitcher();
    positionSettingsButtonSlot();
    scheduleSidebarSimplifier();
}, 2000);

setInterval(() => {
    const theme = document.documentElement.getAttribute('data-custom-theme');
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        fixEmailBackgrounds();
    }
}, 1000);
