/**
 * Commonwealth Legacy RP - Scenes from the Commonwealth Gallery Engine
 * Implements a premium fullscreen lightbox with slideshow navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryLightbox();
});

function initGalleryLightbox() {
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  if (!galleryItems.length) return;

  // Pre-load images metadata
  const images = galleryItems.map((item, index) => {
    const img = item.querySelector('img');
    return {
      src: img?.getAttribute('src') || '',
      alt: img?.getAttribute('alt') || 'Commonwealth Scene',
      caption: item.getAttribute('data-caption') || img?.getAttribute('alt') || 'Commonwealth Legacy RP Showcase',
      index: index
    };
  });

  let currentIndex = 0;

  // Open Lightbox when clicking a gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    // Create lightbox HTML if not exists
    let lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) {
      const lightboxHTML = `
        <div id="gallery-lightbox" class="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Image Gallery Lightbox">
          <div class="lightbox-container gallery-container">
            <button class="lightbox-close gallery-close" aria-label="Close gallery">&times;</button>
            <button class="gallery-nav prev" aria-label="Previous image">&#10094;</button>
            <button class="gallery-nav next" aria-label="Next image">&#10095;</button>
            <div class="gallery-slide-wrapper">
              <img id="gallery-active-img" src="" alt="">
              <div class="gallery-caption-bar">
                <span id="gallery-caption-text"></span>
                <span id="gallery-counter-text"></span>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', lightboxHTML);
      lightbox = document.getElementById('gallery-lightbox');
      setupLightboxEvents(lightbox);
    }

    updateSlide();
    lightbox.classList.remove('fade-out');
    document.body.classList.add('modal-open');
  }

  function setupLightboxEvents(lightbox) {
    const closeBtn = lightbox.querySelector('.gallery-close');
    const prevBtn = lightbox.querySelector('.gallery-nav.prev');
    const nextBtn = lightbox.querySelector('.gallery-nav.next');

    const closeLightbox = () => {
      lightbox.classList.add('fade-out');
      setTimeout(() => {
        document.body.classList.remove('modal-open');
      }, 300);
      document.removeEventListener('keydown', handleKeyDown);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('gallery-slide-wrapper')) {
        closeLightbox();
      }
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigate(-1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigate(1);
    });

    document.addEventListener('keydown', handleKeyDown);
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateSlide();
  }

  function updateSlide() {
    const activeImg = document.getElementById('gallery-active-img');
    const captionText = document.getElementById('gallery-caption-text');
    const counterText = document.getElementById('gallery-counter-text');
    const activeData = images[currentIndex];

    if (activeImg && activeData) {
      activeImg.classList.add('loading');
      activeImg.src = activeData.src;
      activeImg.alt = activeData.alt;
      activeImg.onload = () => {
        activeImg.classList.remove('loading');
      };

      if (captionText) captionText.innerText = activeData.caption;
      if (counterText) counterText.innerText = `${currentIndex + 1} / ${images.length}`;
    }
  }
}
