/**
 * Commonwealth Legacy RP - Cinematic Story Controller
 * Handles chapter activation, reveal pacing, local video fallback, and lazy YouTube embeds.
 */

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chapters = Array.from(document.querySelectorAll('.story-chapter[data-chapter]'));
  const chapterLinks = Array.from(document.querySelectorAll('[data-chapter-link]'));

  initLocalVideoPlaceholders(reduceMotion);
  initLazyYouTubeCards();
  initChapterObserver(chapters, chapterLinks);
  initStoryReveals(reduceMotion);
  initHeroScrollSequence(reduceMotion);
  initCharacterFrameScroll(reduceMotion);
});

function initChapterObserver(chapters, chapterLinks) {
  if (!chapters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const chapter = entry.target.dataset.chapter;
      if (!chapter) return;

      if (entry.isIntersecting) {
        chapters.forEach((section) => section.classList.toggle('chapter-active', section === entry.target));
        chapterLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.chapterLink === chapter));
      }

      const videos = entry.target.querySelectorAll('video.story-video');
      videos.forEach((video) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    });
  }, {
    threshold: 0.46,
    rootMargin: '-12% 0px -20% 0px',
  });

  chapters.forEach((chapter) => observer.observe(chapter));
}

function initStoryReveals(reduceMotion) {
  const revealItems = document.querySelectorAll('.reveal-story, .stagger-story [data-stagger]');
  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const parent = entry.target.closest('.stagger-story');
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll('[data-stagger]'));
        entry.target.style.setProperty('--story-delay', `${Math.max(0, siblings.indexOf(entry.target)) * 90}ms`);
      }

      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -8% 0px',
  });

  revealItems.forEach((item) => revealObserver.observe(item));
}

function initLocalVideoPlaceholders(reduceMotion) {
  if (reduceMotion) return;

  document.querySelectorAll('[data-local-video]').forEach((media) => {
    const src = media.dataset.localVideo;
    if (!src) return;

    const video = document.createElement('video');
    video.className = 'story-video';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-hidden', 'true');

    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);

    video.addEventListener('loadeddata', () => {
      const image = media.querySelector('.story-image');
      if (image) image.style.display = 'none';
      media.prepend(video);
      video.play().catch(() => {});
    }, { once: true });

    video.addEventListener('error', () => {
      video.remove();
    }, { once: true });

    video.load();
  });
}

function initLazyYouTubeCards() {
  document.querySelectorAll('.youtube-card[data-youtube-id]').forEach((card) => {
    const button = card.querySelector('.youtube-thumb');
    if (!button) return;

    button.addEventListener('click', () => {
      const youtubeId = card.dataset.youtubeId;
      const title = card.dataset.videoTitle || 'Commonwealth Legacy RP video';
      const embedUrl = typeof getYouTubeEmbedUrl === 'function'
        ? getYouTubeEmbedUrl(youtubeId, { controls: true, params: { autoplay: '1' } })
        : `https://www.youtube-nocookie.com/embed/${youtubeId}?controls=1&modestbranding=1&rel=0&autoplay=1`;

      const iframe = document.createElement('iframe');
      iframe.className = 'youtube-iframe';
      iframe.src = embedUrl;
      iframe.title = title;
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;

      button.replaceWith(iframe);
      card.classList.add('is-playing');
    }, { once: true });
  });
}

