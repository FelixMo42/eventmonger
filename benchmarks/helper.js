let benchmark = require("benchmark")

const resolveName = name => {
    if ( name[0] == "." ) return "eventmonger"
    else return name
}

module.exports = () => {
    let suite = new benchmark.Suite()
    
    return [
        (name, make) => {
            try {
                let package = require(name)
                let callback = make(package)
                callback()
                suite.add(resolveName(name), callback)
            } catch (e) {
                console.log(`Skiping ${name}`)
                console.log(e)
            }
        },
        () => suite
            .on('cycle', e => console.log(e.target.toString()))
            .on('complete', function() {
                console.log(`Fastest is ${this.filter('fastest').map('name')}`)
            })
            .run()
    ]
}