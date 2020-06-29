import benchmark from "benchmark"
import add from "./helper.js"

import * as evemtmonger from "../src/index.js"
import eventemitter3 from "eventemitter3"

//
// This is used to prevent the functions below from being transformed into
// noops.
//
var emitter;

let suite = new benchmark.Suite()

add(suite, `local`, () => {
    return () => {
        emitter = evemtmonger.Event()
    }
})

add(suite, `eventemitter3`, () => {
    return () => {
        emitter = eventemitter3.EventEmitter()
    }
})

console.log(`\nString`)
suite
    .on('cycle', function cycle(e) {
        console.log(e.target.toString())
    })
    .on('complete', function completed() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`)
    })
    .run()