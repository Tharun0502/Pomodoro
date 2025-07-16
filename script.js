const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const modeButtons = document.querySelectorAll("[data-mode]");

let countdown;
let isRunning = false;
let currentTime = 2400; // default to Pomodoro (40 mins)

const MODES = {
  pomodoro: 2400,
  short: 300,
  long: 600
};

function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${min}:${sec}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  countdown = setInterval(() => {
    if (currentTime <= 0) {
      clearInterval(countdown);
      isRunning = false;
      alert("Time's up!");
      return;
    }
    currentTime--;
    updateDisplay(currentTime);
  }, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  currentTime = getCurrentModeTime();
  updateDisplay(currentTime);
}

function getCurrentModeTime() {
  const activeBtn = document.querySelector(".modes .active");
  const mode = activeBtn.getAttribute("data-mode");
  return MODES[mode];
}

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    modeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    resetTimer();
  });
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Init display
updateDisplay(currentTime);
