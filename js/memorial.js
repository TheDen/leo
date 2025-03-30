// --- Utilities ---
// Polyfill for requestIdleCallback
const safeIdle =
  window.requestIdleCallback ||
  ((cb) => setTimeout(() => cb({ timeRemaining: () => 50 }), 1));

// --- DOM Elements ---
const meowAudio = document.getElementById("meow-audio");
const leoImage = document.getElementById("leoImage");
const starContainer = document.querySelector(".stars");
const candleFlame = document.getElementById("candle-flame");
const lightGalleryElement = document.getElementById("lightgallery");

// --- Audio Setup ---
meowAudio.load();
meowAudio.addEventListener("canplaythrough", () => {
  console.log("Meow audio is ready.");
});

leoImage.addEventListener("click", () => {
  meowAudio.currentTime = 0;
  meowAudio.play().catch((err) => console.error("Audio playback failed:", err));
});

// --- LightGallery Init ---
const isMobile = window.innerWidth < 600;

safeIdle(() => {
  lightGallery(lightGalleryElement, {
    plugins: [lgThumbnail, lgZoom],
    speed: 300,
    download: false,
    thumbWidth: 80,
    thumbHeight: 60,
    animateThumb: false,
    thumbnail: !isMobile,
    mobileSettings: {
      controls: true,
      showCloseIcon: true,
      download: false,
      rotate: false,
      thumbnail: false,
    },
  });
});

// --- Candle Toggle ---
function toggleCandle() {
  candleFlame.classList.toggle("hidden");
}

// --- Starfield Background ---
safeIdle(() => {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("span");
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const delay = Math.random() * 3;
    star.style.cssText = `
      top: ${top}%;
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      animation-delay: ${delay}s;
    `;
    frag.appendChild(star);
  }
  starContainer.appendChild(frag);
});

// --- Shooting Stars ---
const shootingStarPool = Array.from({ length: 10 }, () => {
  const el = document.createElement("div");
  el.className = "shooting-star hidden";
  document.body.appendChild(el);
  return el;
});

let poolIndex = 0;

function reuseShootingStar() {
  const star = shootingStarPool[poolIndex];
  poolIndex = (poolIndex + 1) % shootingStarPool.length;

  const startX = Math.random() * window.innerWidth * 0.8;
  const startY = Math.random() * window.innerHeight * 0.4;
  const duration = Math.random() * 1.5 + 0.5;

  star.style.top = `${startY}px`;
  star.style.left = `${startX}px`;
  star.style.animation = `shoot ${duration}s ease-out forwards`;
  star.classList.remove("hidden");

  setTimeout(() => star.classList.add("hidden"), duration * 1000);
}

function startShootingStars() {
  setInterval(() => {
    if (Math.random() < 0.8) {
      reuseShootingStar();
    }
  }, 5000);
}
startShootingStars();
