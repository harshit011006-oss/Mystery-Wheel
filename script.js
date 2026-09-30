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

  {
    type: "CHAOS",
    icon: "⚡",
    title: "Oscar-Worthy Nonsense",
    text: "Pick the nearest completely ordinary object. You have 30 seconds to give an emotional Oscar-winning speech about why this object changed your life.",
    time: "30 SEC",
    points: 125
  },

  {
    type: "FUNNY",
    icon: "🎭",
    title: "Be Me",
    text: "For the next 60 seconds, imitate the other person as accurately as possible. Voice, expressions, habits, everything. Extra points for exposing them.",
    time: "60 SEC",
    points: 150
  },

  {
    type: "CUTE",
    icon: "♡",
    title: "The Impossible Compliment",
    text: "Give the other person a genuinely sweet compliment without mentioning their looks, personality, or saying 'I love you'. Make it something ridiculously specific.",
    time: "45 SEC",
    points: 175
  },

  {
    type: "CHAOS",
    icon: "☠",
    title: "Three-Word Soap Opera",
    text: "The other person gives you three completely random words. You have 60 seconds to create the most dramatic love story possible using all three.",
    time: "60 SEC",
    points: 150
  },

  {
    type: "FUNNY",
    icon: "📢",
    title: "Breaking News",
    text: "Pretend you are a news reporter covering the most ridiculous event happening in your room right now. Stay completely serious for 30 seconds.",
    time: "30 SEC",
    points: 125
  },

  {
    type: "MEMORY",
    icon: "🧠",
    title: "Memory Sniper",
    text: "The other person asks you 5 rapid-fire questions about a random old memory you shared. You get only 3 seconds to answer each one.",
    time: "15 SEC",
    points: 175
  },

  {
    type: "CHAOS",
    icon: "🔥",
    title: "Don't Laugh. Seriously.",
    text: "You have 60 seconds to make the other person laugh without touching them, showing memes, or saying 'lol'. If they laugh, you lose.",
    time: "60 SEC",
    points: 175
  },

  {
    type: "FUNNY",
    icon: "🗣",
    title: "Accent Disaster",
    text: "The other person chooses an accent or character voice. You must explain your entire morning in that voice without breaking character.",
    time: "60 SEC",
    points: 125
  },

  {
    type: "CHAOS",
    icon: "💀",
    title: "Wrong Universe",
    text: "For 90 seconds, pretend you are both characters in a completely different universe chosen by the other person. Never acknowledge the real world.",
    time: "90 SEC",
    points: 175
  },

  {
    type: "CUTE",
    icon: "🌷",
    title: "Tiny Thing",
    text: "Name one tiny thing the other person does that you secretly notice every single time. You have 20 seconds. No changing your answer.",
    time: "20 SEC",
    points: 150
  },

  {
    type: "FUNNY",
    icon: "🎤",
    title: "Commercial Break",
    text: "Sell yourself to the other person like you are a completely ridiculous product on television. Include a slogan, two features, and one terrible side effect.",
    time: "60 SEC",
    points: 150
  },

  {
    type: "CHAOS",
    icon: "🌀",
    title: "Reverse Interview",
    text: "You are the celebrity. The other person is the interviewer. Answer every question like you are desperately trying to hide a ridiculous scandal.",
    time: "90 SEC",
    points: 175
  },

  {
    type: "GAME",
    icon: "🎯",
    title: "One-Second Charades",
    text: "Act out a movie, celebrity, animal, or object using only ONE second of movement. The other person gets three guesses.",
    time: "3 GUESSES",
    points: 150
  },

  {
    type: "CHAOS",
    icon: "🧩",
    title: "The Forbidden Letter",
    text: "Pick one common letter of the alphabet. For the next 60 seconds, neither person is allowed to say a word containing that letter. Catch each other cheating.",
    time: "60 SEC",
    points: 200
  },

  {
    type: "FUNNY",
    icon: "👨‍⚖️",
    title: "Relationship Court",
    text: "Put the other person on trial for one harmless crime. You are the lawyer, judge, and witness. Present your ridiculous evidence and deliver the final verdict.",
    time: "2 MIN",
    points: 175
  },

  {
    type: "CUTE",
    icon: "💌",
    title: "The 5-Second Memory",
    text: "You have 5 seconds to choose one memory of the other person that you'd happily relive exactly as it happened. Then explain why.",
    time: "45 SEC",
    points: 175
  },

  {
    type: "FUNNY",
    icon: "🎨",
    title: "Portrait of a Criminal",
    text: "Draw the other person from memory in 45 seconds. You are NOT allowed to show the drawing until the timer ends. Reveal simultaneously.",
    time: "45 SEC",
    points: 150
  },

  {
    type: "CHAOS",
    icon: "🧨",
    title: "Plot Twist",
    text: "Start telling a completely normal story from your day. Every 10 seconds, the other person shouts 'PLOT TWIST!' and you must instantly change the story.",
    time: "60 SEC",
    points: 200
  },

  {
    type: "CUTE",
    icon: "🌙",
    title: "If We Had Tonight",
    text: "You have 30 seconds to plan the most perfect completely unrealistic night together. You can spend as much money as you want and go anywhere.",
    time: "30 SEC",
    points: 150
  },

  {
    type: "MUSIC",
    icon: "🎶",
    title: "Humiliated DJ",
    text: "Hum a song without using ANY lyrics. The other person gets three guesses. If they fail, reveal the song and immediately sing the chorus.",
    time: "3 GUESSES",
    points: 150
  },

  {
    type: "CHAOS",
    icon: "🕺",
    title: "Random Song. No Dignity.",
    text: "Put your music on shuffle. Whatever song appears, you have to perform 15 seconds of the most unnecessarily dramatic dance imaginable.",
    time: "15 SEC",
    points: 125
  },

  {
    type: "SECRET",
    icon: "👀",
    title: "Guess My Thought",
    text: "Think of one completely random thing you are looking at right now. Give three clues, but one clue must be deliberately misleading. One guess only.",
    time: "45 SEC",
    points: 175
  },

  {
    type: "BOSS",
    icon: "♛",
    title: "The Final Boss",
    text: "The other person gets to choose TWO: sing, imitate me, tell an embarrassing story, perform a dramatic scene, answer a dangerous question, or do a completely ridiculous dare. No vetoes.",
    time: "∞",
    points: 250
  }

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
