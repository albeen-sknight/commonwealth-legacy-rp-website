/**
 * Commonwealth Legacy RP - Live Server Status Engine
 * Simulates real-time server tracking, ping fluctuation, and active on-duty personnel.
 */

document.addEventListener('DOMContentLoaded', () => {
  initServerStatus();
});

function initServerStatus() {
  // Elements to update (if they exist on the page)
  const playersVal = document.getElementById('status-players-val');
  const maxPlayersVal = document.getElementById('status-max-val');
  const pingVal = document.getElementById('status-ping-val');
  const uptimeVal = document.getElementById('status-uptime-val');
  const progressBar = document.getElementById('status-progress-fill');
  
  const onDutyVsp = document.getElementById('on-duty-vsp');
  const onDutyVbso = document.getElementById('on-duty-vbso');
  const onDutyVems = document.getElementById('on-duty-vems');
  const onDutyDoj = document.getElementById('on-duty-doj');

  if (!playersVal) return; // Exit if elements aren't present (non-status pages)

  // Initial Core States
  let currentPlayers = 4;
  const maxPlayers = 32;
  let currentPing = 12;
  
  // Elapsed Uptime variables (4 days, 12 hours, 38 minutes, 20 seconds)
  let days = 4;
  let hours = 12;
  let minutes = 38;
  let seconds = 20;

  // Render Initial
  updateUI();
  
  // 1. Organic Player count fluctuation (+/- 1 developer)
  setInterval(() => {
    const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
    currentPlayers = Math.max(1, Math.min(8, currentPlayers + delta));
    updatePlayerUI();
  }, 5000);

  // 2. Network Ping fluctuation (+/- 2ms)
  setInterval(() => {
    const delta = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
    currentPing = Math.max(8, Math.min(18, currentPing + delta));
    if (pingVal) pingVal.innerText = `${currentPing} ms`;
  }, 3000);

  // 3. Real-time Uptime counter
  setInterval(() => {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
        if (hours >= 24) {
          hours = 0;
          days++;
        }
      }
    }
    if (uptimeVal) {
      uptimeVal.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);

  function updateUI() {
    updatePlayerUI();
    if (pingVal) pingVal.innerText = `${currentPing} ms`;
    
    // Set static mock personnel values on duty (Development Testing)
    if (onDutyVsp) onDutyVsp.innerText = '1 Testing';
    if (onDutyVbso) onDutyVbso.innerText = '1 Testing';
    if (onDutyVems) onDutyVems.innerText = '1 Testing';
    if (onDutyDoj) onDutyDoj.innerText = '0 Testing';
  }

  function updatePlayerUI() {
    if (playersVal) playersVal.innerText = currentPlayers;
    if (maxPlayersVal) maxPlayersVal.innerText = `/ ${maxPlayers}`;
    
    // Fill dynamic progress bar
    if (progressBar) {
      const percentage = (currentPlayers / maxPlayers) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  }

  // Copy IP Clipboard functionality
  const copyBtn = document.getElementById('copy-ip-btn');
  const ipText = document.getElementById('server-ip-text');
  
  if (copyBtn && ipText) {
    copyBtn.addEventListener('click', () => {
      const ip = ipText.innerText;
      navigator.clipboard.writeText(ip).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = `<span style="color: var(--green); font-size: 0.75rem; font-weight: 700; margin-right: 0.25rem;">COPIED!</span>`;
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
}
