let stepIndex = 0;
let heartIndex = 0;
let secret = "";

// CLICK SOUND
function playClick() {
  const sound = document.getElementById("clickSound");
  sound.currentTime = 0;
  sound.play();
}

// PAGE NAV
function goToPage(n) {
  playClick();
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page" + n).classList.add("active");
}

// STEP REVEAL
function revealStep() {
  playClick();
  const steps = document.querySelectorAll(".step");
  if (stepIndex < steps.length) {
    steps[stepIndex].classList.remove("hidden");
    stepIndex++;
  }
  if (stepIndex === steps.length) {
    document.getElementById("nextStepBtn").classList.add("hidden");
    document.getElementById("toProposalBtn").classList.remove("hidden");
  }
}

// HEART BUILD
function buildHeart() {
  playClick();
  const bricks = document.querySelectorAll(".brick");

  if (heartIndex < bricks.length) {
    bricks[heartIndex].classList.add("filled");
    heartIndex++;
  }

  if (heartIndex === bricks.length) {
    legoConfetti();
    setTimeout(() => goToPage(4), 1200);
  }
}

// NO BUTTON ESCAPE
function escapeNo() {
  const btn = document.getElementById("noBtn");
  btn.style.transform =
    `translate(${Math.random()*150}px, ${Math.random()*150}px)`;
}

// LEGO CONFETTI
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

// SECRET EASTER EGG: OYE
document.addEventListener("keydown", e => {
  secret += e.key.toLowerCase();
  if (secret.includes("oye")) {
    showEasterEgg();
    secret = "";
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
