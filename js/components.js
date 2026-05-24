/**
 * Commonwealth Legacy RP - Shared Components & Layout Engine
 * Handles dynamic preloader, sticky navigation, mobile menus, and global footers.
 */

// Vector SVG Library (Commonwealth Beacon, Department Crests, UI elements)
const SVGIcons = {
  beacon: `<svg class="logo-beacon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 3" />
    <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" stroke-width="1" />
    <circle cx="50" cy="50" r="33" fill="none" stroke="currentColor" stroke-width="1.5" />
    <polygon points="50,6 46,16 54,16" fill="currentColor" />
    <polygon points="50,94 46,84 54,84" fill="currentColor" />
    <polygon points="94,50 84,46 84,54" fill="currentColor" />
    <polygon points="6,50 16,46 16,54" fill="currentColor" />
    <polygon points="50,50 81,19 78,25 73,22" fill="currentColor" opacity="0.7" />
    <polygon points="50,50 81,81 73,78 76,73" fill="currentColor" opacity="0.7" />
    <polygon points="50,50 19,81 22,73 27,76" fill="currentColor" opacity="0.7" />
    <polygon points="50,50 19,19 27,22 24,27" fill="currentColor" opacity="0.7" />
    <circle cx="50" cy="50" r="26" fill="var(--bg)" stroke="currentColor" stroke-width="2" />
    <rect x="36" y="58" width="28" height="3" fill="currentColor" />
    <rect x="38" y="55" width="24" height="3" fill="currentColor" />
    <rect x="41" y="47" width="2" height="8" fill="currentColor" />
    <rect x="45" y="47" width="2" height="8" fill="currentColor" />
    <rect x="49" y="47" width="2" height="8" fill="currentColor" />
    <rect x="53" y="47" width="2" height="8" fill="currentColor" />
    <rect x="57" y="47" width="2" height="8" fill="currentColor" />
    <path d="M40 47 C40 37, 60 37, 60 47 Z" fill="currentColor" />
    <rect x="48" y="32" width="4" height="6" fill="currentColor" />
    <polygon points="50,26 47,32 53,32" fill="currentColor" />
    <line x1="50" y1="26" x2="50" y2="20" stroke="currentColor" stroke-width="1" />
    <polygon points="50,20 54,22 50,24" fill="currentColor" />
  </svg>`,
  
  vsp: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L85 20 V55 C85 75 50 95 50 95 C50 95 15 75 15 55 V20 L50 5 Z" fill="none" stroke="currentColor" stroke-width="4"/>
    <path d="M50 15 L75 27 V52 C75 67 50 82 50 82 C50 82 25 67 25 52 V27 L50 15 Z" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="50" cy="45" r="12" fill="none" stroke="currentColor" stroke-width="2"/>
    <polygon points="50,38 53,44 60,45 55,50 56,57 50,53 44,57 45,50 40,45 47,44" fill="currentColor"/>
    <path d="M35 70 Q50 63 65 70" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  
  vbso: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- 5-Point Sheriff Star -->
    <polygon points="50,5 63,33 93,33 69,51 78,81 50,63 22,81 31,51 7,33 37,33" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="50" cy="46" r="16" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="50" cy="5" r="3.5" fill="currentColor"/>
    <circle cx="93" cy="33" r="3.5" fill="currentColor"/>
    <circle cx="78" cy="81" r="3.5" fill="currentColor"/>
    <circle cx="22" cy="81" r="3.5" fill="currentColor"/>
    <circle cx="7" cy="33" r="3.5" fill="currentColor"/>
    <polygon points="50,37 53,43 59,44 54,48 56,54 50,51 44,54 46,48 41,44 47,43" fill="currentColor"/>
  </svg>`,
  
  vems: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Star of Life -->
    <path d="M50 5 V95 M27 18 L73 82 M18 63 L82 37" stroke="currentColor" stroke-width="12" stroke-linecap="square"/>
    <!-- Outer white border for visual weight -->
    <path d="M50 5 V95 M27 18 L73 82 M18 63 L82 37" stroke="var(--surface)" stroke-width="4" stroke-linecap="square"/>
    <!-- Rod of Asclepius -->
    <path d="M50 25 V75" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M43 70 Q57 60 43 50 Q57 40 43 30 Q57 20 50 25" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  
  doj: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Scales of Justice -->
    <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" stroke-width="4"/>
    <line x1="50" y1="85" x2="50" y2="90" stroke="currentColor" stroke-width="6"/>
    <line x1="35" y1="90" x2="65" y2="90" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
    <!-- Beam -->
    <line x1="18" y1="28" x2="82" y2="28" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="28" r="4.5" fill="currentColor"/>
    <!-- Left Scale -->
    <line x1="18" y1="28" x2="10" y2="55" stroke="currentColor" stroke-width="2"/>
    <line x1="18" y1="28" x2="26" y2="55" stroke="currentColor" stroke-width="2"/>
    <path d="M8 55 Q18 65 28 55 Z" fill="none" stroke="currentColor" stroke-width="3"/>
    <!-- Right Scale -->
    <line x1="82" y1="28" x2="74" y2="55" stroke="currentColor" stroke-width="2"/>
    <line x1="82" y1="28" x2="90" y2="55" stroke="currentColor" stroke-width="2"/>
    <path d="M72 55 Q82 65 92 55 Z" fill="none" stroke="currentColor" stroke-width="3"/>
  </svg>`,
  
  chevron: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`,
  
  arrowRight: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>`,
  
  discord: `<svg viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.51-2a75.58,75.58,0,0,0,73,0c.8.69,1.63,1.38,2.51,2a68.61,68.61,0,0,1-10.5,5,78.37,78.37,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.58-18.83C129.24,48.24,123.39,25.43,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
  </svg>`,
  
  copy: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`
};

// Insert elements once the DOM is interactive
document.addEventListener('DOMContentLoaded', () => {
  setupPreloader();
  injectHeader();
  injectFooter();
  setupNavEvents();
  highlightActiveLink();
});

// 1. Setup & Animate Preloader
function setupPreloader() {
  const preloaderHTML = `
    <div id="preloader">
      <div class="preloader-beacon">
        ${SVGIcons.beacon}
      </div>
      <div class="preloader-logo-text">COMMONWEALTH LEGACY RP</div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
  
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 500); // Elegant wait to ensure resources are ready
    }
  });
}

