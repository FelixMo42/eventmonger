EventMonger is a dead simple event system.

I didnt like a lot of the syntax for classical event system, so presto.

```js
var { Event, fire, on, off, once, when } = require('eventmonger')

let sampleEvent = Event()

let callback = name => console.log("hello ", name, "!")

// register a callback on an event
// note: a callback cant be registered multiple times to the same event
// note: returns the callback
on(sampleEvent, callback)

// remove a callback from an event
// note: returns the callback
off(sampleEvent, callback)

// once will return a promise that will resolve once the event if fired
once(sampleEvent).then(data => console.log(data))

// fire off the event!
// note: event can only have one paramter
fire(sampleEvent, "world")

// you can use when to filter a callback
on(samleEvent, when(name => name == "world", name => console.log("hello world"))
```