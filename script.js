function spookySound() {
  var spookySound = new Audio();
  spookySound.src = "/Database/Sons/Halloween/mp3/horribleLaugh.mp3";
  spookySound.play();
}
function ghostSound() {
  var ghostSound = new Audio();
  ghostSound.src = "/Database/Sons/Halloween/mp3/ghostSound.mp3";
  ghostSound.play();
}
window.onload = function () {
  var backgroundAudio = document.getElementById("bgAudio");
  backgroundAudio.volume = 0.5;
};

function ghostTogglePopup() {
  let popup = document.getElementById("ghostPopupOverlay");
  popup.classList.toggle("open");
}

function spookyTogglePopup() {
  let popup = document.getElementById("spookyPopupOverlay");
  popup.classList.toggle("open");
}