// 2. Inject Global Sticky Header
function injectHeader() {
  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/') || window.location.pathname.includes('index.html');
  const pathPrefix = ''; // Easy customization if pages move to folders

  const headerHTML = `
    <header id="main-header">
      <div class="nav-container">
        <!-- Logo -->
        <a href="${pathPrefix}index.html" class="logo">
          <div class="logo-beacon">${SVGIcons.beacon}</div>
          <div class="logo-text">
            <span class="logo-main">COMMONWEALTH LEGACY RP</span>
            <span class="logo-sub">Commonwealth Virginia Roleplay</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <ul class="nav-menu" id="nav-menu">
          <li class="nav-item">
            <a href="${pathPrefix}index.html" class="nav-link">Home</a>
          </li>

          <!-- Departments Dropdown -->
          <li class="nav-item">
            <a href="${pathPrefix}departments.html" class="nav-link" onclick="if(window.innerWidth > 1024) return true; else return false;">
              Departments ${SVGIcons.chevron}
            </a>
            <ul class="nav-dropdown">
              <li>
                <a href="${pathPrefix}vsp.html" class="nav-dropdown-link">
                  <span class="dropdown-title">Virginia State Police</span>
                  <span class="dropdown-desc">State & highway enforcement</span>
                </a>
              </li>
              <li>
                <a href="${pathPrefix}vbso.html" class="nav-dropdown-link">
                  <span class="dropdown-title">Virginia Beach Sheriff</span>
                  <span class="dropdown-desc">Courts, county & jail safety</span>
                </a>
              </li>
              <li>
                <a href="${pathPrefix}vems.html" class="nav-dropdown-link">
                  <span class="dropdown-title">Virginia Emergency Medical</span>
                  <span class="dropdown-desc">Fire, trauma & rescue operations</span>
                </a>
              </li>
              <li>
                <a href="${pathPrefix}doj.html" class="nav-dropdown-link">
                  <span class="dropdown-title">Department of Justice</span>
                  <span class="dropdown-desc">Judges, attorneys & legal order</span>
                </a>
              </li>
            </ul>
          </li>

          <!-- Community Dropdown -->
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="return false;">
              Community ${SVGIcons.chevron}
            </a>
            <ul class="nav-dropdown">
              <li>
                <a href="${pathPrefix}join.html" class="nav-dropdown-link">
                  <span class="dropdown-title">Start Story</span>
                  <span class="dropdown-desc">Join walkthrough checklist</span>
                </a>
              </li>
              <li>
                <a href="${pathPrefix}applications.html" class="nav-dropdown-link">
                  <span class="dropdown-title">Applications</span>
                  <span class="dropdown-desc">Whitelist application portal</span>
                </a>
              </li>
              <li>
                <a href="https://discord.gg/uPz5cgq4gr" target="_blank" class="nav-dropdown-link">
                  <span class="dropdown-title">Discord Server</span>
                  <span class="dropdown-desc">Connect with our active players</span>
                </a>
              </li>
              <li>
                <a href="${pathPrefix}contact.html" class="nav-dropdown-link">
                  <span class="dropdown-title">Contact & Staff</span>
                  <span class="dropdown-desc">Roster, support & tickets</span>
                </a>
              </li>
            </ul>
          </li>

          <!-- Information Dropdown -->
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="return false;">
              Information ${SVGIcons.chevron}
            </a>
            <ul class="nav-dropdown">
              <li>
                <a href="${pathPrefix}rules.html" class="nav-dropdown-link">
                  <span class="dropdown-title">Server Rules</span>
                  <span class="dropdown-desc">Immersion, powergaming, FearRP rules</span>
                </a>
              </li>
              <li>
                <a href="${pathPrefix}faq.html" class="nav-dropdown-link">
                  <span class="dropdown-title">FAQ Index</span>
                  <span class="dropdown-desc">Frequently asked questions</span>
                </a>
              </li>
              <li>
                <a href="${pathPrefix}status.html" class="nav-dropdown-link">
                  <span class="dropdown-title">Server Status</span>
                  <span class="dropdown-desc">Build version & developer notes</span>
                </a>
              </li>
              <li>
                <a href="${pathPrefix}news.html" class="nav-dropdown-link">
                  <span class="dropdown-title">News & Updates</span>
                  <span class="dropdown-desc">Latest changelogs & community posts</span>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-header-cta">
            <a href="https://discord.gg/uPz5cgq4gr" target="_blank" class="btn btn-discord" style="padding: 0.5rem 1.25rem; font-size: 0.9rem;">
              <span class="btn-icon" style="width: 16px; height: 16px;">${SVGIcons.discord}</span> Join Discord
            </a>
          </li>
        </ul>

        <!-- Hamburger Menu Drawer Button -->
        <button class="menu-drawer-toggle" id="menu-drawer-btn" aria-expanded="false" aria-label="Toggle Side Navigation Menu">
          <span class="menu-toggle-text">Menu</span>
          <div class="menu-toggle-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // Inject Rockstar-inspired expandable Side Drawer Menu overlay markup
  const drawerHTML = `
    <div id="side-menu-drawer" class="side-drawer" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="drawer-overlay" id="drawer-overlay-dim"></div>
      <div class="drawer-content">
        <div class="drawer-header">
          <a href="${pathPrefix}index.html" class="logo">
            <div class="logo-beacon">${SVGIcons.beacon}</div>
            <div class="logo-text">
              <span class="logo-main">COMMONWEALTH</span>
              <span class="logo-sub">Virginia Roleplay</span>
            </div>
          </a>
          <button class="drawer-close" id="drawer-close-btn" aria-label="Close menu">&times;</button>
        </div>
        
        <div class="drawer-body">
          <nav class="drawer-nav">
            <div class="drawer-section">
              <h4 class="drawer-section-title">Main</h4>
              <ul class="drawer-links">
                <li><a href="${pathPrefix}index.html">Home</a></li>
                <li><a href="${pathPrefix}join.html">How to Join</a></li>
                <li><a href="${pathPrefix}applications.html">Applications Portal</a></li>
                <li><a href="${pathPrefix}status.html">Server Status</a></li>
                <li><a href="${pathPrefix}news.html">News & Updates</a></li>
              </ul>
            </div>
            
            <div class="drawer-section">
              <h4 class="drawer-section-title">Roleplay Systems</h4>
              <ul class="drawer-links">
                <li><a href="${pathPrefix}jobs.html">Civilian Jobs</a></li>
                <li><a href="${pathPrefix}housing.html">Housing & Vehicles</a></li>
                <li><a href="${pathPrefix}businesses.html">Player Businesses</a></li>
                <li><a href="${pathPrefix}crime.html">Crime & Justice</a></li>
                <li><a href="${pathPrefix}rules.html">Server Rules</a></li>
                <li><a href="${pathPrefix}faq.html">FAQ Index</a></li>
              </ul>
            </div>
            
            <div class="drawer-section">
              <h4 class="drawer-section-title">Departments</h4>
              <ul class="drawer-links">
                <li><a href="${pathPrefix}vsp.html">Virginia State Police</a></li>
                <li><a href="${pathPrefix}vbso.html">Virginia Beach Sheriff</a></li>
                <li><a href="${pathPrefix}vems.html">Virginia Emergency Medical</a></li>
                <li><a href="${pathPrefix}doj.html">Department of Justice</a></li>
              </ul>
            </div>
            
            <div class="drawer-section">
              <h4 class="drawer-section-title">Community</h4>
              <ul class="drawer-links">
                <li><a href="https://discord.gg/uPz5cgq4gr" target="_blank">Discord Server</a></li>
                <li><a href="${pathPrefix}contact.html">Contact Staff</a></li>
              </ul>
            </div>
          </nav>
        </div>
        
        <div class="drawer-footer">
          <span class="drawer-status-pill">In Development / Private Testing</span>
          <p class="drawer-copyright">&copy; 2026 Commonwealth Legacy RP. Law &bull; Life &bull; Legacy</p>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', drawerHTML);
}

