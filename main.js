const state = {
  bottoms: 1,
  hair: 1,
  shirt: 1,
  shoes: 1,
  face: 1,
  bangs: 1,
  skin: 1,
};

const COUNTS = {
  bottoms: 6,
  hair: 8,
  shirt: 8,
  shoes: 6,
  face: 6,
  bangs: 8,
  skin: 6,
};

const playlist = [
  "./images4/BeepBox-Song.mp3",
  "./images4/BeepBox-Song(1).mp3",
  "./images4/BeepBox-Song1.mp3",
];

let currentTrack = 0;
let isPlaying = false;

function setLayerClass(elementId, classPrefix, value) {
  const element = document.querySelector(`#${elementId}`);
  if (!element) return;

  element.className = `${classPrefix}${value}`;
}

function setHairLayerClass() {
  const hairElement = document.querySelector("#hair");
  if (!hairElement) return;

  hairElement.className = `hair${state.hair - 1}`;
}

function updateSelectedButtons(selector, selectedNumber) {
  document.querySelectorAll(selector).forEach((button, index) => {
    button.classList.toggle("selected", index + 1 === selectedNumber);
  });
}

function setbangs(number) {
  if (number < 1 || number > COUNTS.bangs) return;

  state.bangs = number;
  setLayerClass("bangs", "bangs", number);
  updateSelectedButtons(".bangsBtn", number);
}

function sethair(number) {
  if (number < 1 || number > COUNTS.hair) return;

  state.hair = number;
  setHairLayerClass();
  updateSelectedButtons(".hairBtn", number);
}

function setshirt(number) {
  if (number < 1 || number > COUNTS.shirt) return;

  state.shirt = number;
  setLayerClass("shirt", "shirt", number);
  updateSelectedButtons(".shirtBtn", number);
}

function setbottoms(number) {
  if (number < 1 || number > COUNTS.bottoms) return;

  state.bottoms = number;
  setLayerClass("bottoms", "bottoms", number);
  updateSelectedButtons(".bottomsBtn", number);
}

function setshoes(number) {
  if (number < 1 || number > COUNTS.shoes) return;

  state.shoes = number;
  setLayerClass("shoes", "shoes", number);
  updateSelectedButtons(".shoesBtn", number);
}

function setface(number) {
  if (number < 1 || number > COUNTS.face) return;

  state.face = number;
  setLayerClass("face", "face", number);
  updateSelectedButtons(".faceBtn", number);
}

function setskin(number) {
  if (number < 1 || number > COUNTS.skin) return;

  state.skin = number;
  setLayerClass("skin", "skin", number);
  updateSelectedButtons(".skinBtn", number);
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const icon = document.getElementById("recordIcon");

  if (!music || !icon) return;

  if (!music.src || music.src === window.location.href) {
    music.src = playlist[currentTrack];
  }

  if (isPlaying) {
    music.pause();
    icon.src = "./images4/recordmute.png";
    isPlaying = false;
  } else {
    music.play();
    icon.src = "./images4/recordspinning.gif";
    isPlaying = true;
  }
}

function setupMusicPlaylist() {
  const music = document.getElementById("bgMusic");

  if (!music) return;

  music.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    music.src = playlist[currentTrack];
    music.play();
  });
}

function updateCharacterPosition() {
  const imgW = 1914;
  const imgH = 913;

  const rugX = 310;
  const rugY = 890;

  const isPhone = window.innerWidth <= 700;

  const screenW = isPhone ? window.innerHeight : window.innerWidth;
  const screenH = isPhone ? window.innerWidth : window.innerHeight;

  const scale = Math.max(screenW / imgW, screenH / imgH);

  const renderedH = imgH * scale;
  const offsetY = (screenH - renderedH) / 2;

  const rugScreenX = rugX * scale;
  const rugScreenY = offsetY + rugY * scale;

  document.documentElement.style.setProperty("--sceneScale", scale);
  document.documentElement.style.setProperty("--rugScreenX", `${rugScreenX}px`);
  document.documentElement.style.setProperty("--rugScreenY", `${rugScreenY}px`);
}

function initializeGame() {
  setbottoms(state.bottoms);
  setshoes(state.shoes);
  sethair(state.hair);
  setshirt(state.shirt);
  setface(state.face);
  setbangs(state.bangs);
  setskin(state.skin);

  setupMusicPlaylist();
  updateCharacterPosition();
}

window.addEventListener("load", initializeGame);
window.addEventListener("resize", updateCharacterPosition);
window.addEventListener("orientationchange", updateCharacterPosition);