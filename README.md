#Time Counter
**Simple JavaScript time counter**

## Usage 
At this moment, this TimeCounter is a simple JavaScript-Class with an old-school insertion in your website. 
`<script src="path/to/TimeCounter.js"></script>`   
(ToDo: create an AMD)  
The TimeCounter triggers an custom event on each tick (every second).
This event has a `detail` attribute which contains the current time.
If you want to refresh something (like a paragraph or something else) by the tick, then bind the `TimeCounter:tick`-event on your object.

```js
// instantiate the time counter
var timeCounter = new TimeCounter();

// starts the counter. Default value is "00:00:00"
timeCounter.start();

// stops the counter and resets the value.
// ToDo: return the current time counter value
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

### getTime 
Returns the counted time in following format: "hh:mm:ss"

### setTime
Sets the time of the counter with the given hours, minutes and seconds.
```js
timeCounter.setTime([hrs], [mins], [secs]);
```

### tick 
Tick function where the time is counting. It will be called by the each tick.

### triggerTickEvent 
Custom event which will be fired on each tick.
It contains the current time string. 

### formatNumber 
Returns a string with the given number. 
If the number is less than 10, then add a leading zero.


