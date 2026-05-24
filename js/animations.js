/**
 * Commonwealth Legacy RP - Cinematic Animation Engine
 * Smooth transitions, scroll reveals, staggered animations, and premium motion effects
 */

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize Intersection Observer for scroll-triggered animations
 */
function initScrollRevealAnimations() {
  if (prefersReducedMotion) return;

  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation class
        if (entry.target.classList.contains('reveal-up')) {
          entry.target.style.animation = 'slideUpIn 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
        } else if (entry.target.classList.contains('reveal-fade')) {
          entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
        } else if (entry.target.classList.contains('reveal-scale')) {
          entry.target.style.animation = 'scaleIn 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
        }

        // Handle staggered children
        if (entry.target.classList.contains('stagger-container')) {
          const children = entry.target.querySelectorAll('[data-stagger]');
          children.forEach((child, index) => {
            const delay = index * 0.1;
            child.style.animation = `slideUpIn 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${delay}s forwards`;
            child.style.opacity = '0';
          });
        }

        // Only animate once
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, revealOptions);

  // Apply to elements with reveal classes
  document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale, .stagger-container').forEach((el) => {
    el.style.opacity = '0';
    revealOnScroll.observe(el);
  });
}

/**
 * Initialize hero animations on page load
 */
function initHeroAnimations() {
  if (prefersReducedMotion) return;

  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;

  // Animate hero content elements with stagger
  const heroLabel = document.querySelector('.section-label');
  const heroTitle = document.querySelector('.hero-brand');
  const heroDescription = document.querySelector('.hero-description');
  const heroCtas = document.querySelector('.hero-ctas');
  const heroStatus = document.querySelector('.status-widget');
  const heroPillars = document.querySelector('.hero-pillars');

  const animations = [
    { el: heroLabel, delay: 0.2 },
    { el: heroTitle, delay: 0.4 },
    { el: heroDescription, delay: 0.6 },
    { el: heroCtas, delay: 0.8 },
    { el: heroStatus, delay: 1.0 },
    { el: heroPillars, delay: 1.2 }
  ];

  animations.forEach(({ el, delay }) => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay * 1000);
    }
  });
}

/**
 * Animate department cards on the departments page
 */
function initDepartmentCardAnimations() {
  if (prefersReducedMotion) return;

  const deptCards = document.querySelectorAll('.dept-card');
  deptCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    const delay = index * 0.15;
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, delay * 1000 + 200);
  });
}

/**
 * Enhance hover effects on cards
 */
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.feature-card, .news-card, .dashboard-card, .rank-card');
  
  cards.forEach((card) => {
    // Already has CSS hover, but we can add additional JS effects if needed
    // This is here for future expansions
  });
}

/**
 * Initialize stats counter animation (count up when visible)
 */
function initStatsAnimation() {
  if (prefersReducedMotion) return;

  const statValues = document.querySelectorAll('[data-stat-count]');
  
  const countUpAnimation = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = entry.target;
        const finalValue = parseInt(target.dataset.statCount);
        const duration = 2000; // 2 seconds
        const startValue = 0;
        const startTime = Date.now();

        const updateCounter = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);
          target.textContent = currentValue;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.classList.add('counted');
          }
        };

        updateCounter();
        countUpAnimation.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach((el) => countUpAnimation.observe(el));
}

/**
 * Add smooth transitions to navigation links
 */
function initNavigationAnimations() {
  const navLinks = document.querySelectorAll('a[href]');
  
  navLinks.forEach((link) => {
    // Skip hash and external links
    if (link.getAttribute('href').startsWith('#') || link.getAttribute('target') === '_blank') {
      return;
    }

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only animate internal navigation
      if (href && !href.startsWith('http') && !href.startsWith('//')) {
        e.preventDefault();
        
        // Fade out current page
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-out';
        
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

/**
 * Animate buttons with shine effect on hover
 */
function initButtonAnimations() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', function(e) {
      if (prefersReducedMotion) return;
      
      // Create shine effect
      const shineEl = document.createElement('div');
      shineEl.style.position = 'absolute';
      shineEl.style.top = '0';
      shineEl.style.left = '-100%';
      shineEl.style.width = '100%';
      shineEl.style.height = '100%';
      shineEl.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)';
      shineEl.style.pointerEvents = 'none';
      shineEl.style.animation = 'shineWave 0.6s ease-in-out';
      
      // Ensure button has position relative
      if (window.getComputedStyle(this).position === 'static') {
        this.style.position = 'relative';
      }
      
      this.appendChild(shineEl);
      setTimeout(() => shineEl.remove(), 600);
    });
  });
}

/**
 * Stagger animations for list items
 */
function initListItemAnimations() {
  if (prefersReducedMotion) return;

  const lists = document.querySelectorAll('ul:not(.stagger-story), ol:not(.stagger-story)');
  
  lists.forEach((list) => {
    if (list.closest('.cinematic-page')) return;

    const items = list.querySelectorAll('li');
    if (items.length === 0) return;

    items.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = `all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`;
      
      // Trigger animation
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 50);
    });
  });
}

/**
 * Initialize parallax effect on hero background
 */
function initHeroParallax() {
  if (prefersReducedMotion) return;

  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1024) return; // Disable on mobile
    
    const moveX = (e.clientX / window.innerWidth) * 10 - 5;
    const moveY = (e.clientY / window.innerHeight) * 10 - 5;
    
    heroBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    heroBg.style.transition = 'transform 0.3s ease-out';
  });
}

/**
 * Animate badges with pulse effect
 */
function initBadgeAnimations() {
  if (prefersReducedMotion) return;

  const badges = document.querySelectorAll('.badge, .status-badge-live');
  
  badges.forEach((badge) => {
    // Add pulse class for animation
    badge.classList.add('pulse-animate');
  });
}

/**
 * Initialize all animations on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  // Allow a small delay for the page to render
  setTimeout(() => {
    initScrollRevealAnimations();
    initHeroAnimations();
    initDepartmentCardAnimations();
    initCardHoverEffects();
    initStatsAnimation();
    initNavigationAnimations();
    initButtonAnimations();
    initListItemAnimations();
    initHeroParallax();
    initBadgeAnimations();
  }, 100);
});

/**
 * Reinitialize scroll animations when content changes dynamically
 */
function reinitializeAnimations() {
  if (prefersReducedMotion) return;
  initScrollRevealAnimations();
  initCardHoverEffects();
  initBadgeAnimations();
}

// Expose for external use if needed
window.RLP_Animations = {
  reinitialize: reinitializeAnimations
};
