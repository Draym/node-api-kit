import {isNotEmpty, isNotNull} from "./checks"

export function merge(d1: {}, d2: {}): any {
    const result = {...d1}

    for (const key in d2) {
        if (isNotEmpty(d2[key])) {
            let value
            if (typeof d2[key] === 'object' && isNotNull(d1[key]) && typeof d1[key] === 'object') {
                value = merge(d1[key], d2[key])
            } else {
                value = d2[key]
            }
            console.log(key, value)
            result[key] = value
        }
    }
    return result
}

export function strictMerge(d1: {}, d2: {}): any {
    return {...d1, ...d2}
}