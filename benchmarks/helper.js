export default (suite, name, make) => {
    try {
        let callback = make()
        callback()
        suite.add(name, callback)
    } catch (e) {
        console.log(`Skiping ${name}`)
        console.log(e)
    }
}