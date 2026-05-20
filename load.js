(function() {
  function initLoader() {
    if (document.getElementById('pl-indicator')) return;

    const style = document.createElement('style');
    style.textContent = `
      #pl-indicator { position: fixed; top: 16px; left: 16px; display: flex; gap: 8px; z-index: 999999; pointer-events: none; opacity: 1; transition: opacity 0.3s ease; }
      .pl-dot { width: 10px; height: 10px; border-radius: 50%; animation: plBounce 1.2s ease-in-out infinite; }
      .pl-dot:nth-child(1) { background: #ff4d4d; }
      .pl-dot:nth-child(2) { background: #ff9f43; animation-delay: 0.15s; }
      .pl-dot:nth-child(3) { background: #2ecc71; animation-delay: 0.3s; }
      @keyframes plBounce { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-8px); opacity: 0.8; } }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'pl-indicator';
    container.innerHTML = '<div class="pl-dot"></div><div class="pl-dot"></div><div class="pl-dot"></div>';
    document.body.appendChild(container);

    setTimeout(() => {
      container.style.opacity = '0';
      setTimeout(() => container.remove(), 300);
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoader);
  } else {
    initLoader();
  }
})();