/**
 * This is a simple time counter.
 * It counts only how long it runs in following format:
 * <b>hh:mm:ss</b>
 *
 * @param autostart boolean
 */
function TimeCounter(autostart) {
    var autostart = autostart || false;

    /**
     * Private members
     */
    var count   = 0;
    var hours   = 0;
    var minutes = 0;
    var secs    = 0;

    var _intervalTimer;

    /**
     * Define getters and setters
     */
    Object.defineProperty(this, 'count', {
        get: function () {
            return count;
        },
        set: function (value) {
            count = value;
        }
    });

    Object.defineProperty(this, 'hours', {
        get: function () {
            return this.formatNumber(hours);
        },
        set: function (value) {
            hours = value;
        }
    });

    Object.defineProperty(this, 'minutes', {
        get: function () {
            return this.formatNumber(minutes);
        },
        set: function (value) {
            minutes = value;
        }
    });

    Object.defineProperty(this, 'secs', {
        get: function () {
            return this.formatNumber(secs);
        },
        set: function (value) {
            secs = value;
        }
    });

    if (autostart) {
        this.start();
    }
}

/**
 * Define class methods.
 */
TimeCounter.prototype = {

    /**
     * Starts the counter
     */
    start: function () {
        this._intervalTimer = window.setInterval(this.tick, 1000, this);
    },

    /**
     * Stops counter and reset props
     */
    stop: function () {},

    /**
     * Resets the counter props
     */
    reset: function () {},

    /**
     * Returns the whole time string.
     */
    getTime: function () {
        return [this.hours, this.minutes, this.secs].join(':');
    },

    /**
     * Handler called on each tick of the timer.
     *
     * @param timeCounter TimeCounter
     */
    tick: function (timeCounter) {
        timeCounter.count++;
        timeCounter.secs++;

        if(timeCounter.secs % 60 === 0) {
            // have one minute completed
            timeCounter.secs = 0;
            timeCounter.minutes++;

            if(timeCounter.minutes % 60 === 0) {
                // have an hour completed
                timeCounter.minutes = 0;
                timeCounter.hours++;
            }
        }
        console.debug(timeCounter.getTime());
    },

    /**
     * Triggers the tick event.
     * Includes the current time of the tick.
     */
    triggerTickEvent: function () {},

    /**
     * 'Formats' the given number
     *
     * @param number int
     */
    formatNumber: function (number) {
        return (number < 10) ? '0' + number : number;
    }
};