let timers = [];

function treplace(el) {
   //  alert(idEl.selectionStart);
    if (el.selectionStart == 1) {
        var o = el.value.substring(0, 1);
        if (isNaN(o)) {
            el.value = "";
        } else {
            if (parseInt(el.value) > 59) {
                if (parseInt(el.value.substring(0, 2)) > 59) {
                    el.value = "0" + el.value.substring(0, 1);
                }
                else {
                    el.value = el.value.substring(0, 2);
                }
            } else {
                el.value = el.value.substring(0, 2);
                el.selectionStart = 1;
            }
        }
    } else {
        if (el.selectionStart == 2) {
            var o = el.value.substring(1, 2);
            if (isNaN(o)) {
                el.value = el.value.substring(0, 1) + el.value.substring(2, 3);
            } else {
                if (parseInt(el.value) > 59) {
                    if (parseInt(el.value.substring(0, 2)) > 59) {
                        el.value = el.value.substring(0, 1);
                    }
                    else {
                        el.value = el.value.substring(0, 2);
                    }
                } else {
                    el.value = el.value.substring(0, 2);
                }
            }
            //
        } else {
            if (el.selectionStart == 3) {
                var o = el.value.substring(2, 3);
                if (isNaN(o)) {
                    el.value = el.value.substring(0, 2);
                } else {
                    if (parseInt(el.value) > 59) {
                        if (parseInt(el.value.substring(1, 3)) > 59) {
                            el.value = "0" + o;
                        }
                        else {
                            el.value = el.value.substring(1, 3);
                        }
                    } else {
                        el.value = el.value.substring(1, 3);
                    }
                }
            }
        }
    }
}


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
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
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
            <span>${timer.name}: ${formatTime(timer.remainingSeconds)}</span>
            <button onclick="pauseTimer(${timer.id})">${timer.isPaused ? 'Play' : 'Pause'}</button>
            <button onclick="deleteTimer(${timer.id})">Delete</button>
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