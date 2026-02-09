/* ================================
   GLOBAL STATE
================================ */
let stepIndex = 0;
let secret = "";

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
   NO BUTTON ESCAPE
================================ */
function escapeNo() {
  const btn = document.getElementById("noBtn");
  if (!btn) return;

  const x = Math.random() * 150;
  const y = Math.random() * 150;
  btn.style.transform = `translate(${x}px, ${y}px)`;
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

  // Reset steps
  stepIndex = 0;
  document.querySelectorAll(".memory-card")
    .forEach(card => card.classList.add("hidden"));

  document.getElementById("nextStepBtn").classList.remove("hidden");
  document.getElementById("toProposalBtn").classList.add("hidden");

  // Reset heart
  const heart = document.querySelector(".heart-fill");
  if (heart) heart.classList.remove("filled");

  goToPage(1);
}

/* ================================
   SECRET EASTER EGG (OYE)
================================ */

/* 1️⃣ Capture typed keys */
document.addEventListener("keydown", (e) => {
  secret += e.key.toLowerCase();

  if (secret.includes("oye")) {
    showEasterEgg();
    secret = "";
  }

  // Keep buffer short
  if (secret.length > 10) {
    secret = secret.slice(-10);
  }
});

/* 2️⃣ Mobile Safari fix: force keyboard availability */
document.body.addEventListener("click", () => {
  const input = document.getElementById("secretInput");
  if (input) input.focus();
});

/* 3️⃣ Easter egg popup */
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
