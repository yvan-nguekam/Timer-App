let timers = [];

function addTimer() {
    const name = document.getElementById('timerName').value || 'Unnamed Timer';
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
        const timer = {
            id: Date.now(),
            name,
            totalSeconds,
            remainingSeconds: totalSeconds,
            interval: null,
            isPaused: false
        };
        timers.push(timer);
        renderTimers();
        startTimer(timer.id);
    }
}