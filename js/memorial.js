// Preload meow audio
const meowAudio = document.getElementById("meow-audio");
meowAudio.load();
meowAudio.addEventListener("canplaythrough", () => {
  console.log("Meow audio is ready.");
});

// Meow on image click
const leoImage = document.getElementById("leoImage");
leoImage.addEventListener("click", () => {
  meowAudio.currentTime = 0;
  meowAudio.play().catch((err) => console.error("Audio playback failed:", err));
});

// LightGallery initialization
const isMobile = window.innerWidth < 600;
requestIdleCallback(() => {
  lightGallery(document.getElementById("lightgallery"), {
    plugins: [lgThumbnail, lgZoom],
    speed: 300,
    download: false,
    thumbWidth: 80,
    thumbHeight: 60,
    animateThumb: false,
    thumbnail: !isMobile,
    mobileSettings: {
      controls: !isMobile,
      showCloseIcon: true,
      download: false,
      rotate: false,
      thumbnail: false,
    },
  });
});

// Candle toggle
function toggleCandle() {
  const flame = document.getElementById("candle-flame");
  flame.classList.toggle("hidden");
}

// Star field background
const starContainer = document.querySelector(".stars");
requestIdleCallback(() => {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("span");
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    star.style.cssText = `
      top: ${top}%;
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      animation-delay: ${Math.random() * 3}s;
    `;
    frag.appendChild(star);
  }
  starContainer.appendChild(frag);
});

// Shooting star pool reuse
const shootingStarPool = Array.from({ length: 10 }, () => {
  const el = document.createElement("div");
  el.className = "shooting-star";
  el.classList.add("hidden");
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

  setTimeout(() => {
    star.classList.add("hidden");
  }, duration * 1000);
}

function startShootingStars() {
  setInterval(() => {
    if (Math.random() < 0.8) {
      reuseShootingStar();
    }
  }, 5000);
}
startShootingStars();
