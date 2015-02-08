define(function (require) {
    var TimeCounter = require('TimeCounter'),
        tC;

    // event handler to update the screen of the timer
    document.addEventListener('TimeCounter:tick', function (ev) {
        document.getElementById('timerScreen').innerHTML = ev.detail.time;
    });

    // event handler to update the screen of the timer
    document.addEventListener('TimeCounter:reset', function (ev) {
        document.getElementById('timerScreen').innerHTML = ev.detail.time;
    });

    // event handler to update the screen of the timer on set time
    document.addEventListener('TimeCounter:settime', function (ev) {
        document.getElementById('timerScreen').innerHTML = ev.detail.time;
    });

    // add click handler on start
    document.getElementById('startBtn').addEventListener('click', function (ev) {
        tC.start();
    });

    // add click handler on stop
    document.getElementById('stopBtn').addEventListener('click', function (ev) {
        tC.stop();
    });

    // add click handler on reset
    document.getElementById('resetBtn').addEventListener('click', function (ev) {
        tC.reset();
    });

    // add click handler on pause
    document.getElementById('pauseBtn').addEventListener('click', function (ev) {
        tC.pause();
    });

    tC = new TimeCounter({timeString: '13:45:13', hours: 5, minutes: 33, seconds: 15});

});