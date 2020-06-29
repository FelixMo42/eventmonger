import benchmark from "benchmark"
import add from "./helper.js"

import * as evemtmonger from "../src/index.js"
import eventemitter3 from "eventemitter3"

const Handler = () => () => {}
const handler = () => {}

for (let num of [1000]) {
    let suite = new benchmark.Suite()

    add(suite, `local`, () => {
        let event = evemtmonger.Event()

        for (let i = 0; i < num; i++) evemtmonger.on(event, Handler())

        return () => {
            evemtmonger.fire(event, 42)
        }
    })

    add(suite, `eventemitter3`, () => {
        let event = new eventemitter3.EventEmitter()

        for (let i = 0; i < num; i++) event.on("test", Handler())

        return () => {
            event.emit('test', 42)
        }
    })

    console.log(`\nString with ${num} handlers registered`)
    suite
        .on('cycle', function cycle(e) {
            console.log(e.target.toString())
        })
        .on('complete', function completed() {
            console.log(`Fastest for ${num} is ${this.filter('fastest').map('name')}`);
        })
        .run()
}