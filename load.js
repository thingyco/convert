(function() {
  function init() {
    // --- UNIFIED STYLES ---
    if (!document.getElementById('pl-bottombar-styles')) {
      const style = document.createElement('style');
      style.id = 'pl-bottombar-styles';
      style.textContent = `
        /* --- Loader --- */
        #pl-indicator { position: fixed; top: 26px; right: 26px; display: flex; flex-direction: column; gap: 8px; z-index: 999999; pointer-events: none; transition: opacity 0.3s ease; }
        .pl-dot { width: 10px; height: 10px; animation: plBounce 1.2s ease-in-out infinite; }
        .pl-dot:nth-child(1) { background: #ff4d4d; }
        .pl-dot:nth-child(2) { background: #ff9f43; animation-delay: 0.15s; }
        .pl-dot:nth-child(3) { background: #2ecc71; animation-delay: 0.3s; }
        @keyframes plBounce { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-8px); opacity: 0.8; } }
        
        /* --- Fixed Bottom Bar --- */
        #pl-bottombar { 
          position: fixed; 
          bottom: 0; 
          left: 0; 
          right: 0; 
          height: 50px; 
          background: #ffffff; 
          border-top: 1px solid #e5e7eb;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
          z-index: 99999; 
          display: flex; 
          align-items: center; 
          padding: 0 20px; 
          box-sizing: border-box;
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        #pl-bottombar.show { 
          transform: translateY(0); 
        }
        #pl-bottombar a { 
          display: flex; 
          align-items: center; 
          text-decoration: none; 
          color: #000; 
          width: 100%;
        }
        #pl-bottombar img { 
          height: 28px; 
          width: auto; 
          object-fit: contain; 
          margin-right: 12px; 
          display: block; 
        }
        #pl-page-title {
          font-size: 15px;
          font-weight: 600;
          color: #111111;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 400px;
        }
      `;
      document.head.appendChild(style);
    }
    
    // --- LOADER ---
    if (!document.getElementById('pl-indicator')) {
      const loader = document.createElement('div');
      loader.id = 'pl-indicator';
      loader.innerHTML = '<div class="pl-dot"></div><div class="pl-dot"></div><div class="pl-dot"></div>';
      document.body.appendChild(loader);

      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 400); 
      }, 3000);
    }

    // --- BOTTOM BAR ---
    if (!document.getElementById('pl-bottombar')) {
      const rawTitle = document.title || (document.querySelector('title') ? document.querySelector('title').textContent : '');
      const cleanTitle = rawTitle.trim();
      const pageTitle = cleanTitle || window.location.pathname.split('/').pop().replace('.html', '') || 'attn:invoice';

      // Prevent overlap by pushing the body content up from the bottom
      document.body.style.paddingBottom = '50px';

      const bottombar = document.createElement('div');
      bottombar.id = 'pl-bottombar';
      bottombar.innerHTML = `
        <a href="https://theattn.com/" rel="noopener" title="Contact Us">
          <img src="https://theattn.com/footer.png" alt="theattn">
          <span id="pl-page-title">${pageTitle}</span>
        </a>
      `;
      
      // Insert at the very end of the body 
      document.body.appendChild(bottombar);
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bottombar.classList.add('show');
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
