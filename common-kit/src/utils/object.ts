import {isNotNull} from "./checks"

export function merge(d1: {}, d2: {}): any {
    const result = {...d1}

    for (const key in d2) {
        if (isNotNull(d2[key])) {
            let value
            if (typeof d2[key] === 'object' && isNotNull(d1[key]) && typeof d1[key] === 'object') {
                value = merge(d1[key], d2[key])
            } else {
                value = d2[key]
            }
            result[key] = value
        }
    }
    return result
}

export function strictMerge(d1: {}, d2: {}): any {
    return {...d1, ...d2}
}