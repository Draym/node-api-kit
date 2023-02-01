import {isNotEmpty} from "./checks"

export function toInt(value: string | null | undefined): number | null {
    return isNotEmpty(value) ? Number.parseInt(value) : null
}

export function toFloat(value: string | null | undefined): number | null {
    return isNotEmpty(value) ? Number.parseFloat(value) : null
}

export function toBoolean(value: string | null | undefined): boolean | null {
    switch (value?.toLowerCase()?.trim()) {
        case "true":
        case "yes":
        case "1":
            return true

        case "false":
        case "no":
        case "0":
            return false

        default:
            return null
    }
}