/**
 * This is a simple time counter.
 * It counts only how long it runs in following format:
 * <b>hh:mm:ss</b>
 *
 * @author Sascha Hofrichter
 * @version 1.2.0
 */
function TimeCounter() {
    /**
     * Private members
     */
    var count           = 0;
    var _intervalTimer  = undefined;
    var isPaused        = false;

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

    // sets the time
    this.setTime(defaults);

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
            if(this.isPaused) {
                this.resumeCounting();
            }
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
        this.isPaused = false;
        this.resetTimeProps();
    },

    /**
     * Resets the whole counter and start it again.
     */
    reset: function () {

        console.log('Reset time counting at: ' + this.getTime());
        this.resetTimeProps();
        this.triggerResetEvent();
    },

    /**
     * Pauses the current time counting
     */
    pause: function () {
        if(this._intervalTimer === undefined) {
            return false;
        }

        if(!this.isPaused) {
            console.log('Pause the counting at : ' + this.getTime());
            this.isPaused = true;
        } else {
            this.resumeCounting();
        }
    },

    /**
     * Resumes the time counting
     */
    resumeCounting: function () {
        if(this.isPaused) {
            console.log('Resume time counting on: ' + this.getTime());
            this.isPaused = false;
        }
    },

    /**
     * Resets the counter props
     */
    resetTimeProps: function () {
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
     */
    setTime: function (opts) {
        var options = arguments[0] || opts || {};
        var hrs     = 0;
        var mins    = 0;
        var secs    = 0;

        if(Object.keys(options).length) {
            if(options.hasOwnProperty('timeString')) {
                // user given time string!
                // If the user specify a time string and the separate times (hours, minutes and seconds),
                // prefer the time string instead.
                var times = options.timeString.split(':');
                if(times.length === 3) {
                    hrs     = (!isNaN(times[0])) ? parseInt(times[0]) : 0;
                    mins    = (!isNaN(times[1])) ? parseInt(times[1]) : 0;
                    secs    = (!isNaN(times[2])) ? parseInt(times[2]) : 0;
                } else {
                    throw new SyntaxError('The given time string is invalid! Please use the following format "hh:mm:ss". Given time is: ' + options.timeString);
                }
            } else {
                // user gives the times separately.
                hrs     = (!isNaN(options.hours))   ? parseInt(options.hours) : 0;
                mins    = (!isNaN(options.minutes)) ? parseInt(options.minutes) : 0;
                secs    = (!isNaN(options.seconds)) ? parseInt(options.seconds) : 0;
            }

            // If the given seconds are greater than 59,
            // then throw an error.
            if(secs > 59) {
                throw new Error('Seconds must be between 0 - 59');
            }

            // If the given minutes are greater than 59,
            // then throw an error.
            if(mins > 59) {
                throw new Error('Minutes must be between 0 - 59');
            }

            this.hours      = hrs;
            this.minutes    = mins;
            this.seconds    = secs;

        } else {
            if(opts === undefined) {
                throw new SyntaxError('No arguments was given!');
            }
        }
    },

    /**
     * Sets the starting time by a given date.
     *
     * @param date
     * @param autoplay
     */
    setTimeByDate: function (date, autoplay) {
        if(!date instanceof Date) {
            throw new SyntaxError('The given date is not an instance of Date');
        }

        this.setTime({hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()});

        if(autoplay !== undefined && autoplay) {
            this.start();
        }
    },

    /**
     * Handler called on each tick of the timer.
     *
     * @param timeCounter TimeCounter
     */
    tick: function (timeCounter) {
        if(!timeCounter.isPaused) {
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
        }
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
     * Triggers the reset event.
     * Includes the reset time.
     */
    triggerResetEvent: function () {
        var ev = new CustomEvent('TimeCounter:reset', {'detail': {'time': this.getTime()} });
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
