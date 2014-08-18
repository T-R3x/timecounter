/**
 * This is a simple time counter.
 * It counts only how long it runs in following format:
 * <b>hh:mm:ss</b>
 *
 * @param boolean
 */
function TimeCounter(autostart) {
    var autostart = autostart || false;

    /**
     * Private members
     */
    var count = 1;
    var hours = 0;
    var minutes = 0;
    var secs = 0;

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
            return hours;
        },
        set: function (value) {
            hours = value;
        }
    });

    Object.defineProperty(this, 'minutes', {
        get: function () {
            return minutes;
        },
        set: function (value) {
            minutes = value;
        }
    });

    Object.defineProperty(this, 'secs', {
        get: function () {
            return secs;
        },
        set: function (value) {
            secs = value;
        }
    });

    if (autostart) {
        console.debug('Do something');
    }
}
