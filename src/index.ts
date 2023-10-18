type Event<P> = Array<(p: P) => void>;

export function Event<P>(): Event<P> {
    return []
}

export function emit<P>(event: Event<P>, p: P) {
    event.forEach((callback) => callback(p)) 
}

export function on<P>(event: Event<P>, callback: (p: P) => void) {
    event.push(callback)    
    return callback
}

export function off<P>(event: Event<P>, callback: (p: P) => void) {
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

export function clear<P>(event: Event<P>) {
    event.length = 0
    return event
}

export function once<P>(event: Event<P>): Promise<P> {
    return new Promise(resolve => {
        let func = on(event, data => {
            off(event, func)
            resolve(data)
        })
    })
}

export function when<P>(condition: (p: P) => boolean, callback: (p: P) => void): (p: P) => void {
    return (p) => {
        if (condition(p)) callback(p)
    }
}