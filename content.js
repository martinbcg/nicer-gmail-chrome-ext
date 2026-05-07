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
    background: transparent;
    border: none;
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
    margin: 0 4px;
  }
  .theme-toggle-btn:hover {
    background: rgba(60, 64, 67, 0.1);
    transform: scale(1.1);
  }
  .theme-toggle-btn:active {
    transform: scale(0.95);
  }
  .theme-toggle-btn svg {
    fill: #5f6368;
    width: 20px;
    height: 20px;
    transition: fill 0.2s;
  }
  .theme-toggle-btn[data-theme="dark"] svg {
    fill: #8ab4f8;
  }
  .theme-toggle-btn[data-theme="system"] svg {
    fill: #81c995;
  }

  .sidebar-settings-btn {
    background: transparent;
    border: none;
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
    margin: 0 4px;
  }
  .sidebar-settings-btn:hover {
    background: rgba(60, 64, 67, 0.1);
    transform: scale(1.1);
  }
  .sidebar-settings-btn:active {
    transform: scale(0.95);
  }
  .sidebar-settings-btn svg {
    fill: #5f6368;
    width: 20px;
    height: 20px;
    transition: fill 0.2s;
  }
  .sidebar-settings-btn[data-enabled="true"] svg {
    fill: #fbbc04;
  }

  .gmail-sidebar-hidden-by-extension {
    display: none !important;
  }
  .gmail-sidebar-force-visible-by-extension {
    display: block !important;
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

const TITLES = {
  light: 'Light Mode (click for System)',
  dark: 'Dark Mode (click for Light)',
  system: 'System Mode (click for Dark)'
};

const SIDEBAR_DEFAULT_VISIBLE = ['inbox', 'sent', 'drafts'];
const SIDEBAR_STORAGE_KEYS = ['gmailSidebarSimplifyEnabled', 'gmailSidebarVisibleItems'];

const SIDEBAR_ICON = `<svg viewBox="0 0 24 24"><path d="M3 5.5C3 4.67 3.67 4 4.5 4h15c.83 0 1.5.67 1.5 1.5v13c0 .83-.67 1.5-1.5 1.5h-15C3.67 20 3 19.33 3 18.5v-13zM5 6v12h4V6H5zm6 0v12h8V6h-8zm-5 3h2v1.5H6V9zm0 3h2v1.5H6V12zm0 3h2v1.5H6V15z"/></svg>`;

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

// --- 2. Update Toggle Button Appearance ---
function updateToggleButton(theme) {
    const btn = document.getElementById('gmail-theme-toggle-btn');
    if (!btn) return;
    
    btn.innerHTML = ICONS[theme] || ICONS.system;
    btn.title = TITLES[theme] || TITLES.system;
    btn.setAttribute('data-theme', theme);
}

// --- 3. Inject Button into Gmail UI ---
function injectSwitcher() {
    // Check if button already exists
    if (document.getElementById('gmail-theme-toggle-btn')) {
        injectSidebarButton();
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
        const btn = document.createElement('button');
        btn.id = 'gmail-theme-toggle-btn';
        btn.className = 'theme-toggle-btn';
        btn.setAttribute('aria-label', 'Switch Theme');
        btn.type = 'button';
        btn.style.marginLeft = '10px';
        
        // Get current theme and set initial icon
        chrome.storage.sync.get(['gmailTheme'], (res) => {
            const currentTheme = res.gmailTheme || 'system';
            btn.innerHTML = ICONS[currentTheme] || ICONS.system;
            btn.title = TITLES[currentTheme] || TITLES.system;
            btn.setAttribute('data-theme', currentTheme);
        });

        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            chrome.storage.sync.get(['gmailTheme'], (res) => {
                const current = res.gmailTheme || 'system';
                let next = 'dark';
                if (current === 'dark') next = 'light';
                else if (current === 'light') next = 'system';
                
                chrome.storage.sync.set({ gmailTheme: next }, () => {
                    updateTheme(next);
                    updateToggleButton(next);
                });
            });
        };

        // Placement Logic
        // Priority 1: Insert before the Search Bar (Center of header)
        // This is usually the most stable place in the flux layout
        const searchForm = document.querySelector('form[role="search"]');
        if (searchForm) {
            // We want the main container of the search form to insert before it
            // usually it's a few levels up
            let searchWrapper = searchForm.closest('div.gb_Td') || searchForm.closest('div.gb_Ld') || searchForm.parentElement;
            
            if (searchWrapper && searchWrapper.parentElement && window.getComputedStyle(searchWrapper.parentElement).display === 'flex') {
                 searchWrapper.parentElement.insertBefore(btn, searchWrapper);
                 btn.style.marginRight = '20px';
                 btn.style.marginLeft = '10px';
                 injectSidebarButton();
                 return;
            }
        }

        // Priority 2: Next to the Logo (Top Left)
        if (anchor.classList.contains('gb_jd') || anchor.classList.contains('gb_gd') || anchor.getAttribute('aria-label') === 'Gmail') {
             const wrapper = anchor.closest('div.gb_gd') || anchor.closest('div.gb_fd') || anchor.closest('div'); 
             if (wrapper) {
                 wrapper.after(btn);
                 btn.style.marginLeft = '20px';
                 btn.style.alignSelf = 'center';
             } else {
                 anchor.after(btn);
                 btn.style.marginLeft = '20px';
             }
        }
        // Priority 3: Fallback to Top Right Header
        else {
            let target = anchor.closest('.gb_Kd') || anchor.closest('.gb_re') || anchor.parentElement;
            
            if (target && target.tagName !== 'BODY' && target.tagName !== 'HTML') {
                const style = window.getComputedStyle(target);
                if (style.display === 'flex' || style.display === 'inline-flex') {
                    target.insertBefore(btn, target.lastElementChild);
                } else {
                    target.appendChild(btn);
                }
            } else {
                 document.body.appendChild(btn);
                 btn.style.position = 'fixed';
                 btn.style.top = '12px';
                 btn.style.left = '260px'; // Top Left-ish (after sidebar)
                 btn.style.zIndex = '99999';
                 btn.style.backgroundColor = 'white';
                 btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
            }
        }

        injectSidebarButton();
    } else {
        injectSidebarButton();
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

function getSidebarRow(link) {
    return link.closest('.TO') ||
        link.closest('.aim') ||
        link.closest('[role="treeitem"]') ||
        link.closest('[role="link"]') ||
        link;
}

function detectSidebarItems() {
    const links = Array.from(document.querySelectorAll('a[href*="#"]'));
    const seenRows = new Set();
    const items = [];

    links.forEach((link) => {
        if (link.closest('#gb') || link.closest('.gmail-sidebar-panel')) return;
        const navigation = link.closest('[role="navigation"], nav');
        if (!navigation) return;

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

function isSidebarMoreExpanded() {
    const toggles = Array.from(document.querySelectorAll('[role="button"], [aria-expanded], a, div'))
        .filter((el) => {
            if (el.closest('#gb') || el.closest('.gmail-sidebar-panel')) return false;
            if (!el.closest('[role="navigation"], nav')) return false;
            const text = cleanSidebarText(el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent);
            if (text.length > 40) return false;
            return /^(less|menos)$/i.test(text) || /\b(show less|mostrar menos)\b/i.test(text) || /\b(show more|mostrar mas|mostrar más)\b/i.test(text);
        });

    return toggles.some((toggle) => {
        const text = cleanSidebarText(toggle.getAttribute('aria-label') || toggle.getAttribute('title') || toggle.textContent);
        return toggle.getAttribute('aria-expanded') === 'true' || /^(less|menos)$/i.test(text) || /\b(show less|mostrar menos)\b/i.test(text);
    });
}

function findSidebarMoreRow() {
    const toggles = Array.from(document.querySelectorAll('[role="button"], [aria-expanded], a, div'))
        .filter((el) => {
            if (el.closest('#gb') || el.closest('.gmail-sidebar-panel')) return false;
            if (!el.closest('[role="navigation"], nav')) return false;
            const text = cleanSidebarText(el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent);
            if (text.length > 40) return false;
            return /^(more|mas|más|less|menos)$/i.test(text) ||
                /\b(show more|show less|mostrar mas|mostrar más|mostrar menos)\b/i.test(text);
        });

    const toggle = toggles.find((el) => {
        const text = cleanSidebarText(el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent);
        return /^(more|mas|más|less|menos)$/i.test(text) ||
            /\b(show more|show less|mostrar mas|mostrar más|mostrar menos)\b/i.test(text);
    });

    return toggle ? getSidebarRow(toggle) : null;
}

function arrangeSidebarItemsAroundMore(items, visibleItems, moreRow) {
    if (!moreRow || !moreRow.parentElement) return;

    const parent = moreRow.parentElement;
    const visibleRows = items
        .filter((item) => visibleItems.has(item.key) && item.row.parentElement === parent)
        .map((item) => item.row);
    const hiddenRows = items
        .filter((item) => !visibleItems.has(item.key) && item.row.parentElement === parent)
        .map((item) => item.row);
    const desiredOrder = [...visibleRows, moreRow, ...hiddenRows];

    for (let index = desiredOrder.length - 1; index >= 0; index--) {
        const row = desiredOrder[index];
        const nextRow = desiredOrder[index + 1] || null;
        if (row !== moreRow && row.nextSibling !== nextRow) {
            parent.insertBefore(row, nextRow);
        }
    }

}

function applySidebarSimplifier() {
    getSidebarSettings((settings) => {
        const visibleItems = new Set(settings.visibleItems);
        const moreExpanded = isSidebarMoreExpanded();
        const moreRow = findSidebarMoreRow();
        const sidebarItems = detectSidebarItems();

        sidebarItems.forEach((item) => {
            item.row.classList.remove('gmail-sidebar-force-visible-by-extension');
        });

        if (settings.enabled && !moreExpanded) {
            arrangeSidebarItemsAroundMore(sidebarItems, visibleItems, moreRow);
        }

        sidebarItems.forEach((item) => {
            const shouldHide = settings.enabled && !moreExpanded && !visibleItems.has(item.key);
            item.row.classList.toggle('gmail-sidebar-hidden-by-extension', shouldHide);
            item.row.classList.toggle('gmail-sidebar-force-visible-by-extension', settings.enabled && !moreExpanded && visibleItems.has(item.key));
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

function scheduleSidebarSimplifier(delay = 120) {
    clearTimeout(window._sidebarSimplifyTimeout);
    window._sidebarSimplifyTimeout = setTimeout(applySidebarSimplifier, delay);
}

function injectSidebarButton() {
    if (document.getElementById('gmail-sidebar-settings-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'gmail-sidebar-settings-btn';
    btn.className = 'sidebar-settings-btn';
    btn.setAttribute('aria-label', 'Configure Gmail sidebar');
    btn.title = 'Configure Gmail sidebar';
    btn.type = 'button';
    btn.innerHTML = SIDEBAR_ICON;

    btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebarSettingsPanel();
    };

    const themeButton = document.getElementById('gmail-theme-toggle-btn');
    if (themeButton && themeButton.parentElement) {
        themeButton.after(btn);
    } else {
        document.body.appendChild(btn);
        btn.style.position = 'fixed';
        btn.style.top = '12px';
        btn.style.left = '308px';
        btn.style.zIndex = '99999';
        btn.style.backgroundColor = 'white';
        btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
    }

    updateSidebarButtonAppearance();
}

function updateSidebarButtonAppearance(settings) {
    const btn = document.getElementById('gmail-sidebar-settings-btn');
    if (!btn) return;

    if (settings) {
        btn.setAttribute('data-enabled', String(settings.enabled));
        return;
    }

    getSidebarSettings((nextSettings) => {
        btn.setAttribute('data-enabled', String(nextSettings.enabled));
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
    panel.setAttribute('aria-label', 'Gmail sidebar settings');

    const theme = document.documentElement.getAttribute('data-custom-theme');
    const darkActive = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    panel.dataset.themeActive = String(darkActive);

    const visibleItems = new Set(settings.visibleItems);
    const options = getSidebarOptions();

    panel.innerHTML = `
        <div class="gmail-sidebar-panel-header">
            <div class="gmail-sidebar-panel-title">Sidebar</div>
            <button class="gmail-sidebar-panel-close" type="button" aria-label="Close sidebar settings">&times;</button>
        </div>
        <div class="gmail-sidebar-panel-body">
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
            if (!panel.contains(e.target) && !e.target.closest('#gmail-sidebar-settings-btn')) {
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
        if (el.closest('#gb') || el.closest('.theme-toggle-btn') || el.closest('.sidebar-settings-btn') || el.closest('.gmail-sidebar-panel')) return;
        
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
    }

    if (changes.gmailSidebarSimplifyEnabled || changes.gmailSidebarVisibleItems) {
        applySidebarSimplifier();
    }
});

injectSwitcher();
checkGmailReady();
scheduleSidebarSimplifier();

// Gmail SPA observer - watch for DOM changes
const observer = new MutationObserver(() => {
    checkGmailReady();
    injectSwitcher();
    scheduleSidebarSimplifier();

    const theme = document.documentElement.getAttribute('data-custom-theme');
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        clearTimeout(window._fixBgTimeout);
        window._fixBgTimeout = setTimeout(fixEmailBackgrounds, 100);
    }
});
observer.observe(document.body, { childList: true, subtree: true });

// Backup checks for dynamic content
setInterval(() => {
    checkGmailReady();
    injectSwitcher();
    scheduleSidebarSimplifier();
}, 2000);

setInterval(() => {
    const theme = document.documentElement.getAttribute('data-custom-theme');
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        fixEmailBackgrounds();
    }
}, 1000);
