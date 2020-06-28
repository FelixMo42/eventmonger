/**
 * Creates a new event
 * 
 * @function
 * @returns {Event}
 */
export const Event = () => new Set()

/**
 * triggers all the callback on the event
 * 
 * @function
 * @param {Event} event
 * @param {*} data
 */
export const fire = (event, data) => event.forEach(callback => callback(data))

/**
 * registers a callback to be triggered when then event is fired
 * 
 * @function
 * @param {Event} event 
 * @param {function} callback 
 * @returns {function} returns the callback
 */
export const on = (event, callback) => {
    event.add(callback)
    
    return callback
}

/**
 * removes a callback from an event
 * 
 * @function
 * @param {Event} event
 * @param {function} callback
 * @returns {function} returns the callback
 */
export const off = (event, callback) => {
    event.delete(callback)

    return callback
}

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