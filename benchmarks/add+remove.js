import benchmark from "benchmark"
import add from "./helper.js"

import * as evemtmonger from "../index.js"
import eventemitter3 from "eventemitter3"

const Handler = () => () => {}
const handler = () => {}

for (let num of [100]) {
    let suite = new benchmark.Suite()

    add(suite, `local`, () => {
        let event = evemtmonger.Event()

        for (let i = 0; i < num; i++) evemtmonger.on(event, Handler())

        return () => {
            evemtmonger.on(event, handler)
            evemtmonger.off(event, handler)
        }
    })

    add(suite, `eventemitter3`, () => {
        let event = new eventemitter3.EventEmitter()

        for (let i = 0; i < num; i++) event.on("test", Handler())

        return () => {
            event.on("test", handler)
            event.off("test", handler)
        }
    })

    console.log(`\nString with ${num} handlers allready registered`)
    suite
        .on('cycle', function cycle(e) {
            console.log(e.target.toString())
        })
        .on('complete', function completed() {
            console.log(`Fastest for ${num} is ${this.filter('fastest').map('name')}`);
        })
        .run()
}