let timerId = null;
let blockedWebsites = null;
let remainingTime = null;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.type) {
            case 'start':
                // Get the duration and websites from the request
                remainingTime = request.duration * 60;
                blockedWebsites = request.websites.split('\n');

                // Start the timer
                timerId = setInterval(updateTimer, 1000);
                break;
            case 'pause':
                // Pause the timer
                clearInterval(timerId);
                timerId = null;
                break;
        }
    });

function updateTimer() {
    if (remainingTime <= 0) {
        clearInterval(timerId);
        timerId = null;
        remainingTime = null;
        blockedWebsites = null;
        chrome.tabs.query({}, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
            }
        });
    } else {
        // Update the remaining time
        remainingTime--;

        // Block specified websites
        chrome.tabs.query({}, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                for (var j = 0; j < blockedWebsites.length; j++) {
                    if (tabs[i].url.indexOf(blockedWebsites[j]) !== -1) {
                        chrome.tabs.update(tabs[i].id, {url: 'blocked.html'});
                    }
                }
            }
        });
    }
}
