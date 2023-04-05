import {isNotEmpty, isNotNull, isNull} from "./checks"

/**
 * Merges two objects. If the same key is present in both objects, the value from the second object is used.
 * @param d1 the first object
 * @param d2 the second object
 * @param ignoreEmpty if true then empty values are ignored and do not replace any value (except null)
 */
export function merge(d1: {}, d2: {}, ignoreEmpty = false): any {
    const result = {...d1}

    for (const key in d2) {
        if (isNull(result[key]) || (ignoreEmpty && isNotEmpty(d2[key])) || (!ignoreEmpty && isNotNull(d2[key]))) {
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