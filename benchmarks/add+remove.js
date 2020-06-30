const Handler = () => () => {}
const handler = () => {}

for (let num of [100]) {
    let [add, run] = require("./helper.js")()

    add("../lib/index", ({Event, on, off}) => {
        let event = Event()

        for (let i = 0; i < num; i++) on(event, Handler())

        return () => {
            on(event, handler)
            off(event, handler)
        }
    })

    add("eventemitter3", ({EventEmitter}) => {
        let event = new EventEmitter()

        for (let i = 0; i < num; i++) event.on("test", Handler())

        return () => {
            event.on("test", handler)
            event.off("test", handler)
        }
    })

    console.log(`\nString with ${num} handlers allready registered`)
    run()
}