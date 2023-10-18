export function Event() {
  return [];
}
export function emit(event, p) {
  event.forEach((callback) => callback(p));
}
export function on(event, callback) {
  event.push(callback);
  return callback;
}
export function off(event, callback) {
  let last = event.length - 1;
  for (let i = last; i >= 0; i--) {
    if (event[i] == callback) {
      event[i] = event[last];
      event.pop();
      return callback;
    }
  }
  return callback;
}
export function clear(event) {
  event.length = 0;
  return event;
}
export function once(event) {
  return new Promise((resolve) => {
    let func = on(event, (data) => {
      off(event, func);
      resolve(data);
    });
  });
}
export function when(condition, callback) {
  return (p) => {
    if (condition(p))
      callback(p);
  };
}
