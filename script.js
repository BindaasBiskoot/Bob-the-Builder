/* ================================
   GLOBAL STATE
================================ */
let stepIndex = 0;
let tapCount = 0;
let tapTimer = null;

/* ================================
   LEGO CLICK SOUND
================================ */
function playClick() {
  const sound = document.getElementById("clickSound");
  if (!sound) return;
  sound.currentTime = 0;
  sound.play();
}

/* ================================
   PAGE NAVIGATION
================================ */
function goToPage(n) {
  playClick();
  document.querySelectorAll(".page")
    .forEach(p => p.classList.remove("active"));
  document.getElementById("page" + n)
    .classList.add("active");
}

/* ================================
   PAGE 2: STEP REVEAL
================================ */
function revealStep() {
  playClick();
  const cards = document.querySelectorAll(".memory-card");

  if (stepIndex < cards.length) {
    cards[stepIndex].classList.remove("hidden");
    stepIndex++;
  }

  if (stepIndex === cards.length) {
    document.getElementById("nextStepBtn").classList.add("hidden");
    document.getElementById("toProposalBtn").classList.remove("hidden");
  }
}

/* ================================
   PAGE 3: HEART BUILD
================================ */
function buildHeart() {
  playClick();
  const heart = document.querySelector(".heart-fill");
  if (heart) heart.classList.add("filled");

  legoConfetti();
  setTimeout(() => goToPage(4), 1200);
}

/* ================================
   DRAMATIC NO BUTTON
================================ */
function escapeNo() {
  const btn = document.getElementById("noBtn");
  if (!btn) return;

  const phrases = [
    "Nice try 🙄",
    "Absolutely not 😌",
    "Wrong answer ❌",
    "Think again 😏",
    "That’s not happening 💛"
  ];

  const x = (Math.random() * 200) - 100;
  const y = (Math.random() * 200) - 100;

  btn.style.transform =
    `translate(${x}px, ${y}px) rotate(${Math.random()*20-10}deg)`;
  btn.textContent =
    phrases[Math.floor(Math.random() * phrases.length)];
}

/* ================================
   LEGO CONFETTI
================================ */
function legoConfetti() {
  const colors = ["#e53935", "#1e88e5", "#fdd835", "#f48fb1"];

  for (let i = 0; i < 50; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    conf.style.animationDuration =
      2 + Math.random() * 2 + "s";

    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 4000);
  }
}

/* ================================
   REPLAY BUILD
================================ */
function replayBuild() {
  playClick();

  stepIndex = 0;
  document.querySelectorAll(".memory-card")
    .forEach(card => card.classList.add("hidden"));

  document.getElementById("nextStepBtn").classList.remove("hidden");
  document.getElementById("toProposalBtn").classList.add("hidden");

  const heart = document.querySelector(".heart-fill");
  if (heart) heart.classList.remove("filled");

  goToPage(1);
}

/* ================================
   SECRET EASTER EGG (TRIPLE TAP)
================================ */

/*
  RULES:
  - Triple tap anywhere
  - EXCEPT buttons
  - Mobile & desktop safe
*/

document.addEventListener("click", (e) => {
  // Ignore buttons
  if (e.target.closest("button")) return;

  tapCount++;

  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => {
    tapCount = 0;
  }, 600);

  if (tapCount === 3) {
    showEasterEgg();
    tapCount = 0;
  }
});

function showEasterEgg() {
  const egg = document.createElement("div");
  egg.innerHTML = "🧱 Oye detected.<br>Babyji found 💛";

  egg.style.position = "fixed";
  egg.style.bottom = "20px";
  egg.style.right = "20px";
  egg.style.background = "#fff";
  egg.style.padding = "12px 16px";
  egg.style.borderRadius = "12px";
  egg.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  egg.style.zIndex = "9999";
  egg.style.fontSize = "0.9rem";

  document.body.appendChild(egg);
  setTimeout(() => egg.remove(), 3000);
}
