/**
 * Altai Production — Creative Art Direction & Dynamic Interactions
 * Aesthetic: Fresh Mountain Sunset, Pearlescent Glacial Glow, Organic Wind & Ambient Light
 * 
 * Modules:
 * 1. Mountain Wind Breeze Canvas (Gentle ethereal horizontal currents + drifting particles)
 * 2. Sunset Cursor Spotlight (Subtle ambient follow-light)
 * 3. Dynamic Cases Stream & Grid (Seamless infinite marquee + 2-col switch + neon borders)
 * 4. 16:9 Cinematic Video Modal (Autoplay, backdrop dismiss, Esc support)
 * 5. Dynamic Navbar Scroll (Transparent top -> frosted glass on scroll)
 * 6. Scroll Reveal & Smooth Anchor Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initWindCanvas();
  initCursorSpotlight();
  initCasesSection();
  initNavbarScroll();
  initModal();
  initScrollAnimations();
  initSmoothScroll();
});

/* ==========================================================================
   1. Mountain Wind Breeze Canvas (Ethereal Altai Current)
   ========================================================================== */
function initWindCanvas() {
  const canvas = document.getElementById('wind-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let animationId = null;
  let isVisible = true;

  // Mouse interaction coordinates (subtle deflection)
  let mouse = { x: -1000, y: -1000, active: false };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible && !animationId) {
      animate(0);
    }
  });

  resize();

  // Color palette for wind currents: ice cyan, twilight rose, lavender, pearlescent white
  const windColors = [
    'rgba(56, 189, 248, 0.14)',  // sky cyan
    'rgba(244, 114, 182, 0.12)', // sunset rose
    'rgba(192, 132, 252, 0.10)', // lavender
    'rgba(255, 255, 255, 0.22)', // pearl white
    'rgba(14, 165, 233, 0.08)'   // glacial deep
  ];

  // Wind waves
  const streamsCount = 9;
  const streams = [];
  for (let i = 0; i < streamsCount; i++) {
    streams.push({
      baseY: (height / (streamsCount + 1)) * (i + 1),
      speed: 0.0008 + Math.random() * 0.0009,
      amplitude: 18 + Math.random() * 26,
      frequency: 0.0018 + Math.random() * 0.002,
      phase: Math.random() * Math.PI * 2,
      color: windColors[i % windColors.length],
      lineWidth: 1 + Math.random() * 1.5
    });
  }

  // Drifting wind dust & particles
  const particleCount = 38;
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0.35 + Math.random() * 0.65,
      vy: (Math.random() - 0.5) * 0.2,
      size: 0.8 + Math.random() * 1.8,
      alpha: 0.15 + Math.random() * 0.45,
      color: windColors[Math.floor(Math.random() * windColors.length)]
    });
  }

  let lastTime = 0;

  function animate(timestamp) {
    if (!isVisible) {
      animationId = null;
      return;
    }

    const dt = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw flowing wind ribbons
    for (let s of streams) {
      ctx.beginPath();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.lineWidth;
      ctx.lineCap = 'round';

      const step = 28;
      for (let x = 0; x <= width + step; x += step) {
        // Natural sine flow
        let waveY = Math.sin(x * s.frequency + timestamp * s.speed + s.phase) * s.amplitude;
        
        // Secondary harmonic for organic mountain wind flutter
        waveY += Math.cos(x * s.frequency * 1.8 - timestamp * s.speed * 0.6) * (s.amplitude * 0.35);

        // Subtle mouse breeze repulsion
        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = (s.baseY + waveY) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const push = (1 - dist / 180) * 22;
            waveY += dy > 0 ? push : -push;
          }
        }

        const y = s.baseY + waveY;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    // 2. Draw drifting mountain breeze particles
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy + Math.sin(timestamp * 0.0015 + p.x * 0.005) * 0.3;

      // Wrap around screen seamlessly
      if (p.x > width + 10) {
        p.x = -10;
        p.y = Math.random() * height;
      }
      if (p.y > height + 10) p.y = -10;
      if (p.y < -10) p.y = height + 10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }

    animationId = requestAnimationFrame(animate);
  }

  animationId = requestAnimationFrame(animate);
}

