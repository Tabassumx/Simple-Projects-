let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;

const display = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // Pad seconds with a leading zero if less than 10
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (timerId !== null) return; // Prevent multiple intervals

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft === 0) {
            clearInterval(timerId);
            alert("Time's up! Take a break.");
        }
    }, 1000);
    
    startBtn.textContent = "Running...";
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateDisplay();
    startBtn.textContent = "Start";
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();