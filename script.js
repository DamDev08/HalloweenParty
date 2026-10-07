"use strict";

const SOUNDS = {
  music: "Database/Musiques/Halloween/mp3/halloweenBgdMusic.mp3",
  thunder: "Database/Sons/Halloween/mp3/thunderSound.mp3",
  laugh: "Database/Sons/Halloween/mp3/horribleLaugh.mp3",
  ghost: "Database/Sons/Halloween/mp3/ghostSound.mp3",
};

function playAudio(src, { volume = 1, loop = false } = {}) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.loop = loop;
  // play() renvoie une promesse : on ignore un éventuel refus du navigateur
  audio.play().catch(() => {});
  return audio;
}

/* ---------- Fenêtre « fond sonore » ---------- */
const modal = document.querySelector(".modal");

function closeModal() {
  modal.classList.remove("open");
}

window.addEventListener("load", () => {
  setTimeout(() => modal.classList.add("open"), 500);
});

document.getElementById("btnClose").addEventListener("click", closeModal);
document.getElementById("btnPlay").addEventListener("click", () => {
  playAudio(SOUNDS.music, { volume: 0.3, loop: true });
  playAudio(SOUNDS.thunder, { volume: 0.7, loop: true });
  closeModal();
});

/* ---------- Pop-ups ---------- */
const closers = [];

function setupPopup({ overlayId, buttonId, closeSelector, sound }) {
  const overlay = document.getElementById(overlayId);
  const trigger = document.getElementById(buttonId);
  const closeBtn = overlay.querySelector(closeSelector);

  function setOpen(open) {
    overlay.classList.toggle("open", open);
    trigger.setAttribute("aria-expanded", String(open));
    (open ? closeBtn : trigger).focus();
  }

  trigger.addEventListener("click", () => {
    playAudio(sound);
    setOpen(true);
  });
  closeBtn.addEventListener("click", () => setOpen(false));
  // clic sur le fond sombre = fermeture
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) setOpen(false);
  });

  closers.push(() => {
    if (overlay.classList.contains("open")) setOpen(false);
  });
}

setupPopup({
  overlayId: "spookyPopupOverlay",
  buttonId: "spookyBtn",
  closeSelector: ".spookyPopupExit",
  sound: SOUNDS.laugh,
});
setupPopup({
  overlayId: "ghostPopupOverlay",
  buttonId: "ghostBtn",
  closeSelector: ".ghostPopupExit",
  sound: SOUNDS.ghost,
});

// Échap ferme la fenêtre ou le pop-up ouvert
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeModal();
  closers.forEach((close) => close());
});
