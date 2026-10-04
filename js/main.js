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
   1. Sky Atmosphere Canvas: Soaring Mountain Seagulls & Altai Sun Flares
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

  // Mouse interaction coordinates (subtle lens flare parallax)
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

  // 1. Soaring Seagulls / Mountain Birds Collection
  const birdCount = 6;
  const birds = [];
  for (let i = 0; i < birdCount; i++) {
    const scale = 0.45 + Math.random() * 0.65;
    birds.push({
      x: Math.random() * (width + 200) - 100,
      y: height * 0.08 + Math.random() * (height * 0.72),
      vx: (0.75 + Math.random() * 0.85) * (0.8 + scale * 0.4),
      vyBase: (Math.random() - 0.48) * 0.25,
      scale: scale,
      alpha: 0.35 + scale * 0.45,
      flap: Math.random() * Math.PI * 2,
      flapSpeed: 0.055 + Math.random() * 0.035,
      glideTimer: Math.random() * 180,
      glideDuration: 120 + Math.random() * 200,
      isGliding: false
    });
  }

  // 2. Altai Sun Flare & Prismatic Bokeh Flares
  const flares = [
    { dist: 0.25, size: 28, color: 'rgba(255, 255, 255, 0.42)', blur: 4 },
    { dist: 0.45, size: 45, color: 'rgba(56, 189, 248, 0.22)', blur: 8 },
    { dist: 0.65, size: 20, color: 'rgba(253, 224, 71, 0.18)', blur: 5 },
    { dist: 0.85, size: 68, color: 'rgba(192, 132, 252, 0.16)', blur: 12 },
    { dist: 1.15, size: 36, color: 'rgba(56, 189, 248, 0.18)', blur: 6 },
    { dist: 1.45, size: 85, color: 'rgba(224, 242, 254, 0.15)', blur: 16 }
  ];

  // 3. Shimmering Sun Sparkles / Diamond Light Dust
  const sparkleCount = 18;
  const sparkles = [];
  for (let i = 0; i < sparkleCount; i++) {
    sparkles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
      driftX: 0.15 + Math.random() * 0.3,
      driftY: -0.05 + Math.random() * 0.1
    });
  }

  function drawSeagull(b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.scale(b.scale, b.scale);

    // Subtle bank angle based on flight curve
    const bank = Math.sin(b.flap * 0.4) * 0.06;
    ctx.rotate(bank);

    const wingSpan = 26;
    const flapOffset = b.isGliding ? 1.2 : Math.sin(b.flap) * 8.5;

    ctx.beginPath();
    // Left wing
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-wingSpan * 0.45, -9 + flapOffset, -wingSpan, flapOffset * 0.85);
    ctx.quadraticCurveTo(-wingSpan * 0.4, -2 + flapOffset * 0.4, 0, 1.8);
    // Right wing
    ctx.quadraticCurveTo(wingSpan * 0.4, -2 + flapOffset * 0.4, wingSpan, flapOffset * 0.85);
    ctx.quadraticCurveTo(wingSpan * 0.45, -9 + flapOffset, 0, 0);
    ctx.closePath();

    ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.85})`;
    ctx.shadowColor = 'rgba(56, 189, 248, 0.35)';
    ctx.shadowBlur = 6 * b.scale;
    ctx.fill();

    // Wing top outline
    ctx.strokeStyle = `rgba(224, 242, 254, ${b.alpha * 0.9})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();
  }

  function drawStarSparkle(x, y, radius, alpha) {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
    ctx.shadowColor = 'rgba(125, 211, 252, 0.6)';
    ctx.shadowBlur = 8;

    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(Math.cos(i * Math.PI / 2) * radius, Math.sin(i * Math.PI / 2) * radius);
      ctx.lineTo(Math.cos(i * Math.PI / 2 + Math.PI / 4) * (radius * 0.22), Math.sin(i * Math.PI / 2 + Math.PI / 4) * (radius * 0.22));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
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

    // =========================================================================
    // 1. Altai Mountain Sun Flares & Luminous Prismatic Glow
    // =========================================================================
    const sunBaseX = width * 0.82;
    const sunBaseY = height * 0.15;
    
    // Parallax mouse offset
    const parallaxX = mouse.active ? (mouse.x - width / 2) * 0.025 : 0;
    const parallaxY = mouse.active ? (mouse.y - height / 2) * 0.025 : 0;
    const sunX = sunBaseX + parallaxX;
    const sunY = sunBaseY + parallaxY;

    // Breathing pulse
    const sunPulse = 1 + Math.sin(timestamp * 0.0008) * 0.08;

    // A. Sun Core Radiance
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 180 * sunPulse);
    sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    sunGrad.addColorStop(0.18, 'rgba(254, 240, 138, 0.18)');
    sunGrad.addColorStop(0.45, 'rgba(56, 189, 248, 0.12)');
    sunGrad.addColorStop(0.75, 'rgba(192, 132, 252, 0.06)');
    sunGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 180 * sunPulse, 0, Math.PI * 2);
    ctx.fill();

    // B. Soft Anamorphic Horizontal Flare Beam
    const beamWidth = 260 * sunPulse;
    const beamHeight = 2.5;
    const beamGrad = ctx.createLinearGradient(sunX - beamWidth, sunY, sunX + beamWidth, sunY);
    beamGrad.addColorStop(0, 'transparent');
    beamGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.15)');
    beamGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
    beamGrad.addColorStop(0.65, 'rgba(192, 132, 252, 0.15)');
    beamGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.ellipse(sunX, sunY, beamWidth, beamHeight, -0.08, 0, Math.PI * 2);
    ctx.fill();

    // C. Optical Lens Flare Discs along Sun Axis
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const axisDX = centerX - sunX;
    const axisDY = centerY - sunY;

    for (let f of flares) {
      const fx = sunX + axisDX * f.dist;
      const fy = sunY + axisDY * f.dist;
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(fx, fy, f.size * (0.92 + Math.sin(timestamp * 0.001 + f.dist) * 0.08), 0, Math.PI * 2);
      ctx.fillStyle = f.color;
      ctx.shadowColor = f.color;
      ctx.shadowBlur = f.blur;
      ctx.fill();
      ctx.restore();
    }

    // =========================================================================
    // 2. Shimmering Mountain Sunlight Diamond Sparkles
    // =========================================================================
    for (let sp of sparkles) {
      sp.x += sp.driftX;
      sp.y += sp.driftY;
      if (sp.x > width + 20) sp.x = -20;
      if (sp.y < -20) sp.y = height + 20;

      const alpha = Math.max(0, Math.sin(timestamp * sp.speed + sp.phase));
      drawStarSparkle(sp.x, sp.y, sp.size, alpha * 0.65);
    }

    // =========================================================================
    // 3. Soaring Seagulls / Gliding Mountain Birds
    // =========================================================================
    for (let b of birds) {
      // Advance position
      b.x += b.vx;
      b.y += b.vyBase + Math.sin(timestamp * 0.0012 + b.scale * 4) * 0.35;

      // Flight flap vs glide cycle
      b.glideTimer++;
      if (b.isGliding) {
        if (b.glideTimer > b.glideDuration) {
          b.isGliding = false;
          b.glideTimer = 0;
        }
      } else {
        b.flap += b.flapSpeed;
        if (b.glideTimer > 90 && Math.sin(b.flap) > 0.85) {
          b.isGliding = true;
          b.glideTimer = 0;
          b.glideDuration = 100 + Math.random() * 180;
        }
      }

      // Wrap smoothly around screen
      if (b.x > width + 60) {
        b.x = -60;
        b.y = height * 0.06 + Math.random() * (height * 0.74);
        b.scale = 0.45 + Math.random() * 0.65;
        b.vx = (0.75 + Math.random() * 0.85) * (0.8 + b.scale * 0.4);
        b.alpha = 0.35 + b.scale * 0.45;
      }

      drawSeagull(b);
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
          <div class="play-button-overlay">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="case-content">
        <div class="case-header-row">
          <span class="case-status-badge">${item.category}</span>
          <h3 class="case-title-side">${item.title}</h3>
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
