#Time Counter
**Simple JavaScript time counter**

[DEMO](https://code-worker.de/timecounterjs)

## Usage 
At this moment, this TimeCounter is a simple JavaScript-Class with an old-school insertion in your website. 
`<script src="path/to/timecounter.js"></script>`
The TimeCounter triggers an custom event on each tick (every second).
This event has a `detail` attribute which contains the current time.
If you want to refresh something (like a paragraph or something else) by the tick, then bind the `TimeCounter:tick`-event on your object.

```js
// instantiate the time counter
var timeCounter = new TimeCounter();

// starts the counter. Default value is "00:00:00"
timeCounter.start();

// stops the counter and resets the value.
timeCounter.stop();
```

## Methods 
### constructor 
The constructor has (at this moment) one boolean parameter: `autostart`.
This parameter says, that the TimeCounter starts directly or not.

### start 
Starts the TimeCounter.

### stop 
Stops the TimeCounter and resets the time value.

### reset
Resets the whole counting. (stop, resetProps and starts again)

### resetProps
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


