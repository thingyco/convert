(function() {
  function init() {
    // --- UNIFIED STYLES ---
    if (!document.getElementById('pl-unified-styles')) {
      const style = document.createElement('style');
      style.id = 'pl-unified-styles';
      style.textContent = `
        /* --- Loader --- */
        #pl-indicator { position: fixed; top: 26px; left: 26px; display: flex; flex-direction: column; gap: 8px; z-index: 999999; pointer-events: none; transition: opacity 0.3s ease; }
        .pl-dot { width: 10px; height: 10px; animation: plBounce 1.2s ease-in-out infinite; }
        .pl-dot:nth-child(1) { background: #ff4d4d; }
        .pl-dot:nth-child(2) { background: #ff9f43; animation-delay: 0.15s; }
        .pl-dot:nth-child(3) { background: #2ecc71; animation-delay: 0.3s; }
        @keyframes plBounce { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-8px); opacity: 0.8; } }
        .status-text {font-size: 14px; color: #ffffff; animation: pulse-dot 2s ease-in-out infinite;}
  @keyframes pulse-dot {0%, 100% { opacity: 1; } 50% { opacity: 0.3; }}
        /* --- Footer --- */
        #pl-footer { 
          position: fixed; 
          bottom: 0; 
          left: 0; 
          width: 100%; 
          height: 32px; 
          background: rgba(248, 248, 255, 0); 
          border-radius: 48px 48px 0 0; 
          z-index: 9999; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          transform: translateY(100%); 
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        #pl-footer.show { transform: translateY(0); }
        #pl-footer a { 
          color: #000; 
          text-decoration: none; 
          display: inline-flex; 
          align-items: center; 
          gap: 6px; 
          font-family: system-ui, sans-serif; 
          font-size: 9px; 
          line-height: 1;
        }
        #pl-footer img { height: 16px; width: auto; display: block; }
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
        setTimeout(() => loader.remove(), 400); // Matches the 0.4s CSS transition
      }, 3000);
    }

    // --- FOOTER ---
    if (!document.getElementById('pl-footer')) {
      const footer = document.createElement('div');
      footer.id = 'pl-footer';
      footer.innerHTML = `
        <a href="https://theattn.com/" target="_blank" rel="noopener" title="Contact Us">
         <img src="https://theattn.com/favicons/favicon-32x32.png" alt="theattn" class="status-text">
        </a>
      `;
      document.body.appendChild(footer);
      
      // Clean animation trigger without reflow hacks
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          footer.classList.add('show');
        });
      });
    }
  }

  // Ensure DOM is fully loaded before injecting elements
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
