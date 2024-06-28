let timers = [];

function addTimer() {
    // const name = document.getElementById('timerName').value || 'Unnamed Timer';
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

// function pour notification
function notifyUser(message) {
    if (Notification.permission === 'granted') {
        new Notification(message);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(message);
            }
        });
    }
}

function startTimer(id) {
    const timer = timers.find(t => t.id === id);
    console.log(timer)
    if (timer) {
        timer.interval = setInterval(() => {
            if (!timer.isPaused) {
                timer.remainingSeconds--;
                if (timer.remainingSeconds <= 0) {
                    clearInterval(timer.interval);
                    playSound();
                    notifyUser(`${timer.name} is done!`);
                }
                renderTimers();
            }
        }, 1000);
    }
}

function playSound() {
    // const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    const audio = new Audio('https://apple-timer.vercel.app/ring.mp3');
    audio.play();
}

function pauseTimer(id) {
    const timer = timers.find(t => t.id === id);
    if (timer) {
        timer.isPaused = !timer.isPaused;
        renderTimers();
    }
}

function deleteTimer(id) {
    timers = timers.filter(t => t.id !== id);
    renderTimers();
}

function renderTimers() {
    const timersContainer = document.getElementById('timers');
    timersContainer.innerHTML = '';
    timers.forEach(timer => {
        const timerElement = document.createElement('div');
        timerElement.className = 'timer';
        timerElement.innerHTML = `
            <div class="relative flex size-full flex-col items-center justify-center gap-1">${timer.name}: ${formatTime(timer.remainingSeconds)}</div>
            <button class="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full p-0 bg-success text-success-content" onclick="pauseTimer(${timer.id})">${timer.isPaused ? 'Play' : 'Pause'}</button>
            <button class="absolute bottom-3 left-3 flex size-7 items-center justify-center rounded-full bg-base-300 p-0 text-base-content" onclick="deleteTimer(${timer.id})">Delete</button>
        `;
        timersContainer.appendChild(timerElement);
    });
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}