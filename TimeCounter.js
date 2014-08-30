/**
 * This is a simple time counter.
 * It counts only how long it runs in following format:
 * <b>hh:mm:ss</b>
 *
 */
function TimeCounter() {
    /**
     * Private members
     */
    var count   = 0;
    var _intervalTimer = undefined;

    // given options
    var options = arguments[0] || {};

    /**
     * Default attributes
     *
     * @type {{autostart: boolean, hours: number, minutes: number, seconds: number, timeString: string}}
     */
    var defaults = {
        autostart   : false,
        hours       : 0,
        minutes     : 0,
        seconds     : 0,
        timeString  : '00:00:00'
    }


    if(options) {
        // run through the defaults to replace the defaults with the given options
        var key;
        for (key in defaults) {
            if (options[key] !== undefined) {
                defaults[key] = options[key];
            }
        }
    }

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
            return this.formatNumber(defaults.hours);
        },
        set: function (value) {
            defaults.hours = value;
        }
    });

    Object.defineProperty(this, 'minutes', {
        get: function () {
            return this.formatNumber(defaults.minutes);
        },
        set: function (value) {
            defaults.minutes = value;
        }
    });

    Object.defineProperty(this, 'seconds', {
        get: function () {
            return this.formatNumber(defaults.seconds);
        },
        set: function (value) {
            defaults.seconds = value;
        }
    });

    if (defaults.autostart) {
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

        // start the timer if it is not running.
        if(this._intervalTimer !== undefined) {
            return false;
        }
        console.log('Start time counting with: ' + this.getTime());
        this._intervalTimer = window.setInterval(this.tick, 1000, this);
    },

    /**
     * Stops counter and reset props
     */
    stop: function () {

        // do the clearing only if the timer is currently running
        if(this._intervalTimer === undefined) {
            return false;
        }

        console.log('Stop time counting at: ' + this.getTime());
        window.clearInterval(this._intervalTimer);
        this._intervalTimer = undefined;
        this.reset();
    },

    /**
     * Resets the counter props
     */
    reset: function () {
        this.count = this.seconds = this.minutes = this.hours = 0;
    },

    /**
     * Returns the whole time string.
     */
    getTime: function () {
        return [this.hours, this.minutes, this.seconds].join(':');
    },

    /**
     * Sets the time of the time counter.
     *
     * @param hours
     * @param minutes
     * @param seconds
     */
    setTime: function (hours, minutes, seconds) {
        hours = hours || 0;
        minutes = minutes || 0;
        seconds = seconds || 0;

        // If the given seconds greater than 59,
        // then throw an error.
        if(seconds > 59) {
            throw new Error('Seconds must be between 0 - 59');
        }

        // If the given minutes greater than 59,
        // then throw an error.
        if(minutes > 59) {
            throw new Error('Minutes must be between 0 - 59');
        }

        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    },

    /**
     * Handler called on each tick of the timer.
     *
     * @param timeCounter TimeCounter
     */
    tick: function (timeCounter) {
        timeCounter.count++;
        timeCounter.seconds++;

        if(timeCounter.seconds % 60 === 0) {
            // have one minute completed
            timeCounter.seconds = 0;
            timeCounter.minutes++;

            if(timeCounter.minutes % 60 === 0) {
                // have an hour completed
                timeCounter.minutes = 0;
                timeCounter.hours++;
            }
        }
        timeCounter.triggerTickEvent();
    },

    /**
     * Triggers the tick event.
     * Includes the current time of the tick.
     */
    triggerTickEvent: function () {
        var ev = new CustomEvent('TimeCounter:tick', {'detail': {'time': this.getTime()} });
        document.dispatchEvent(ev);
    },

    /**
     * 'Formats' the given number
     *
     * @param number int
     */
    formatNumber: function (number) {
        return (number < 10) ? '0' + number : number;
    }
};