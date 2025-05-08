// Design and implement a digital Pomodoro Clock with the following features:

// 25-minute work timer followed by a 5-minute break.

// After every 4 work sessions, start a 15-minute long break.

// Allow users to:

// Start, pause, and reset the timer.

// Visually track session progress (e.g., with a progress bar or Pomodoro icons).
const WORK_TIME = 0.5 * 60;
const SHORT_BREAK_TIME = 0.25 * 60;
const LONG_BREAK_TIME = 0.3 * 60;
const TOTAL_SESSIONS = 4;

const sessionNameDiv = document.getElementById("session-name");
const timeLeftDiv = document.getElementById("time-left");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

let totalTime = WORK_TIME;
let timeLeft = WORK_TIME;
let isWorking = true;
let currentSession = 1;
let timer;

sessionNameDiv.textContent = "Working";
timeLeftDiv.textContent = formatTime(timeLeft);

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds}`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeftDiv.textContent = formatTime(--timeLeft);
    if (timeLeft === 0) {
      clearInterval(timer);
      if (isWorking) {
        if (currentSession === TOTAL_SESSIONS) {
          sessionNameDiv.textContent = "LongBreak";
          totalTime = LONG_BREAK_TIME;
          timeLeft = LONG_BREAK_TIME;
          currentSession = 0;
        } else {
          sessionNameDiv.textContent = "break";
          totalTime = SHORT_BREAK_TIME;
          timeLeft = SHORT_BREAK_TIME;
        }
        isWorking = false;
        startTimer();
        return;
      }
      currentSession++;
      sessionNameDiv.textContent = "working";
      isWorking = true;
      totalTime = WORK_TIME;
      timeLeft = WORK_TIME;
      startTimer();
    }
  }, 100);
}
startTimer();
