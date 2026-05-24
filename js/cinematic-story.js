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
