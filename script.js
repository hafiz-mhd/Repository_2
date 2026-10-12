/**
 * ============================================================================
 * AR HAFIZ MUHAMMED — PREMIUM CINEMATIC PORTFOLIO JAVASCRIPT
 * Pure Vanilla ES6+ • Zero Frameworks • 4D Depth & Interactive Storytelling
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. GLOBAL CONFIGURATION & STATE
     -------------------------------------------------------------------------- */
  const AppState = {
    currentSlide: 0,
    totalSlides: 4,
    autoplayTimer: null,
    isAutoplayActive: true,
    autoplayIntervalMs: 5500,
    isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    mousePos: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    spotlightPos: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  };

  /* Project Architecture Data for Interactive Deep Dive Modal */
  const ProjectDetailsData = [
    {
      title: 'HireSense AI — Recruitment Engine',
      badge: 'ENTERPRISE AI ARCHITECTURE',
      body: `
        <h4>Project Architecture & Core Workflow</h4>
        <p>HireSense AI automates end-to-end applicant tracking and candidate vetting through a modular full-stack architecture.</p>
        <ul>
          <li><strong>Frontend:</strong> React single-page application with modular dashboard views, candidate status pipelines, and real-time ATS match breakdowns.</li>
          <li><strong>Backend Engine:</strong> FastAPI (Python) asynchronous microservices exposing high-throughput RESTful endpoints.</li>
          <li><strong>AI & NLP Layer:</strong> Sentence-Transformers semantic embeddings and LLM-assisted resume extraction for automated scoring and customized interview question formulation.</li>
          <li><strong>Database:</strong> PostgreSQL with relational indexing on skills, candidate schemas, and recruitment pipelines.</li>
          <li><strong>Security:</strong> JWT-based role authentication isolating recruiter and administrator privileges.</li>
        </ul>
      `,
      githubUrl: 'https://github.com/hafiz-mhd'
    },
    {
      title: 'Travel Planner Agent — Autonomous Travel AI',
      badge: 'AGENTIC AI & VECTOR SEARCH',
      body: `
        <h4>Agentic Architecture & Tool Calling</h4>
        <p>A multi-modal AI agent that dynamically formulates multi-day travel itineraries based on destination, budget, and live conditions.</p>
        <ul>
          <li><strong>LLM & Agent Framework:</strong> Powered by IBM Granite (watsonx.ai) utilizing Retrieval-Augmented Generation (RAG).</li>
          <li><strong>Vector Store:</strong> ChromaDB vector database paired with HuggingFace embeddings for localized attraction relevance and contextual memory.</li>
          <li><strong>Tool Orchestration:</strong> FastAPI backend triggers OpenWeatherMap API in real time to adapt scheduled activities to weather warnings.</li>
          <li><strong>State Persistence:</strong> SQLAlchemy ORM with MySQL/SQLite supporting user history, saved itineraries, and preferences.</li>
          <li><strong>Frontend:</strong> Interactive React interface with timeline visualization and drag-and-drop itinerary refinement.</li>
        </ul>
      `,
      githubUrl: 'https://github.com/hafiz-mhd'
    },
    {
      title: 'PotAlert: Spot.Alert.React — Vision System',
      badge: 'PATENTED COMPUTER VISION',
      body: `
        <h4>Patented Architecture (POT ALERT: SPOT, ALERT, AND REACT)</h4>
        <p>A mission-critical edge-and-cloud computer vision platform engineered to detect road hazards in real time and notify municipal systems.</p>
        <ul>
          <li><strong>Computer Vision Pipeline:</strong> YOLOv8 convolutional neural network trained on roadway hazard datasets, integrated with OpenCV video streaming.</li>
          <li><strong>Telemetry & Geolocation:</strong> Captures sub-second hazard coordinates, confidence scores (0.0 to 1.0), and timestamp logs.</li>
          <li><strong>Cloud Ingestion:</strong> Firebase Realtime Database for zero-latency sync between edge mobile detectors and the command dashboard.</li>
          <li><strong>Command Dashboard:</strong> React SPA with Google Maps API geospatial clustering showing hazard density heatmaps.</li>
          <li><strong>Intellectual Property:</strong> Official patent published and granted for autonomous detection & reaction architecture.</li>
        </ul>
      `,
      githubUrl: 'https://github.com/hafiz-mhd'
    },
    {
      title: 'Price Tracker Tool — Automated Scraping Pipeline',
      badge: 'DISTRIBUTED DATA INTELLIGENCE',
      body: `
        <h4>Web Intelligence & Automated Crawler Architecture</h4>
        <p>An automated surveillance tool engineered to bypass bot mitigations and track e-commerce price trends across multi-vendor stores.</p>
        <ul>
          <li><strong>Crawler Framework:</strong> Scrapy spider clusters paired with Selenium WebDriver headless instances for JavaScript-rendered DOMs.</li>
          <li><strong>Prediction & Analytics:</strong> Historical price time-series tracking to compute discounts and predict optimal purchase windows.</li>
          <li><strong>API & Web Server:</strong> Lightweight Flask application delivering structured JSON data and scheduled alert triggers.</li>
          <li><strong>Client Dashboard:</strong> Vanilla HTML5, CSS3, and JavaScript dashboard with real-time SVG trend graphs and alert threshold configuration.</li>
        </ul>
      `,
      githubUrl: 'https://github.com/hafiz-mhd'
    }
  ];

  /* --------------------------------------------------------------------------
     2. PARTICLES & 4D CONSTELLATION CANVAS
     -------------------------------------------------------------------------- */
  function initBackgroundCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId = null;
    let isVisible = true;

    // Number of particles adapted to screen size
    const particleCount = Math.min(width < 768 ? 32 : 65, 80);
    const particles = [];
    const maxConnectionDistance = 140;

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 1.8 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = -(Math.random() * 0.45 + 0.15);
        this.alpha = Math.random() * 0.55 + 0.25;
        // Subtle blue to violet tint
        this.hue = Math.random() > 0.4 ? '91, 140, 255' : '139, 92, 246';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Subtle mouse repulsion / gravitation
        const dx = AppState.mousePos.x - this.x;
        const dy = AppState.mousePos.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          this.x -= (dx / dist) * force * 0.8;
          this.y -= (dy / dist) * force * 0.8;
        }

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.hue}, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function renderCanvas() {
      if (!isVisible || AppState.isReducedMotion) return;

      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < maxConnectionDistance) {
            const lineAlpha = (1 - dist / maxConnectionDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(91, 140, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderCanvas);
    }

    renderCanvas();

    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    });

    // Pause when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        renderCanvas();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. AMBIENT SPOTLIGHT FOLLOW (4D ILLUSION)
     -------------------------------------------------------------------------- */
  function initAmbientSpotlight() {
    const spotlight = document.getElementById('ambientSpotlight');
    if (!spotlight || AppState.isReducedMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener(
      'mousemove',
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        AppState.mousePos.x = e.clientX;
        AppState.mousePos.y = e.clientY;
      },
      { passive: true }
    );

    function updateSpotlight() {
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      spotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(updateSpotlight);
    }

    updateSpotlight();
  }

  /* --------------------------------------------------------------------------
     4. NAVIGATION: SCROLL BEHAVIOR & ACTIVE LINKS
     -------------------------------------------------------------------------- */
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar blur on scroll
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      },
      { passive: true }
    );

    // Mobile Toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('mobile-open');
      });

      // Close menu when clicking any nav link
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.classList.remove('open');
          navMenu.classList.remove('mobile-open');
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('mobile-open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.classList.remove('open');
          navMenu.classList.remove('mobile-open');
        }
      });
    }

    // Active Section Tracking via Intersection Observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${activeId}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  /* --------------------------------------------------------------------------
     5. 3D CARD TILT & SPECULAR GLARE
     -------------------------------------------------------------------------- */
  function initTiltEffects() {
    if (AppState.isReducedMotion || window.innerWidth < 768) return;

    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Coordinates in range [-1, 1]
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const maxRotate = el.id === 'heroVisualTilt' ? 10 : 6;
        const rotateX = -percentY * maxRotate;
        const rotateY = percentX * maxRotate;

        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. MAGNETIC CTA BUTTONS
     -------------------------------------------------------------------------- */
  function initMagneticButtons() {
    if (AppState.isReducedMotion || window.innerWidth < 768) return;

    const magneticBtns = document.querySelectorAll('.btn-magnetic');

    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. FEATURED PROJECTS: 4D 3D-PERSPECTIVE HORIZONTAL SLIDER
     -------------------------------------------------------------------------- */
  function initProjectSlider() {
    const sliderWrapper = document.getElementById('projectSliderWrapper');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    const dotsContainer = document.getElementById('sliderDots');
    const autoplayBtn = document.getElementById('toggleAutoplayBtn');
    const counterEl = document.getElementById('sliderCounter');

    if (!slides.length || !sliderWrapper) return;

    AppState.totalSlides = slides.length;

    // Build pagination dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `dot-btn ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to project slide ${idx + 1}`);
      dot.setAttribute('role', 'tab');
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    });

    const dotBtns = dotsContainer.querySelectorAll('.dot-btn');

    function updateSlideClasses() {
      const current = AppState.currentSlide;
      const total = AppState.totalSlides;

      slides.forEach((slide, idx) => {
        slide.classList.remove('slide-active', 'slide-prev', 'slide-next', 'slide-hidden');

        if (idx === current) {
          slide.classList.add('slide-active');
          slide.setAttribute('aria-hidden', 'false');
        } else if (idx === (current - 1 + total) % total) {
          slide.classList.add('slide-prev');
          slide.setAttribute('aria-hidden', 'true');
        } else if (idx === (current + 1) % total) {
          slide.classList.add('slide-next');
          slide.setAttribute('aria-hidden', 'true');
        } else {
          slide.classList.add('slide-hidden');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Update dots
      dotBtns.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === current);
        dot.setAttribute('aria-selected', idx === current ? 'true' : 'false');
      });

      // Update counter
      if (counterEl) {
        const curFormatted = String(current + 1).padStart(2, '0');
        const totFormatted = String(total).padStart(2, '0');
        counterEl.innerHTML = `<span class="current-slide">${curFormatted}</span> / <span class="total-slides">${totFormatted}</span>`;
      }
    }

    function goToSlide(targetIdx) {
      AppState.currentSlide = (targetIdx + AppState.totalSlides) % AppState.totalSlides;
      updateSlideClasses();
    }

    function nextSlide() {
      goToSlide(AppState.currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(AppState.currentSlide - 1);
    }

    // Button controls
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        restartAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        restartAutoplay();
      });
    }

    // Direct click on adjacent slides
    slides.forEach((slide, idx) => {
      slide.addEventListener('click', (e) => {
        // If clicking inside a button or link, do not trigger slide switch
        if (e.target.closest('a') || e.target.closest('button')) return;

        if (idx !== AppState.currentSlide) {
          goToSlide(idx);
          restartAutoplay();
        }
      });
    });

    // Keyboard navigation (ArrowLeft & ArrowRight)
    sliderWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        restartAutoplay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        restartAutoplay();
      }
    });

    // Touch / Swipe Navigation for Mobile & Tablets
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;

    sliderWrapper.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        pauseAutoplay();
      },
      { passive: true }
    );

    sliderWrapper.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        const deltaY = e.changedTouches[0].screenY - touchStartY;

        // Only register horizontal swipes (prevent intercepting vertical scrolls)
        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        restartAutoplay();
      },
      { passive: true }
    );

    // Autoplay implementation with pause on hover
    function startAutoplay() {
      if (AppState.isReducedMotion) return;
      stopAutoplay();
      AppState.autoplayTimer = setInterval(nextSlide, AppState.autoplayIntervalMs);
      AppState.isAutoplayActive = true;
      updateAutoplayIcon();
    }

    function stopAutoplay() {
      if (AppState.autoplayTimer) {
        clearInterval(AppState.autoplayTimer);
        AppState.autoplayTimer = null;
      }
    }

    function pauseAutoplay() {
      stopAutoplay();
    }

    function restartAutoplay() {
      if (AppState.isAutoplayActive) {
        startAutoplay();
      }
    }

    function updateAutoplayIcon() {
      if (!autoplayBtn) return;
      const pauseIcon = autoplayBtn.querySelector('.icon-pause');
      const playIcon = autoplayBtn.querySelector('.icon-play');
      if (pauseIcon && playIcon) {
        pauseIcon.style.display = AppState.isAutoplayActive ? 'block' : 'none';
        playIcon.style.display = AppState.isAutoplayActive ? 'none' : 'block';
      }
    }

    // Toggle autoplay button
    if (autoplayBtn) {
      autoplayBtn.addEventListener('click', () => {
        AppState.isAutoplayActive = !AppState.isAutoplayActive;
        if (AppState.isAutoplayActive) {
          startAutoplay();
        } else {
          stopAutoplay();
          updateAutoplayIcon();
        }
      });
    }

    // Pause on hover
    sliderWrapper.addEventListener('mouseenter', pauseAutoplay);
    sliderWrapper.addEventListener('mouseleave', restartAutoplay);

    // Initial setup
    updateSlideClasses();
    startAutoplay();
  }

  /* --------------------------------------------------------------------------
     8. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  function initScrollReveals() {
    const revealItems = document.querySelectorAll('.reveal-item');

    if (!('IntersectionObserver' in window) || AppState.isReducedMotion) {
      revealItems.forEach((item) => item.classList.add('revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* --------------------------------------------------------------------------
     9. PROJECT ARCHITECTURE DEEP DIVE MODAL
     -------------------------------------------------------------------------- */
  function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalBadge = document.getElementById('modalBadge');
    const modalBody = document.getElementById('modalBody');
    const modalGithub = document.getElementById('modalGithubBtn');
    const closeBtn = document.getElementById('modalCloseBtn');
    const dismissBtn = document.getElementById('modalDismissBtn');
    const triggers = document.querySelectorAll('.preview-trigger');

    if (!modal) return;

    function openModal(projectIndex) {
      const data = ProjectDetailsData[projectIndex];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalBadge.textContent = data.badge;
      modalBody.innerHTML = data.body;
      if (modalGithub) modalGithub.href = data.githubUrl;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const pIndex = parseInt(trigger.dataset.project, 10);
        openModal(pIndex);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. CONTACT FORM VALIDATION & DIRECT EMAIL LOGIC
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const copyEmailBtn = document.getElementById('copyEmailBtn');

    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        const email = 'hafizmuhammedar123@gmail.com';
        navigator.clipboard
          .writeText(email)
          .then(() => {
            const originalTitle = copyEmailBtn.getAttribute('title');
            copyEmailBtn.setAttribute('title', 'Copied to clipboard!');
            copyEmailBtn.style.color = '#10B981';
            setTimeout(() => {
              copyEmailBtn.setAttribute('title', originalTitle);
              copyEmailBtn.style.color = '';
            }, 2200);
          })
          .catch(() => {
            // Fallback for older browsers
            window.location.href = `mailto:${email}`;
          });
      });
    }

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const subjectInput = document.getElementById('userSubject');
      const messageInput = document.getElementById('userMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
      }

      // Validate Email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('invalid');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('invalid');
        isValid = false;
      } else {
        subjectInput.classList.remove('invalid');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.classList.add('invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('invalid');
      }

      if (!isValid) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please correct the highlighted fields above.';
        return;
      }

      // Production note: If configured with a real endpoint (Formspree/EmailJS),
      // perform fetch() here. Below is a graceful fallback that opens mail client
      // while displaying instant UI confirmation.
      const submitBtn = document.getElementById('submitFormBtn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Processing...</span>`;

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = `Thank you, ${nameInput.value.trim()}! Preparing email draft... You can also email directly at hafizmuhammedar123@gmail.com`;

        // Direct mailto bridge
        const mailtoUri = `mailto:hafizmuhammedar123@gmail.com?subject=${encodeURIComponent(
          subjectInput.value.trim()
        )}&body=${encodeURIComponent(
          `From: ${nameInput.value.trim()} (${emailInput.value.trim()})\n\nMessage:\n${messageInput.value.trim()}`
        )}`;

        window.location.href = mailtoUri;

        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      }, 700);
    });

    // Realtime error cleanup on input
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          input.classList.remove('invalid');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. DYNAMIC FOOTER YEAR
     -------------------------------------------------------------------------- */
  function initFooterYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* --------------------------------------------------------------------------
     12. APPLICATION INITIALIZATION
     -------------------------------------------------------------------------- */
  function initApp() {
    initBackgroundCanvas();
    initAmbientSpotlight();
    initNavigation();
    initTiltEffects();
    initMagneticButtons();
    initProjectSlider();
    initScrollReveals();
    initProjectModal();
    initContactForm();
    initFooterYear();

    console.log(
      '%c ✨ Ar Hafiz Muhammed Portfolio Loaded %c Cinematic 4D UI | Pure Vanilla Stack ',
      'background: #5B8CFF; color: #FFF; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
      'background: #111522; color: #C5CAD5; padding: 4px 8px; border-radius: 0 4px 4px 0;'
    );
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
