export const isNull = (data: any): boolean => {
    return data === undefined || data === null
}

export const isNotNull = (data: any): boolean => {
    return !isNull(data)
}

export const isEmpty = (data: any): boolean => {
    return isNull(data) || data === '' || data === "" || (Array.isArray(data) && data.length === 0)
}

export const isNotEmpty = (data: any): boolean => {
    return !isEmpty(data)
}

export const throwIf = (condition: boolean, exception: Error) => {
    if (condition) {
        throw exception
    }
}

export const throwIfNot = (condition: boolean, exception: Error) => {
    if (!condition) {
        throw exception
    }
}

export const throwIfNull = (data: any, exception: Error) => {
    if (isNull(data)) {
        throw exception
    }
}

export const throwIfNotNull = (data: any, exception: Error) => {
    if (isNotNull(data)) {
        throw exception
    }
}

export const isString = (data: any) => {
    return typeof data === 'string' || data instanceof String
}


export const isNumber = (data: any) => {
    return typeof data === 'number' || data instanceof Number || Number.isFinite(data)
}