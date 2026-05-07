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
    if (document.getElementById('gmail-theme-toggle-btn')) return;

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
    }
}

// --- 4. Update Theme Function ---
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
        if (el.closest('#gb') || el.closest('.theme-toggle-btn')) return;
        
        if (!originalStyles.has(el)) {
            originalStyles.set(el, el.getAttribute('style'));
        }
        el.style.setProperty('background', 'transparent', 'important');
        el.style.setProperty('background-color', 'transparent', 'important');
        el.style.setProperty('background-image', 'none', 'important');
    });
    
    // Elements with bgcolor attribute
    document.querySelectorAll('[bgcolor]').forEach(el => {
        if (el.closest('#gb')) return;
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
    }
});

injectSwitcher();
checkGmailReady();

// Gmail SPA observer - watch for DOM changes
const observer = new MutationObserver(() => {
    checkGmailReady();
injectSwitcher();

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
}, 2000);

setInterval(() => {
    const theme = document.documentElement.getAttribute('data-custom-theme');
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        fixEmailBackgrounds();
    }
}, 1000);