# Commonwealth Legacy RP - Website Administrator Guide

Welcome to the official, premium website codebase for **Commonwealth Legacy RP** (Commonwealth Virginia FiveM Roleplay Server). 

This website has been built following premium dark luxury design aesthetics, using modular native **HTML, Vanilla CSS (Custom Properties), and Modular JavaScript**. It is fully responsive, fast-loading, and completely free of heavy third-party framework dependencies.

---

## 📂 Codebase File Index

```
Commonwealth Legacy Web/
├── index.html               # 1. Home Page & Status Widget
├── join.html                # 2. Onboarding pipeline & PC specs
├── departments.html         # 3. Department directories hub
├── vsp.html                 # 4. Department Page: Virginia State Police
├── vbso.html                # 5. Department Page: Virginia Beach Sheriff
├── vems.html                # 6. Department Page: Virginia Emergency Medical
├── doj.html                 # 7. Department Page: Department of Justice
├── jobs.html                # 8. Civilian Occupations & Economy
├── crime.html               # 9. Underworld rackets & penal codes
├── housing.html             # 10. Property decoration & vehicle imports
├── businesses.html          # 11. Custom corporate licenses (DOJ)
├── rules.html               # 12. Rule accordion lists & search indexing
├── faq.html                 # 13. FAQ search catalog
├── applications.html        # 14. Integrated Whitelist Wizard Portal
├── news.html                # 15. Updates catalogue & details modals
├── contact.html             # 16. Staff roster grid & email forms
├── css/
│   └── styles.css           # Global Master Stylesheet (CSS Variables)
├── js/
│   ├── components.js        # Dynamic shared injections (Header, Footer, Preloader)
│   ├── server-status.js     # Live server fluctuation & on-duty personnel counters
│   ├── news-data.js         # Structured central datastore for server news
│   └── application-form.js  # Form wizard controller & dynamic essay questions
└── README.md                # This Administrator Guide
```

---

## 🎨 1. Customizing Colors & Theme

Global styles and color tokens are centrally defined as CSS Variables in the master stylesheet at [css/styles.css](file:///c:/Users/PC/Desktop/Commonwealth Legacy%20Web/css/styles.css#L4-L24). 

To adjust or swap the branding color palette, edit the corresponding hexadecimal values inside the `:root` block:

```css
:root {
  /* Color Tokens */
  --bg: #0A0D11;          /* Dark Night Charcoal Background */
  --surface: #15181D;     /* Primary Graphite Card Surface */
  --surface-2: #1F232B;   /* Secondary Slate Accent Surface */
  --border: #2A2D3A;      /* Elegant thin card borders */
  
  --cyan: #00E5FF;        /* Primary Accent (Beacon Cyan) */
  --teal: #0099A8;        /* Secondary Accent (Deep Teal) */
  
  --violet: #7B5CFF;      /* Department of Justice Accent Color */
  --red: #EF4444;         /* Emergency Medical Services Accent Color */
  --gold: #D6A833;        /* Sheriff's Office Accent Color */
  --green: #22C55E;       /* Live online status indicators */
}
```

---

## ⚙ 2. Managing Dynamic Content

### A. Publishing Server News & Changelogs
You can add, edit, or remove announcements and changelogs without modifying page code. Open [js/news-data.js](file:///c:/Users/PC/Desktop/Commonwealth Legacy%20Web/js/news-data.js) and update the `NewsData` JSON array:

```javascript
{
  id: 5, // Must be unique
  title: "Official Summer Expansion Release",
  category: "Announcement", // Announcement, Feature, Event, Department
  badgeClass: "badge-info",  // badge-info, badge-success, badge-warning, badge-update
  date: "June 1, 2026",
  author: "Founder Miller",
  excerpt: "Brief summary of article that displays on news grid index.",
  content: `
    <p>Complete HTML detailed content of article. You can use standard lists, links, or bold texts here.</p>
  `,
  image: "Unsplash image URL or local folder path"
}
```
*Note: The website automatically filters items, limits index showcases, and launches a dynamic modal viewer with full articles on click.*

### B. Adjusting Live Server Status & Personnel
To tweak the maximum slots, initial online players, or simulated on-duty numbers, open [js/server-status.js](file:///c:/Users/PC/Desktop/Commonwealth Legacy%20Web/js/server-status.js).
- Update the starting state values:
  ```javascript
  let currentPlayers = 138; // Initial count
  const maxPlayers = 256;   // Max slots count
  ```
- Change the static personnel counts around line 71:
  ```javascript
  if (onDutyVsp) onDutyVsp.innerText = '7 Active';
  if (onDutyVbso) onDutyVbso.innerText = '5 Active';
  if (onDutyVems) onDutyVems.innerText = '4 Active';
  if (onDutyDoj) onDutyDoj.innerText = '3 Active';
  ```

### C. Swapping Logo & Department Emblems
All shared graphics are vectorized SVGs stored centrally in [js/components.js](file:///c:/Users/PC/Desktop/Commonwealth Legacy%20Web/js/components.js#L7-L50).
- Edit the path nodes inside the corresponding `SVGIcons` keys (e.g. `beacon`, `vsp`, `vbso`, `vems`, `doj`) to swap emblems globally across all 16 pages instantly.

---

## 📝 3. Configuring Application Forms

The interactive whitelisting portal is powered by [js/application-form.js](file:///c:/Users/PC/Desktop/Commonwealth Legacy%20Web/js/application-form.js).

### A. Modifying Essay Questions
To customize the scenario questions shown to applicants in Step 3 based on their department interest, edit the corresponding sector key in the `Scenarios` catalog inside the script:

```javascript
const Scenarios = {
  police: `
    <div class="form-group">
      <label class="form-label" for="scen-leo-1">Your Custom LEO Question Label</label>
      <textarea id="scen-leo-1" class="form-control scenario-field" placeholder="Placeholder context..." required></textarea>
    </div>
  `
};
```

### B. Adjusting Validation Metrics
- Word Counter limits can be modified around line 50.
- Mandatory character lengths for essay scenario fields can be calibrated in the `validateCurrentStep()` function around line 155.

---

## 🚀 4. Deployment Instructions
The Commonwealth Legacy RP website is fully static and client-side driven. To deploy, simply upload the directory files directly to standard static hosting environments like **GitHub Pages, Vercel, Netlify, Cloudflare Pages**, or a private **Apache/Nginx Linux server**. No complex compilation systems, database installations, or server-side configurations required.