/* ==========================================================================
   2. Sunset Cursor Spotlight (Subtle ambient follow-light)
   ========================================================================== */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) return;

  // Disable on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    spotlight.style.display = 'none';
    return;
  }

  let mouseX = -500;
  let mouseY = -500;
  let currentX = -500;
  let currentY = -500;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      spotlight.style.opacity = '1';
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
    isMoving = false;
  });

  function update() {
    // Smooth lerp
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    spotlight.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   3. Cases Display & Interactive Switcher (Flow Marquee vs Grid)
   ========================================================================== */
function getThumbnailVisual(item) {
  const themes = {
    ostrovok: {
      pattern: `<svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pgrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#bae6fd" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#f5d0fe" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#e0e7ff" stop-opacity="0.9"/>
          </linearGradient>
          <radialGradient id="lightGlow1" cx="60%" cy="30%" r="60%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.1"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgrad1)"/>
        <circle cx="280" cy="80" r="140" fill="url(#lightGlow1)"/>
        <path d="M-20 180 Q 150 90, 420 160" stroke="rgba(2,132,199,0.3)" stroke-width="1.8" fill="none"/>
        <path d="M-40 210 Q 180 130, 440 190" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" fill="none"/>
        <circle cx="200" cy="112" r="50" stroke="rgba(255,255,255,0.5)" stroke-width="1" fill="none"/>
      </svg>`
    },
    'abrau-durso': {
      pattern: `<svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pgrad_abrau" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbcfe8" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#fed7aa" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.8"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgrad_abrau)"/>
        <circle cx="200" cy="112" r="70" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" fill="none"/>
      </svg>`
    },
    'sber-roscosmos': {
      pattern: `<svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pgrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.75"/>
            <stop offset="60%" stop-color="#e0e7ff" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#fbcfe8" stop-opacity="0.5"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgrad2)"/>
        <ellipse cx="200" cy="112" rx="130" ry="42" stroke="rgba(37,99,235,0.35)" stroke-width="1.6" fill="none" transform="rotate(-15 200 112)"/>
      </svg>`
    },
    teremok: {
      pattern: `<svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pgrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fed7aa" stop-opacity="0.7"/>
            <stop offset="50%" stop-color="#fce7f3" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.6"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgrad3)"/>
        <circle cx="200" cy="112" r="65" stroke="rgba(245,158,11,0.35)" stroke-width="1.4" fill="none" stroke-dasharray="4 6"/>
      </svg>`
    },
    'global-forum': {
      pattern: `<svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pgrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e9d5ff" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#c7d2fe" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.7"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgrad4)"/>
        <polygon points="120,40 280,40 320,180 80,180" stroke="rgba(147,51,234,0.3)" stroke-width="1.4" fill="none"/>
      </svg>`
    },
    'it-axis': {
      pattern: `<svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pgrad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a5f3fc" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#ddd6fe" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#bfdbfe" stop-opacity="0.8"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgrad5)"/>
        <line x1="0" y1="112" x2="400" y2="112" stroke="rgba(8,145,178,0.35)" stroke-width="1.6"/>
      </svg>`
    },
    eurochem: {
      pattern: `<svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pgrad6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a7f3d0" stop-opacity="0.75"/>
            <stop offset="50%" stop-color="#bae6fd" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#fbcfe8" stop-opacity="0.6"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgrad6)"/>
        <polygon points="180,60 240,95 240,165 180,200 120,165 120,95" stroke="rgba(5,150,105,0.35)" stroke-width="1.6" fill="none"/>
      </svg>`
    },
    'gem-team': {
      pattern: `<svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pgrad7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbcfe8" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#c7d2fe" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.8"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgrad7)"/>
        <polygon points="200,60 260,112 200,165 140,112" stroke="rgba(219,39,119,0.35)" stroke-width="1.6" fill="none"/>
      </svg>`
    }
  };

  return themes[item.id] || themes.ostrovok;
}

function createCaseCardHtml(item, isClone = false) {
  const visual = getThumbnailVisual(item);
  const mediaContent = item.posterUrl ? `
    <img src="${item.posterUrl}" 
         alt="${item.title}" 
         class="case-poster-img" 
         loading="lazy" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
    <div class="case-preview-canvas" style="display: none;">
      ${visual.pattern}
    </div>
    <div class="case-poster-overlay"></div>
  ` : `
    <div class="case-preview-canvas">
      ${visual.pattern}
    </div>
  `;

  return `
    <article class="case-card ${isClone ? 'is-clone' : ''}" 
             data-id="${item.id}" 
             tabindex="0"
             role="button"
             aria-label="Смотреть кейс ${item.title}">
      <div class="case-thumbnail-wrapper">
        <div class="case-media-container">
          ${mediaContent}
          <span class="case-tag-badge">
            ${item.category}
          </span>
          <div class="play-button-overlay">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="case-content">
        <div class="case-header-row">
          <h3 class="case-title">${item.title}</h3>
          <span class="case-watch-link">
            Смотреть
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
        <p class="case-desc">${item.description}</p>
      </div>
    </article>
  `;
}

function initCasesSection() {
  const track = document.getElementById('cases-marquee-track');
  const wrapper = document.getElementById('cases-display-wrapper');
  const btnFlow = document.getElementById('view-mode-flow');
  const btnGrid = document.getElementById('view-mode-grid');

  const data = window.casesData || (typeof casesData !== 'undefined' ? casesData : []);
  if (!track || !data.length) return;

  // 1. Render primary items + duplicated set for seamless infinite marquee gliding
  const primaryCardsHtml = data.map(item => createCaseCardHtml(item, false)).join('');
  const cloneCardsHtml = data.map(item => createCaseCardHtml(item, true)).join('');

  track.innerHTML = primaryCardsHtml + cloneCardsHtml;

  // 2. Attach click & keyboard listeners to open video modal for all cards
  const allCards = track.querySelectorAll('.case-card');
  allCards.forEach(card => {
    const id = card.getAttribute('data-id');
    const caseItem = data.find(c => c.id === id);

    const openHandler = () => {
      if (caseItem) {
        openVideoModal(caseItem);
      }
    };

    card.addEventListener('click', openHandler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHandler();
      }
    });
  });

  // 3. View mode switch controls (Flow vs Grid)
  if (btnFlow && btnGrid && wrapper) {
    btnFlow.addEventListener('click', () => {
      if (btnFlow.classList.contains('active')) return;
      btnFlow.classList.add('active');
      btnGrid.classList.remove('active');
      wrapper.classList.remove('mode-grid');
      wrapper.classList.add('mode-flow');
    });

    btnGrid.addEventListener('click', () => {
      if (btnGrid.classList.contains('active')) return;
      btnGrid.classList.add('active');
      btnFlow.classList.remove('active');
      wrapper.classList.remove('mode-flow');
      wrapper.classList.add('mode-grid');
    });
  }
}

