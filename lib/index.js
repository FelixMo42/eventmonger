"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.when = exports.once = exports.removeAllListeners = exports.clear = exports.removeListener = exports.off = exports.addListener = exports.on = exports.emit = exports.fire = exports.Event = void 0;

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
const baseFire = (event, data) => event.forEach(callback => callback(data));
/**
 * Creates a new event
 * 
 * @function
 * @returns {Event}
 */


const Event = () => {
  let event = [];
  event.fire = baseFire;
  return event;
};
/**
 * triggers all the callback on the event
 * 
 * @function
 * @param {Event} event
 * @param {*} data
 */


exports.Event = Event;

const fire = (event, data) => event.fire(event, data, baseFire);

exports.fire = fire;
const emit = fire;
/**
 * registers a callback to be triggered when then event is fired
 * 
 * @function
 * @param {Event} event 
 * @param {EventCallback} callback 
 * @returns {EventCallback} returns the callback
 */

exports.emit = emit;

const on = (event, callback) => {
  event.push(callback);
  return callback;
};

exports.on = on;
const addListener = on;
/**
 * removes a callback from an event
 * 
 * @function
 * @param {Event} event
 * @param {EventCallback} callback
 * @returns {EventCallback} returns the callback
 */

exports.addListener = addListener;

const off = (event, callback) => {
  let last = event.length - 1;

  for (let i = last; i >= 0; i--) {
    if (event[i] == callback) {
      event[i] = event[last];
      event.pop();
      return callback;
    }
  }

  return callback;
};

exports.off = off;
const removeListener = off;
/**
 * clears all callbacks from an event
 * 
 * @param {Event} event 
 * @returns {Event} return the event
 */

exports.removeListener = removeListener;

const clear = event => {
  event.length = 0;
  return event;
};

exports.clear = clear;
const removeAllListeners = clear;
/**
 * retures a promise that will resolve the next time the event is fired
 * 
 * @function
 * @param {Event} event
 * @returns {Promise}
 */

exports.removeAllListeners = removeAllListeners;

const once = event => new Promise(resolve => {
  let func = on(event, data => {
    off(event, func);
    resolve(data);
  });
});
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


exports.once = once;

const when = (condition, callback) => data => {
  if (condition(data)) callback(data);
};

exports.when = when;

