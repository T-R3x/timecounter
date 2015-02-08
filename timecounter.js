(function () {
    'use strict';

    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    var TimeCounter = function(options) {

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
        };

        if(options instanceof Object) {
            // obj = given option object.
            // Run through the defaults to replace the defaults with the given options
            var key;

            for (key in defaults) {
                if (options[key] !== undefined) {
                    defaults[key] = options[key];
                }
            }
        }

        // sets the time
        console.debug('set time with: ', defaults);
        this.setTime(defaults);
        if (defaults.autostart) {
            this.start();
        }
    };

    // Export the TimeCounter object for **Node.js**, with
    // backwards-compatibility for the old `require()` API.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = TimeCounter;
        }
        exports.TimeCounter = TimeCounter;
    } else {
        root.TimeCounter = TimeCounter;
    }

    /**
     * Define class methods.
     */
    TimeCounter.prototype = {
        // constants
        TICK            : 'tick',
        RESET           : 'reset',
        SETTIME         : 'settime',

        /**
         * Starts the counter
         */
        start: function () {

            // start the timer if it is not running.
            if(this._intervalTimer !== undefined) {
                if(this._isPaused) {
                    this.resumeCounting();
                }
                return false;
            }

            console.log('Start time counting with: ', this.getTime());
            this._intervalTimer = window.setInterval(function () {this.tick()}.bind(this), 1000);
            //this._intervalTimer = window.setInterval(this.tick, 1000);
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
            this._isPaused = false;
            this.resetTimeProps();
        },

        /**
         * Resets the whole counter and start it again.
         */
        reset: function () {

            console.log('Reset time counting at: ' + this.getTime());
            this.resetTimeProps();
            this.triggerEvent(this.RESET);
        },

        /**
         * Pauses the current time counting
         */
        pause: function () {
            if(this._intervalTimer === undefined) {
                return false;
            }

            if(!this._isPaused) {
                console.log('Pause the counting at : ' + this.getTime());
                this._isPaused = true;
            } else {
                this.resumeCounting();
            }
        },

        /**
         * Resumes the time counting
         */
        resumeCounting: function () {
            if(this._isPaused) {
                console.log('Resume time counting on: ' + this.getTime());
                this._isPaused = false;
            }
        },

        /**
         * Resets the counter props
         */
        resetTimeProps: function () {
            this._seconds = this._minutes = this._hours = 0;
        },

        /**
         * Returns the whole time string.
         */
        getTime: function () {
            return [this.formatNumber(this._hours), this.formatNumber(this._minutes), this.formatNumber(this._seconds)].join(':');
        },

        /**
         * Sets the time of the time counter.
         */
        setTime: function (opts) {
            var options = opts || {};
            var hrs     = 0;
            var mins    = 0;
            var secs    = 0;

            if(Object.keys(options).length) {
                if(options.timeString !== undefined && options.timeString != '00:00:00') {
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

                this._hours      = hrs;
                this._minutes    = mins;
                this._seconds    = secs;

            } else {
                if(opts === undefined) {
                    throw new SyntaxError('No arguments was given!');
                }
            }
            this.triggerEvent(this.SETTIME);
        },

        /**
         * Sets the starting time by a given date.
         *
         * @param date
         * @param autoplay
         */
        setTimeByDate: function (date, autoplay) {

            if(date === undefined || !date instanceof Date) {
                throw new SyntaxError('The given date is not an instance of Date');
            }

            this.setTime({hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()});

            if(autoplay !== undefined && autoplay) {
                this.start();
            }
        },

        /**
         * Handler called on each tick of the timer.
         */
        tick: function () {
            if(!this._isPaused) {
                this._seconds++;

                if(this._seconds % 60 === 0) {
                    // have one minute completed
                    this._seconds = 0;
                    this._minutes++;

                    if(this._minutes % 60 === 0) {
                        // have an hour completed
                        this._minutes = 0;
                        this._hours++;
                    }
                }
                this.triggerEvent(this.TICK);
            }
        },

        /**
         * Triggers a specific TimeCounter-Event includes the time.
         *
         * @param type
         */
        triggerEvent: function (type) {
            if(type !== undefined) {
                var ev = new CustomEvent('TimeCounter:' + type, {'detail': {'time': this.getTime()} });
                document.dispatchEvent(ev);
            }
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

    /**
     * AMD registration happens at the end for compatibility with AMD loaders
     * that may not enforce next-turn semantics on modules. Even though general
     * practice for AMD registration is to be anonymous, TimeCounter registers
     * as a unnamed module.
     */
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return TimeCounter;
        });
    }

}).call(this);