const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const spinNote = document.getElementById("spinNote");
const resultModal = document.getElementById("resultModal");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const resultType = document.getElementById("resultType");
const resultNumber = document.getElementById("resultNumber");
const resultIcon = document.getElementById("resultIcon");
const resultTime = document.getElementById("resultTime");
const resultPoints = document.getElementById("resultPoints");
const completeButton = document.getElementById("completeButton");
const closeButton = document.getElementById("closeButton");
const resetButton = document.getElementById("resetButton");
const historyList = document.getElementById("historyList");
const completedCount = document.getElementById("completedCount");
const scoreCount = document.getElementById("scoreCount");
const streakCount = document.getElementById("streakCount");
const toast = document.getElementById("toast");
const confettiLayer = document.getElementById("confetti");

const tasks = [
  { type: "CHAOS", icon: "⚡", title: "10-Second Disaster", text: "You have 10 seconds to find the weirdest object within arm's reach and show it on camera.", time: "10 SEC", points: 100 },
  { type: "PHOTO", icon: "◉", title: "Gallery Roulette", text: "Scroll your gallery without looking and stop randomly. Show the photo you land on and explain it in exactly one sentence.", time: "30 SEC", points: 125 },
  { type: "VOICE", icon: "◌", title: "Main Character", text: "Send a 15-second voice note speaking like you are narrating the trailer for the most dramatic movie ever made.", time: "15 SEC", points: 125 },
  { type: "MUSIC", icon: "♫", title: "Two-Second DJ", text: "Play a completely random song. The other person gets only two seconds to identify it.", time: "2 SEC", points: 100 },
  { type: "DARE", icon: "!", title: "No Context", text: "Send the last five emojis you used. No explanations allowed for the next five minutes.", time: "5 MIN", points: 100 },
  { type: "MEMORY", icon: "⌁", title: "Memory Leak", text: "Find the oldest photo of the two of you that you can locate in under 60 seconds.", time: "60 SEC", points: 150 },
  { type: "CHAOS", icon: "✦", title: "Freeze", text: "Set a timer for 20 seconds. Every time the other person says your name, you must freeze for three seconds.", time: "20 SEC", points: 125 },
  { type: "DRAW", icon: "✎", title: "60-Second Portrait", text: "Draw the other person in exactly 60 seconds. No erasing. Reveal it at the same time.", time: "60 SEC", points: 150 },
  { type: "DARE", icon: "◇", title: "Accent Attack", text: "Talk in a completely ridiculous accent for the next three minutes. The other person chooses the accent.", time: "3 MIN", points: 150 },
  { type: "FOOD", icon: "●", title: "Mystery Bite", text: "Choose two snacks. Close your eyes and identify them by taste alone.", time: "2 MIN", points: 125 },
  { type: "TEXT", icon: "#", title: "Forbidden Word", text: "Pick a normal everyday word. The other person has to make you say it within five minutes without saying the word themselves.", time: "5 MIN", points: 175 },
  { type: "PHOTO", icon: "◒", title: "Recreate It", text: "Pick an old photo and recreate the pose as accurately and dramatically as possible. Side-by-side comparison required.", time: "5 MIN", points: 175 },
  { type: "SPEED", icon: "›", title: "Rapid Fire", text: "Answer 8 questions in 20 seconds. No thinking, no changing answers, no mercy.", time: "20 SEC", points: 150 },
  { type: "DANCE", icon: "≈", title: "Secret Choreography", text: "Choose a song and invent a completely unnecessary 15-second dance. You must perform it on camera.", time: "15 SEC", points: 150 },
  { type: "TEXT", icon: "@", title: "Keyboard Chaos", text: "Type the sentence 'I have absolutely no idea what I'm doing' with your eyes closed. No corrections.", time: "20 SEC", points: 100 },
  { type: "MEMORY", icon: "⌂", title: "The Tiny Detail", text: "Name one tiny detail from your first proper conversation that the other person probably forgot.", time: "2 MIN", points: 175 },
  { type: "DARE", icon: "☄", title: "Unflattering Filter", text: "Use the first ridiculous face filter you find and keep it on while talking for one full minute.", time: "60 SEC", points: 100 },
  { type: "GAME", icon: "◇", title: "Rock Paper Panic", text: "Best of five. But before every throw, you must make a different sound effect.", time: "2 MIN", points: 100 },
  { type: "SECRET", icon: "?", title: "Three Clues", text: "Think of an object near you. Give exactly three clues. The other person gets one guess.", time: "2 MIN", points: 150 },
  { type: "CHAOS", icon: "☍", title: "Wrong Answers Only", text: "For the next two minutes, every question must be answered incorrectly—but convincingly.", time: "2 MIN", points: 125 },
  { type: "MUSIC", icon: "♪", title: "Lyric Ambush", text: "Hum the melody of a song without using words. The other person has three guesses.", time: "3 GUESSES", points: 125 },
  { type: "SECRET", icon: "✧", title: "The Hidden Compliment", text: "Give the other person a compliment without using any of these words: cute, pretty, love, amazing, special.", time: "1 MIN", points: 150 },
  { type: "PHOTO", icon: "▣", title: "Random Screenshot", text: "Take a screenshot of whatever is currently on your phone and reveal it. No checking first.", time: "10 SEC", points: 100 },
  { type: "BOSS", icon: "♛", title: "Boss Round", text: "The other person chooses: sing, dance, imitate, confess an embarrassing story, or do a dare. You cannot veto it.", time: "∞", points: 200 }
];

