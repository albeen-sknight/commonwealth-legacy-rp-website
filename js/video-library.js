/**
 * COMMONWEALTH LEGACY RP - VIDEO LIBRARY
 * 
 * YouTube video data for cinematic sections.
 * Videos are embedded with privacy-friendly URLs and lazy-loading.
 * These are placeholder references only. Do not download or rehost them.
 * Replace with owned footage, licensed stock, or custom FiveM cinematics before production.
 */

const videoLibrary = {
  // CHAPTER 1: Virginia statewide cinematic / drone footage
  virginiaDrone: {
    id: 'virginiaDrone',
    title: 'Virginia 4K Drone Footage | Cinematic Aerial Views',
    category: 'atmosphere',
    youtubeId: '9DxyS9PBKKM',
    purpose: 'Homepage hero, Enter the Commonwealth section',
    placement: 'background',
    creditLabel: 'Virginia Tourism',
    sourceUrl: 'https://youtu.be/9DxyS9PBKKM',
    replaceLater: true,
    lazy: true,
    autoplay: false,
    muted: true,
    loop: false,
  },

  // CHAPTER 3: Richmond / capital city footage
  richmondDrone: {
    id: 'richmondDrone',
    title: 'Richmond, Virginia 4K Drone Footage',
    category: 'city',
    youtubeId: 'LBO_e5s9AyE',
    purpose: 'DOJ, government, courthouse, city atmosphere',
    placement: 'background',
    creditLabel: 'Richmond Aerial',
    sourceUrl: 'https://youtu.be/LBO_e5s9AyE',
    replaceLater: true,
    lazy: true,
    autoplay: false,
    muted: true,
    loop: false,
  },

  // CHAPTER 3: Virginia Beach footage
  virginiaBeachDrone: {
    id: 'virginiaBeachDrone',
    title: 'Virginia Beach 4K Drone Footage',
    category: 'coastal',
    youtubeId: 'XiCfjD0A3Vw',
    purpose: 'VBSO, coastal patrol, Virginia Beach identity',
    placement: 'background',
    creditLabel: 'Virginia Beach Tourism',
    sourceUrl: 'https://youtu.be/XiCfjD0A3Vw',
    replaceLater: true,
    lazy: true,
    autoplay: false,
    muted: true,
    loop: false,
  },

  // CHAPTER 5: Norfolk / Hampton Roads footage
  norfolkDrone: {
    id: 'norfolkDrone',
    title: 'Norfolk, Virginia 4K Drone Footage',
    category: 'regional',
    youtubeId: 'RgISPBxe4H0',
    purpose: 'Regional/coastal city atmosphere, patrol/community',
    placement: 'background',
    creditLabel: 'Norfolk Aerial',
    sourceUrl: 'https://youtu.be/RgISPBxe4H0',
    replaceLater: true,
    lazy: true,
    autoplay: false,
    muted: true,
    loop: false,
  },

  // CHAPTER 5: Richmond night cityscape
  richmondNight: {
    id: 'richmondNight',
    title: '4K RVA: Midnight Cityscapes of Richmond, Virginia',
    category: 'night',
    youtubeId: 'UpQv3v4x_EI',
    purpose: 'Dark cinematic sections, crime/justice/night atmosphere',
    placement: 'background',
    creditLabel: 'Richmond Cinematography',
    sourceUrl: 'https://youtu.be/UpQv3v4x_EI',
    replaceLater: true,
    lazy: true,
    autoplay: false,
    muted: true,
    loop: false,
  },

  // GENERAL: Virginia scenic relaxation
  virginiaScenic: {
    id: 'virginiaScenic',
    title: 'VIRGINIA 4K Scenic Relaxation Film',
    category: 'scenic',
    youtubeId: '4fjsopuUZ5A',
    purpose: 'Slower cinematic background, lifestyle sections',
    placement: 'background',
    creditLabel: 'Virginia Scenic',
    sourceUrl: 'https://youtu.be/4fjsopuUZ5A',
    replaceLater: true,
    lazy: true,
    autoplay: false,
    muted: true,
    loop: false,
  },
};

const localVideoPlaceholders = {
  heroCommonwealth: {
    title: 'Hero Commonwealth Loop',
    category: 'local-placeholder',
    youtubeId: '',
    purpose: 'Muted looping homepage hero background',
    placement: 'assets/video/hero-commonwealth.mp4',
    creditLabel: 'Replace with owned or licensed footage',
    sourceUrl: 'assets/video/hero-commonwealth.mp4',
    replaceLater: true,
  },
  richmondNight: {
    title: 'Richmond Night Loop',
    category: 'local-placeholder',
    youtubeId: '',
    purpose: 'Muted looping justice and night atmosphere background',
    placement: 'assets/video/richmond-night.mp4',
    creditLabel: 'Replace with owned or licensed footage',
    sourceUrl: 'assets/video/richmond-night.mp4',
    replaceLater: true,
  },
  departmentsLoop: {
    title: 'Departments Loop',
    category: 'local-placeholder',
    youtubeId: '',
    purpose: 'Muted looping department service background',
    placement: 'assets/video/departments-loop.mp4',
    creditLabel: 'Replace with owned or licensed footage',
    sourceUrl: 'assets/video/departments-loop.mp4',
    replaceLater: true,
  },
  communityLife: {
    title: 'Community Life Loop',
    category: 'local-placeholder',
    youtubeId: '',
    purpose: 'Muted looping lifestyle and civilian background',
    placement: 'assets/video/community-life.mp4',
    creditLabel: 'Replace with owned or licensed footage',
    sourceUrl: 'assets/video/community-life.mp4',
    replaceLater: true,
  },
};

/**
 * YouTube privacy-friendly embed URL builder
 * Uses youtube-nocookie.com for privacy
 */
function getYouTubeEmbedUrl(youtubeId, options = {}) {
  const baseUrl = 'https://www.youtube-nocookie.com/embed';
  const params = new URLSearchParams({
    controls: options.controls ? '1' : '0',
    modestbranding: '1',
    rel: '0',
    showinfo: '0',
    ...options.params,
  });
  return `${baseUrl}/${youtubeId}?${params.toString()}`;
}

/**
 * Get video by ID
 */
function getVideo(videoId) {
  return videoLibrary[videoId] || null;
}

/**
 * Get all videos by category
 */
function getVideosByCategory(category) {
  return Object.values(videoLibrary).filter(v => v.category === category);
}

/**
 * Get thumbnail URL for YouTube video
 * Supports different sizes: default (120x90), medium (320x180), high (480x360)
 */
function getYouTubeThumbnail(youtubeId, size = 'high') {
  const sizes = {
    default: 'default',      // 120x90
    medium: 'mqdefault',     // 320x180
    high: 'sddefault',       // 480x360
    maxres: 'maxresdefault', // 1280x720
  };
  return `https://img.youtube.com/vi/${youtubeId}/${sizes[size] || 'sddefault'}.jpg`;
}
