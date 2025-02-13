document.addEventListener("DOMContentLoaded", function () {
  const backgroundMusic = document.getElementById("backgroundMusic");
  const playButton = document.getElementById("playButton");

  // Set initial volume
  backgroundMusic.volume = 0.5;

  // Attempt autoplay
  backgroundMusic.muted = true; // Start muted (workaround for autoplay restrictions)
  backgroundMusic
    .play()
    .then(() => {
      backgroundMusic.muted = false; // Unmute if autoplay succeeds
      playButton.style.display = "none"; // Hide button if autoplay works
    })
    .catch(() => {
      playButton.style.display = "block"; // Show button if autoplay is blocked
    });

  // Play music on button click
  playButton.addEventListener("click", () => {
    backgroundMusic.muted = false; // Ensure it's unmuted
    backgroundMusic.play();
    playButton.style.display = "none";
  });

  // 🎉 Confetti Effect
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff69b4", "#ff4500", "#ffd700"],
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff69b4", "#ff4500", "#ffd700"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // 🖼️ Mouse Move Effect on Photos
  const photos = document.querySelectorAll(".photo-frame");

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    photos.forEach((photo) => {
      const rect = photo.getBoundingClientRect();
      const photoX = rect.left + rect.width / 2;
      const photoY = rect.top + rect.height / 2;

      const angleX = (mouseY - photoY) / 30;
      const angleY = (mouseX - photoX) / -30;

      photo.style.transform = `
              perspective(1000px)
              rotateX(${angleX}deg)
              rotateY(${angleY}deg)
              scale(1.05)
          `;
    });
  });

  // Reset photo position when mouse leaves
  document.addEventListener("mouseleave", () => {
    photos.forEach((photo) => {
      photo.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });

  // 🎭 Random Bounce Animation for Wishes
  const wishCards = document.querySelectorAll(".wish-card");
  wishCards.forEach((card) => {
    card.style.animation = `slideIn 0.5s ease-out forwards, 
           bounce 2s ease-in-out ${Math.random() * 2}s infinite`;
  });
});
