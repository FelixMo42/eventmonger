const Handler = () => () => {}

for (let num of [1000]) {
    let [add, run] = require("./helper.js")()

    add("../lib/index", ({Event, on, fire}) => {
        let event = Event()

        for (let i = 0; i < num; i++) on(event, Handler())

        return () => {
            fire(event, 42)
        }
    })

    add("eventemitter3", (ee) => {
        let event = new ee.EventEmitter()

        for (let i = 0; i < num; i++) event.on("test", Handler())

        return () => {
            event.emit('test', 42)
        }
    })

    run()
}