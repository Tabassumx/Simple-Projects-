/* --- JAVASCRIPT LOGIC --- */
        let timeLeft = 1500; 
        let timerId = null;
        let isRunning = false;

        const display = document.getElementById('timer');
        const startBtn = document.getElementById('start');
        const resetBtn = document.getElementById('reset');
        const modeBtns = document.querySelectorAll('.mode-btn');

        // Update the numbers on the screen
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            document.title = `${display.textContent} - Focus Timer`;
        }

        // Handle Mode Switching
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // UI Updates
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const themeColor = btn.getAttribute('data-color');
                display.style.color = themeColor;
                startBtn.style.backgroundColor = themeColor;

                // Logic Updates
                stopTimer();
                timeLeft = parseInt(btn.getAttribute('data-time'));
                updateDisplay();
            });
        });

        function startTimer() {
            if (isRunning) {
                stopTimer();
                return;
            }

            isRunning = true;
            startBtn.textContent = "PAUSE";
            
            timerId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    stopTimer();
                    alert("Session complete! Time for a change of pace.");
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerId);
            timerId = null;
            isRunning = false;
            startBtn.textContent = "START";
        }

        function resetTimer() {
            stopTimer();
            const activeMode = document.querySelector('.mode-btn.active');
            timeLeft = parseInt(activeMode.getAttribute('data-time'));
            updateDisplay();
        }

        startBtn.addEventListener('click', startTimer);
        resetBtn.addEventListener('click', resetTimer);

        // Run once on load
        updateDisplay();