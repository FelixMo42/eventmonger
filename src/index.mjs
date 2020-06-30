/**
 * @callback EventCallback
 * @param {*} data
 */

/**
 * 
 * @function
 * @param {Event} event 
 * @param {*} data 
 */
const baseFire = (data, event) => event.forEach(callback => callback(data))

/**
 * Creates a new event
 * 
 * @function
 * @returns {Event}
 */
export const Event = (middleware) => {
    let event = []

    event.fire = !!middleware ? middleware(event, data => baseFire(event, data)) : baseFire

    return event
}

/**
 * triggers all the callback on the event
 * 
 * @function
 * @param {Event} event
 * @param {*} data
 */
export const fire = (event, data) => event.fire(data, event)
export const emit = fire

/**
 * registers a callback to be triggered when then event is fired
 * 
 * @function
 * @param {Event} event 
 * @param {EventCallback} callback 
 * @returns {EventCallback} returns the callback
 */
export const on = (event, callback) => {
    event.push(callback)
    
    return callback
}
export const addListener = on

/**
 * removes a callback from an event
 * 
 * @function
 * @param {Event} event
 * @param {EventCallback} callback
 * @returns {EventCallback} returns the callback
 */
export const off = (event, callback) => {
    let last = event.length - 1

    for (let i = last; i >= 0; i--) {
        if ( event[i] == callback ) {
            event[i] = event[last]

            event.pop()

            return callback
        }
    }

    return callback
}
export const removeListener = off

/**
 * clears all callbacks from an event
 * 
 * @param {Event} event 
 * @returns {Event} return the event
 */
export const clear = (event) => {
    event.length = 0

    return event
}
export const removeAllListeners = clear


/**
 * retures a promise that will resolve the next time the event is fired
 * 
 * @function
 * @param {Event} event
 * @returns {Promise}
 */
export const once = event => new Promise(resolve => {
    let func = on(event, data => {
        off(event, func)
        resolve(data)
    })
})

/**
 * @callback Condition
 * @param {*} data
 * @returns {boolean}
 */

/**
 * Makes a function only get called if parameter meets a condition
 * 
 * @function
 * @param {Condition} condition 
 * @param {EventCallback} callback 
 * @returns {EventCallback} returns a new function
 */
export const when = (condition, callback) => (data) => {
    if (condition(data)) callback(data)
}