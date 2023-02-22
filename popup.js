const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);

function startTimer() {
    // Get the duration and websites from the UI
    const duration = document.getElementById('duration').value;
    const websites = document.getElementById('websites').value;

    // Send a message to the background script to start the timer
    chrome.runtime.sendMessage({ type: 'start', duration, websites });

    // Disable the start button and enable the pause button
    startButton.disabled = true;
    pauseButton.disabled = false;
}

function pauseTimer() {
    // Send a message to the background script to pause the timer
    chrome.runtime.sendMessage({ type: 'pause' });

    // Disable the pause button and enable the start button
    pauseButton.disabled = true;
    startButton.disabled = false;
}