const colors = [
  "#171923", "#25151a", "#171a24", "#241820", "#121f24", "#211921",
  "#191b28", "#27181e", "#151f22", "#241b17", "#181b24", "#28171d"
];

const STORAGE_KEY = "mystery-wheel-state-v1";
let state = loadState();
let remainingTasks = buildRemainingTasks();
let rotation = 0;
let isSpinning = false;
let currentTask = null;
let audioContext = null;
let toastTimer = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && Array.isArray(saved.completedIds) ? saved : {
      completedIds: [],
      score: 0,
      streak: 0,
      history: []
    };
  } catch {
    return { completedIds: [], score: 0, streak: 0, history: [] };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function buildRemainingTasks() {
  const completedSet = new Set(state.completedIds);
  const pool = tasks.map((task, id) => ({ ...task, id })).filter(task => !completedSet.has(task.id));
  return shuffle(pool);
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function padded(value) {
  return String(value).padStart(2, "0");
}

function drawWheel() {
  const size = canvas.width;
  const center = size / 2;
  const radius = size / 2 - 8;
  const segmentCount = tasks.length;
  const segmentAngle = (Math.PI * 2) / segmentCount;

  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(rotation);

  for (let i = 0; i < segmentCount; i++) {
    const start = i * segmentAngle;
    const end = start + segmentAngle;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.08)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.rotate(start + segmentAngle / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = i % 3 === 0 ? "#ff586f" : "#797f8c";
    ctx.font = "700 17px Space Grotesk, sans-serif";
    ctx.fillText("?", radius * 0.78, 0);
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,.15)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();
}

function spin() {
  if (isSpinning) return;

  if (remainingTasks.length === 0) {
    showToast("You've cleared every mission. Reset the wheel for another run.");
    return;
  }

  startAudio();
  isSpinning = true;
  spinButton.disabled = true;
  document.body.classList.add("wheel-spinning");
  spinButton.textContent = "LOCKED IN…";

  const selectedIndex = Math.floor(Math.random() * remainingTasks.length);
  currentTask = remainingTasks.splice(selectedIndex, 1)[0];

  const segmentCount = tasks.length;
  const segmentAngle = (Math.PI * 2) / segmentCount;
  const targetIndex = currentTask.id;

  const desiredRotation = -targetIndex * segmentAngle - segmentAngle / 2;
  const currentNormalized = rotation % (Math.PI * 2);
  let delta = desiredRotation - currentNormalized;
  while (delta < 0) delta += Math.PI * 2;

  const extraTurns = (6 + Math.floor(Math.random() * 3)) * Math.PI * 2;
  const finalRotation = rotation + delta + extraTurns;
  const duration = 4700;
  const start = performance.now();
  const startRotation = rotation;

  function animate(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    rotation = startRotation + (finalRotation - startRotation) * eased;
    drawWheel();

    if (progress < 1) {
      if (Math.random() < 0.08) tickSound();
      requestAnimationFrame(animate);
    } else {
      rotation = finalRotation;
      drawWheel();
      isSpinning = false;
      spinButton.disabled = false;
      spinButton.innerHTML = 'SPIN AGAIN <span>↻</span>';
      document.body.classList.remove("wheel-spinning");
      revealTask(currentTask);
      spinNote.textContent = `${remainingTasks.length} missions still hidden`;
    }
  }

  requestAnimationFrame(animate);
}

function revealTask(task) {
  startAudio();
  winSound();
  resultType.textContent = task.type;
  resultNumber.textContent = `#${padded(task.id + 1)}`;
  resultIcon.textContent = task.icon;
  resultTitle.textContent = task.title;
  resultText.textContent = task.text;
  resultTime.textContent = task.time;
  resultPoints.textContent = `+${task.points} XP`;
  completeButton.textContent = "I DID IT ✓";
  completeButton.disabled = false;
  resultModal.classList.remove("hidden");
  resultModal.setAttribute("aria-hidden", "false");
}

function completeCurrentTask() {
  if (!currentTask) return;

  if (!state.completedIds.includes(currentTask.id)) {
    state.completedIds.push(currentTask.id);
  }
  state.score += currentTask.points;
  state.streak += 1;
  state.history.unshift({
    id: currentTask.id,
    title: currentTask.title,
    points: currentTask.points,
    type: currentTask.type,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  });
  state.history = state.history.slice(0, 8);
  saveState();
  renderStats();
  renderHistory();
  confetti();
  winSound();

  completeButton.textContent = "MISSION CLEARED ✓";
  completeButton.disabled = true;
  showToast(`Mission cleared • +${currentTask.points} XP`);

  setTimeout(() => {
    closeModal();
    currentTask = null;
    if (state.completedIds.length === tasks.length) {
      spinNote.textContent = "ALL MISSIONS CLEARED • RESET FOR ANOTHER RUN";
      spinButton.innerHTML = 'RESET RUN <span>↻</span>';
    }
  }, 900);
}

function closeModal() {
  resultModal.classList.add("hidden");
  resultModal.setAttribute("aria-hidden", "true");
}

function resetAll() {
  const confirmed = window.confirm("Reset every completed mission and score?");
  if (!confirmed) return;
  state = { completedIds: [], score: 0, streak: 0, history: [] };
  saveState();
  remainingTasks = buildRemainingTasks();
  currentTask = null;
  spinButton.disabled = false;
  spinButton.innerHTML = 'SPIN THE WHEEL <span>↻</span>';
  spinNote.textContent = "24 missions loaded • no repeats until the set is cleared";
  closeModal();
  renderStats();
  renderHistory();
  showToast("Run reset. Nobody saw anything. 👀");
}

function renderStats() {
  completedCount.textContent = state.completedIds.length;
  scoreCount.textContent = state.score;
  streakCount.textContent = state.streak;
}

function renderHistory() {
  if (!state.history.length) {
    historyList.innerHTML = '<div class="empty-state">No missions completed yet.<br>Spin to begin.</div>';
    return;
  }

  historyList.innerHTML = state.history.map(item => `
    <div class="history-item">
      <div class="history-top">
        <span>${escapeHtml(item.type)} • ${escapeHtml(item.time)}</span>
        <span class="history-points">+${item.points} XP</span>
      </div>
      <div class="history-task">${escapeHtml(item.title)}</div>
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
  }[char]));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

function confetti() {
  const pieces = 55;
  const symbols = ["", "", "", "✦"];
  const frag = document.createDocumentFragment();

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[i % symbols.length];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = i % 5 === 0 ? "#ff385c" : i % 5 === 1 ? "#63e6ff" : i % 5 === 2 ? "#79f2a0" : "#fff";
    piece.style.setProperty("--dx", `${(Math.random() - .5) * 300}px`);
    piece.style.animationDelay = `${Math.random() * .2}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    frag.appendChild(piece);
  }
  confettiLayer.appendChild(frag);
  setTimeout(() => { confettiLayer.innerHTML = ""; }, 2200);
}

function startAudio() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
  if (audioContext && audioContext.state === "suspended") audioContext.resume();
}

function tone(frequency, duration, type = "sine", volume = 0.03) {
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  const now = audioContext.currentTime;
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function tickSound() { tone(120, .035, "square", .012); }
function winSound() {
  tone(523.25, .10, "sine", .025);
  setTimeout(() => tone(659.25, .10, "sine", .025), 80);
  setTimeout(() => tone(783.99, .16, "sine", .025), 160);
}

spinButton.addEventListener("click", () => {
  if (state.completedIds.length === tasks.length) {
    resetAll();
  } else {
    spin();
  }
});
completeButton.addEventListener("click", completeCurrentTask);
closeButton.addEventListener("click", closeModal);
resetButton.addEventListener("click", resetAll);
resultModal.querySelector(".modal-backdrop").addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !resultModal.classList.contains("hidden")) closeModal();
  if (event.code === "Space" && resultModal.classList.contains("hidden") && !isSpinning) {
    event.preventDefault();
    spin();
  }
});

window.addEventListener("resize", () => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const displaySize = Math.min(620, canvas.parentElement.clientWidth - 24);
  canvas.style.width = `${displaySize}px`;
  canvas.style.height = `${displaySize}px`;
});

renderStats();
renderHistory();
drawWheel();
