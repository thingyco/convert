(function() {
  function init() {
    // --- UNIFIED STYLES ---
    if (!document.getElementById('pl-unified-styles')) {
      const style = document.createElement('style');
      style.id = 'pl-unified-styles';
      style.textContent = `
        /* --- Loader --- */
        #pl-indicator { position: fixed; top: 26px; right: 26px; display: flex; flex-direction: column; gap: 8px; z-index: 999999; pointer-events: none; transition: opacity 0.3s ease; }
        .pl-dot { width: 10px; height: 10px; animation: plBounce 1.2s ease-in-out infinite; }
        .pl-dot:nth-child(1) { background: #ff4d4d; }
        .pl-dot:nth-child(2) { background: #ff9f43; animation-delay: 0.15s; }
        .pl-dot:nth-child(3) { background: #2ecc71; animation-delay: 0.3s; }
        @keyframes plBounce { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-8px); opacity: 0.8; } }
        .status-text {font-size: 14px; color: #ffffff; animation: pulse-dot 2s ease-in-out infinite;}
        @keyframes pulse-dot {0%, 100% { opacity: 1; } 50% { opacity: 0.3; }}
        
        /* --- Floating Round Badge --- */
        #pl-footer { 
          position: fixed; 
          top: 6px; 
          left: 6px; 
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.95); 
          border-radius: 50%; 
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 9999; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          transform: scale(0);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease; 
        }
        #pl-footer.show { 
          transform: scale(1); 
          opacity: 1;
        }
        #pl-footer a { 
          width: 100%;
          height: 100%;
          color: #000; 
          text-decoration: none; 
          display: flex; 
          align-items: center; 
          justify-content: center;
        }
        #pl-footer img { 
          max-height: 70%; 
          max-width: 70%; 
          object-fit: contain; 
          display: block; 
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

    // --- FOOTER ---
    if (!document.getElementById('pl-footer')) {
      const footer = document.createElement('div');
      footer.id = 'pl-footer';
      footer.innerHTML = `
        <a href="https://theattn.com/" rel="noopener" title="Contact Us">
         <img src="https://theattn.com/footer.png" alt="theattn" class="status-text">
        </a>
      `;
      document.body.appendChild(footer);
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          footer.classList.add('show');
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
