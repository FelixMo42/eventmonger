const [add, run] = require("./helper.js")()

var emitter;

add("../lib/index", ({ Event }) => {
    return () => {
        emitter = Event()
    }
})

add("eventemitter3", (ee) => {
    return () => {
        emitter = ee.EventEmitter()
    }
})

run()