// 3. Inject Global Footer
function injectFooter() {
  const pathPrefix = '';
  
  const footerHTML = `
    <footer>
      <div class="container">
        <div class="footer-top">
          <!-- Brand Info -->
          <div class="footer-brand-column">
            <a href="${pathPrefix}index.html" class="logo" style="margin-bottom: 1rem;">
              <div class="logo-beacon" style="width: 38px; height: 38px;">${SVGIcons.beacon}</div>
              <div class="logo-text">
                <span class="logo-main" style="font-size: 1.8rem;">COMMONWEALTH LEGACY RP</span>
                <span class="logo-sub" style="font-size: 0.6rem; letter-spacing: 0.2em;">Commonwealth Virginia Roleplay</span>
              </div>
            </a>
            <p>Shape Your Legacy in the Commonwealth. Experience a realistic, immersive roleplay community inspired by Commonwealth Virginia.</p>
            <div class="footer-socials">
              <a href="https://discord.gg/uPz5cgq4gr" class="footer-social-link" target="_blank" title="Discord">
                <span style="display: flex;">${SVGIcons.discord}</span>
              </a>
              <a href="#" class="footer-social-link" title="Twitter/X">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" class="footer-social-link" title="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick Directory Links -->
          <div>
            <h4 class="footer-title">Directory</h4>
            <ul class="footer-links">
              <li><a href="${pathPrefix}index.html">Home</a></li>
              <li><a href="${pathPrefix}join.html">How to Join</a></li>
              <li><a href="${pathPrefix}departments.html">Departments</a></li>
              <li><a href="${pathPrefix}applications.html">Applications</a></li>
              <li><a href="${pathPrefix}news.html">News & updates</a></li>
            </ul>
          </div>

          <!-- Legal & Guidelines Links -->
          <div>
            <h4 class="footer-title">Guidelines</h4>
            <ul class="footer-links">
              <li><a href="${pathPrefix}rules.html">Server Rules</a></li>
              <li><a href="${pathPrefix}faq.html">FAQ Index</a></li>
              <li><a href="${pathPrefix}contact.html">Staff Roster</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <!-- Discord Integration Widget -->
          <div>
            <h4 class="footer-title">Community</h4>
            <div class="footer-discord-widget">
              <div class="footer-discord-header">
                <span class="footer-discord-logo">${SVGIcons.discord}</span>
                <div class="footer-discord-info">
                  <span class="footer-discord-name">Commonwealth Legacy RP</span>
                  <span class="footer-discord-status">Online Join Today</span>
                </div>
              </div>
              <a href="https://discord.gg/uPz5cgq4gr" target="_blank" class="btn btn-discord" style="width: 100%; padding: 0.6rem 1rem; font-size: 0.95rem;">
                Connect To Discord
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            &copy; 2026 Commonwealth Legacy RP. All rights reserved. Made for immersive gaming.
          </div>
          
          <div class="footer-disclaimer">
            Commonwealth Legacy RP is not affiliated with Rockstar Games, Take-Two Interactive, FiveM, or Cfx.re.
          </div>
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// 4. Handle Sticky Navigation Scroll States, Menu Drawer events, Lightbox modallers
function setupNavEvents() {
  const header = document.getElementById('main-header');
  const drawerBtn = document.getElementById('menu-drawer-btn');
  const drawer = document.getElementById('side-menu-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerOverlay = document.getElementById('drawer-overlay-dim');

  // Sticky header background transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Focus trap accessibility helper
  const focusTrap = (element) => {
    const focusableElements = element.querySelectorAll('a[href], button, textarea, input, select');
    if (!focusableElements.length) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  };

  // Open Drawer Menu
  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    drawerBtn.classList.add('active');
    drawerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    focusTrap(drawer);
    drawerCloseBtn.focus();
    document.addEventListener('keydown', handleDrawerKeyDown);
  };

  // Close Drawer Menu
  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    drawerBtn.classList.remove('active');
    drawerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.removeEventListener('keydown', handleDrawerKeyDown);
    drawerBtn.focus();
  };

  const handleDrawerKeyDown = (e) => {
    if (e.key === 'Escape') closeDrawer();
  };

  if (drawerBtn && drawer) {
    drawerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  }

  // Handle nested desktop dropdown keyboard focus accessibilities
  const dropdownItems = document.querySelectorAll('.nav-menu > li');
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    if (link && dropdown) {
      link.addEventListener('focus', () => {
        item.classList.add('focus-active');
      });
      
      const dropdownLinks = dropdown.querySelectorAll('a');
      const lastDropdownLink = dropdownLinks[dropdownLinks.length - 1];
      
      if (lastDropdownLink) {
        lastDropdownLink.addEventListener('blur', () => {
          item.classList.remove('focus-active');
        });
      }
    }
  });
}

// 5. Active Link Highlighting
function highlightActiveLink() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-menu > li > a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.style.color = 'var(--cyan)';
      link.style.fontWeight = '700';
    }
  });

  const drawerLinks = document.querySelectorAll('.drawer-links a');
  drawerLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });
}

// Dynamic Video Modal Lightbox (supporting YouTube nocookie and local video fallback)
function openTrailerModal(videoId) {
  const video = (typeof videoLibrary !== 'undefined' && videoLibrary[videoId]) || 
                (typeof localVideoPlaceholders !== 'undefined' && localVideoPlaceholders[videoId]) || {
    title: 'Commonwealth Legacy RP — Official Showcase',
    youtubeId: '9DxyS9PBKKM',
    purpose: 'A Virginia-based FiveM roleplay community built around law, life, and legacy.'
  };

  const embedUrl = video.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : video.placement; // if local mp4

  const isLocal = !video.youtubeId;

  let modalContent = '';
  if (isLocal) {
    modalContent = `<video src="${embedUrl}" controls autoplay class="lightbox-video"></video>`;
  } else {
    modalContent = `<iframe src="${embedUrl}" title="${video.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }

  const modalHTML = `
    <div id="video-lightbox" class="lightbox-overlay" role="dialog" aria-modal="true" aria-label="${video.title}">
      <div class="lightbox-container">
        <button class="lightbox-close" aria-label="Close video">&times;</button>
        <div class="lightbox-video-wrapper">
          ${modalContent}
        </div>
        <div class="lightbox-details">
          <h3>${video.title}</h3>
          <p>${video.purpose || 'Official Commonwealth Showcase'}</p>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.classList.add('modal-open');

  const modal = document.getElementById('video-lightbox');
  const closeBtn = modal.querySelector('.lightbox-close');

  const closeModal = () => {
    modal.classList.add('fade-out');
    setTimeout(() => {
      modal.remove();
      document.body.classList.remove('modal-open');
    }, 300);
    document.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-container')) closeModal();
  });
  document.addEventListener('keydown', handleKeyDown);
}

// Expose globally
window.openTrailerModal = openTrailerModal;
