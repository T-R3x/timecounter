# Time Counter
**Simple JavaScript time counter**

[DEMO](https://code-worker.de/timecounterjs)

## Usage 
This is a simple JavaScript-Class. You can use it in an old-fashioned way (with the script-tag) or with an AMD-loader.

The TimeCounter triggers a custom event on each tick (every second).
This event has a `detail` attribute which contains the current time.
If you want to refresh something (like a paragraph or something else) on each tick, then bind the `TimeCounter:tick`-event on your object.

```js
// instantiate the time counter
var timeCounter = new TimeCounter();

// starts the counter. Default value is "00:00:00"
timeCounter.start();

// stops the counter and resets the internal value.
timeCounter.stop();
```

## Methods 
### constructor
The constructor takes an ```js options ``` parameter.
It is an object that contains various elements.

```js
{
    'autostart' : <true|false>,
    'hours'     : <int>,
    'minutes'   : <int>,
    'seconds'   : <int>,
    'timeString': <string that contains the starting time like '00:00:00' >
}
```
*Note*: if the user gives a timeString that isn't '00:00:00' and gives the time separately (hours, minutes and seconds), then take the timeString as standard.
Otherwise build the time by the separately given parameters.

### start 
Starts the TimeCounter.

### stop 
Stops the TimeCounter and resets the time value.

### reset
Resets the whole counting. (stop, resumeCounting and starts again).

### pause
Pauses the current time count.

### resumeCounting
Resumes the time counting if the user has paused.

### resetTimeProps
Resets the 'time' properties (hours, seconds, minutes).

### getTime 
Returns the counted time in following format: "hh:mm:ss"

### setTime
Sets the time of the counter with given parameters.
The parameters must be an object that contains a `timeString: '00:00:00'` or the separate time parts of time (hours, minutes, seconds).
```js
timeCounter.setTime({timeString = '00:00:00', hours: 1, minutes: 22, seconds: 33});
```

### setTimeByDate
Sets the starting time by a given date.
```js
timeCounter.setTimeByDate(new Date(), true|false)
```

### tick 
Tick function where the time is counting. It will be called by the each tick.

### triggerEvent
Custom event which will be fired on each tick, set time or reset.
It contains the current time string.
```js
timeCounter.triggerEvent(type)
```

### formatNumber 
Returns a string with the given number. 
If the number is less than 10, then add a leading zero.