/* ==========================================================================
   4. 16:9 Cinematic Video Modal (Autoplay & Audio Cleanup)
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('video-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  // Close on cross button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeVideoModal);
  }

  // Close on background backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeVideoModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeVideoModal();
    }
  });
}

function openVideoModal(caseItem) {
  const modal = document.getElementById('video-modal');
  const titleEl = document.getElementById('modal-case-title');
  const tagEl = document.getElementById('modal-case-tag');
  const playerContainer = document.getElementById('modal-player-container');

  if (!modal || !playerContainer) return;

  if (titleEl) titleEl.textContent = caseItem.title;
  if (tagEl) tagEl.textContent = caseItem.category;

  // Prepare autoplay URL
  let playUrl = caseItem.embedUrl;
  if (playUrl.includes('kinescope.io')) {
    playUrl += (playUrl.includes('?') ? '&' : '?') + 'autoplay=1';
  } else if (playUrl.includes('rutube.ru')) {
    playUrl += (playUrl.includes('?') ? '&' : '?') + 'autoStart=true';
  }

  // Inject responsive 16:9 iframe
  playerContainer.innerHTML = `
    <iframe 
      src="${playUrl}" 
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer" 
      frameborder="0" 
      allowfullscreen
      title="${caseItem.title}">
    </iframe>
  `;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const playerContainer = document.getElementById('modal-player-container');

  if (!modal) return;

  modal.classList.remove('is-open');
  document.body.style.overflow = '';

  // Clear iframe immediately to stop all audio/video playback
  if (playerContainer) {
    playerContainer.innerHTML = '';
  }
}

/* ==========================================================================
   5. Dynamic Navbar Scroll (Transparent top -> frosted glass on scroll)
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
}

/* ==========================================================================
   6. Scroll Reveal & Smooth Anchor Navigation
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
