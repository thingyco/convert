/**
 * Agent Profile Loader
 * Reads ?d=agent-name from URL, fetches agents/[name].json, renders DOM
 * GitHub Pages compatible - zero backend
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  loadAgentData();
});

/**
 * Theme toggle with localStorage persistence
 */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  
  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/**
 * Get agent ID from URL: supports ?d=name or #name
 * Returns lowercase string for case-insensitive JSON matching
 */
function getAgentId() {
  // Check hash first: /i#javeria
  const hash = window.location.hash.replace('#', '').trim().toLowerCase();
  if (hash) return hash;
  
  // Check query param: /i?d=javeria
  const query = new URLSearchParams(window.location.search);
  const param = query.get('d')?.trim().toLowerCase();
  if (param) return param;
  
  // Fallback default
  return 'javeria';
}

/**
 * Fetch and render agent data
 */
async function loadAgentData() {
  const agentId = getAgentId();
  const jsonPath = `agents/${agentId}.json`;
  
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    renderAgent(data);
    document.title = `${data.agent.name} | Evolate Properties`;
    
  } catch (error) {
    console.error('Failed to load agent:', error);
    renderError(agentId);
  }
}

/**
 * Render agent data to DOM elements
 */
function renderAgent(data) {
  // Profile
  document.getElementById('agentName').textContent = data.agent.name;
  document.getElementById('agentTitle').textContent = data.agent.title;
  document.getElementById('agentBadge').innerHTML = `<i class="fas fa-award"></i>${data.agent.badge}`;
  document.getElementById('avatar').style.setProperty('--avatar-url', `url('${data.agent.avatar}')`);
  document.getElementById('avatarLink').href = data.agent.shortLinkUrl || '#';
  document.getElementById('shortLink').href = data.agent.shortLinkUrl || '#';
  document.getElementById('shortLinkText').textContent = data.agent.shortLink;
  
  // Social links
  document.getElementById('socialLinks').innerHTML = data.socials.map(s => 
    `<a class="social-btn ${s.platform}" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.platform}"><i class="${s.icon}"></i></a>`
  ).join('');
  
  // Mobile links (vertical list)
  document.getElementById('mobileLinks').innerHTML = data.listings.map((item, i) => 
    `<a class="link-btn" href="${item.url}" target="_blank" style="animation-delay:${0.4+i*0.1}s"><i class="${item.icon||'fas fa-external-link-alt'}"></i><span>${item.title}</span></a>`
  ).join('');
  
  // Desktop cards (grid)
  document.getElementById('desktopCards').innerHTML = data.listings.map((item, i) => 
    `<a class="link-card" href="${item.url}" target="_blank" style="animation-delay:${0.05+i*0.05}s"><div class="card-media"><img src="${item.image}" alt="${item.title}" loading="lazy"/></div><div class="card-content"><h3><i class="${item.icon||'fas fa-link'}"></i>${item.title}</h3><p>${item.description}</p><span class="card-cta">View → <i class="fas fa-arrow-right"></i></span></div></a>`
  ).join('');
  
  // Company footer
  document.getElementById('companyLogo').src = data.company.logo;
  document.getElementById('companyLink').href = data.company.url;
  document.getElementById('companyName').href = data.company.url;
  document.getElementById('companyName').textContent = data.company.name;
  document.getElementById('companyTagline').textContent = data.company.tagline;
  document.getElementById('copyright').textContent = data.company.copyright;
}

/**
 * Render error state for missing/invalid agent
 */
function renderError(agentId) {
  document.getElementById('agentName').textContent = 'Profile Not Found';
  document.getElementById('agentTitle').textContent = `No data for "${agentId}". Check agents/${agentId}.json`;
  document.getElementById('agentBadge').innerHTML = '<i class="fas fa-exclamation-triangle"></i>Verify JSON';
  document.getElementById('avatar').style.backgroundImage = 'none';
  document.getElementById('avatar').innerHTML = '<i class="fas fa-user" style="font-size:3rem;color:var(--text-muted)"></i>';
  document.getElementById('shortLink').style.display = 'none';
  document.getElementById('socialLinks').innerHTML = '';
  document.getElementById('mobileLinks').innerHTML = '<p style="text-align:center;color:var(--text-muted)">Contact support to create this profile.</p>';
  document.getElementById('desktopCards').innerHTML = '';
}