function initHeroScrollSequence(reduceMotion) {
  if (reduceMotion) return;

  const enterSection = document.getElementById('enter');
  if (!enterSection) return;

  const darkOverlay = enterSection.querySelector('.hero-dark-overlay');

  // Cache stage elements
  const stages = {
    landing: enterSection.querySelector('.stage-landing'),
    tunnel: enterSection.querySelector('.reveal-pass-through-stage'),
    logo: enterSection.querySelector('.stage-logo-wordmark'),
    release: enterSection.querySelector('.stage-release-date'),
    finalHero: enterSection.querySelector('.stage-final-hero')
  };

  // Helper to interpolate stage styles based on scroll progress
  function getStageStyles(progress, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd) {
    let opacity = 0;
    let translateY = 20; // default state is shifted down
    let scale = 0.95; // default scale
    let active = false;

    if (progress >= fadeInStart && progress <= fadeOutEnd) {
      active = true;
      if (progress < fadeInEnd) {
        // Fading in
        const t = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
        opacity = t;
        translateY = 20 * (1 - t);
        scale = 0.95 + 0.05 * t;
      } else if (progress > fadeOutStart) {
        // Fading out
        const t = (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        opacity = 1 - t;
        translateY = -20 * t;
        scale = 1.0 + 0.05 * t;
      } else {
        // Fully visible
        opacity = 1;
        translateY = 0;
        scale = 1.0;
      }
    } else if (progress < fadeInStart) {
      opacity = 0;
      translateY = 20;
      scale = 0.95;
    } else {
      opacity = 0;
      translateY = -20;
      scale = 1.05;
    }

    return { opacity, translateY, scale, active };
  }

  let ticking = false;

  function updateScroll() {
    const scrollRange = enterSection.offsetHeight - window.innerHeight;
    if (scrollRange <= 0) return;

    const progress = Math.max(0, Math.min(1, window.scrollY / scrollRange));

    // 1. Dark overlay opacity interpolation
    let overlayOpacity = 0.95;
    if (progress <= 0.18) {
      overlayOpacity = 0.95;
    } else if (progress <= 0.42) {
      const t = (progress - 0.18) / (0.42 - 0.18);
      overlayOpacity = 0.95 - 0.15 * t; // goes from 0.95 to 0.80
    } else if (progress <= 0.74) {
      overlayOpacity = 0.80;
    } else {
      const t = (progress - 0.74) / (1.00 - 0.74);
      overlayOpacity = 0.80 - 0.40 * t; // goes from 0.80 to 0.40
    }
    if (darkOverlay) {
      darkOverlay.style.opacity = overlayOpacity;
    }

    // 2. Background image/video transform (slow zoom/pan)
    const mediaContainer = enterSection.querySelector('.chapter-media');
    if (mediaContainer) {
      const mediaEl = mediaContainer.querySelector('video, img');
      if (mediaEl) {
        const scaleVal = 1.1 - 0.1 * progress;
        const panVal = progress * -2;
        mediaEl.style.transform = `scale(${scaleVal}) translate3d(0, ${panVal}%, 0)`;
      }
    }

    // 3. Stage 0: Landing / scroll indicator
    const stage0 = getStageStyles(progress, 0, 0, 0.0, 0.18);
    if (stages.landing) {
      stages.landing.style.opacity = stage0.opacity;
      stages.landing.style.transform = `translate3d(0, ${stage0.translateY}px, 0)`;
      stages.landing.classList.toggle('stage-active', stage0.active);
    }

    // 4. Stage 1 & 2: Letter Tunnel Pass-Through
    const stageTunnel = getStageStyles(progress, 0.18, 0.22, 0.38, 0.42);
    if (stages.tunnel) {
      stages.tunnel.style.opacity = stageTunnel.opacity;
      stages.tunnel.classList.toggle('stage-active', stageTunnel.active);

      // Handle non-linear text zoom pass-through
      const tunnelLogo = stages.tunnel.querySelector('.reveal-text-logo');
      if (tunnelLogo && stageTunnel.active) {
        const t = (progress - 0.18) / (0.42 - 0.18); // normalized stage progress
        // Non-linear camera zoom out (pulls out of letters)
        const scaleVal = 15 / (1 + 14 * t);
        // Add a subtle rotate for extra visual weight
        const rotateVal = (1 - t) * -2;
        tunnelLogo.style.transform = `scale(${scaleVal}) rotate(${rotateVal}deg) translate3d(0,0,0)`;
        
        let logoOpacity = 1;
        if (t < 0.15) logoOpacity = t / 0.15;
        else if (t > 0.85) logoOpacity = (1 - t) / 0.15;
        tunnelLogo.style.opacity = logoOpacity;
      }
    }

    // 5. Stage 3: Logo block/wordmark
    const stage2 = getStageStyles(progress, 0.42, 0.46, 0.54, 0.58);
    if (stages.logo) {
      stages.logo.style.opacity = stage2.opacity;
      stages.logo.style.transform = `translate3d(0, ${stage2.translateY}px, 0) scale(${stage2.scale})`;
      stages.logo.classList.toggle('stage-active', stage2.active);
    }

    // 6. Stage 4: Release Date
    const stage3 = getStageStyles(progress, 0.58, 0.62, 0.70, 0.74);
    if (stages.release) {
      stages.release.style.opacity = stage3.opacity;
      stages.release.style.transform = `translate3d(0, ${stage3.translateY}px, 0) scale(${stage3.scale})`;
      stages.release.classList.toggle('stage-active', stage3.active);
    }

    // 7. Stage 5: Final Hero Block with Actions
    const stage4 = getStageStyles(progress, 0.74, 0.82, 2.0, 2.0);
    if (stages.finalHero) {
      stages.finalHero.style.opacity = stage4.opacity;
      stages.finalHero.style.transform = `translate3d(0, ${stage4.translateY}px, 0)`;
      stages.finalHero.classList.toggle('stage-active', stage4.active);
    }

    ticking = false;
  }

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateScroll();
}

/**
 * Implements a scroll-scrubbed character frame sequence.
 * Toggles the visibility of character frames and captions based on scroll position.
 */
function initCharacterFrameScroll(reduceMotion) {
  const section = document.getElementById('legacy-frame-scroll');
  if (!section) return;

  const frames = Array.from(section.querySelectorAll('.character-frame'));
  const stages = Array.from(section.querySelectorAll('.frame-stage-copy'));
  const totalFrames = frames.length;

  function updateFrameScroll() {
    const isMobile = window.innerWidth <= 768;
    if (reduceMotion || isMobile) {
      // In reduced motion or mobile, make the final frame/caption active statically
      frames.forEach((f, idx) => {
        f.classList.toggle('is-active', idx === totalFrames - 1);
      });
      stages.forEach((s, idx) => {
        s.classList.toggle('is-active', idx === totalFrames - 1);
      });
      const stack = section.querySelector('.character-frame-stack');
      if (stack) stack.style.transform = '';
      return;
    }

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate how far down we have scrolled into the section's scrollable range
    const scrollableRange = sectionHeight - windowHeight;
    if (scrollableRange <= 0) return;

    const scrolled = -rect.top;
    let progress = scrolled / scrollableRange;
    progress = Math.max(0, Math.min(1, progress));

    // Determine current active index based on progress segments
    let frameIndex = 0;
    if (progress <= 0.16) {
      frameIndex = 0;
    } else if (progress <= 0.33) {
      frameIndex = 1;
    } else if (progress <= 0.50) {
      frameIndex = 2;
    } else if (progress <= 0.66) {
      frameIndex = 3;
    } else if (progress <= 0.83) {
      frameIndex = 4;
    } else {
      frameIndex = 5;
    }

    // Update active frame state
    frames.forEach((f, idx) => {
      f.classList.toggle('is-active', idx === frameIndex);
    });

    // Apply scale parallax zoom to the stack
    const stack = section.querySelector('.character-frame-stack');
    if (stack) {
      const currentScale = 1.03 - 0.03 * progress;
      stack.style.transform = `scale(${currentScale})`;
    }

    // Update active text caption
    stages.forEach((s, idx) => {
      s.classList.toggle('is-active', idx === frameIndex);
    });
  }

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateFrameScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    onScroll();
  }, { passive: true });

  // Run initial calculation
  updateFrameScroll();
}

