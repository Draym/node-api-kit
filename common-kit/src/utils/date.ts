import {isNotEmpty} from "./checks"
import {round} from "./math"

export const numberOfDaysUntil = (date: Date): number => {
    return numberOfDays(nowUTC(), date)
}

export const numberOfDays = (d1: Date, d2: Date): number => {
    let difference: number
    if (d1 > d2) {
        difference = d1.getTime() - d2.getTime()
    } else {
        difference = d2.getTime() - d1.getTime()
    }
    return Math.ceil(difference / (1000 * 3600 * 24))
}

export const toOptDate = (date: string | number | undefined | null): Date | undefined => {
    return isNotEmpty(date) ? new Date(date!) : undefined
}

export const toDate = (date: string): Date => {
    return new Date(date)
}

export const toUTCDate = (date: Date): Date => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

export const UTCDate = (year: number, month: number, date: number, hours: number, minutes: number, seconds: number): Date => {
    return new Date(Date.UTC(year, month, date, hours, minutes, seconds));
}

export const nowUTC = (): Date => {
    return new Date()
}

export const toTimestamp = (date: string | Date): number => {
    return (new Date(date)).getTime()
}

export const toUnixTimestamp = (date: string | Date): number => {
    return round((new Date(date)).getTime() / 1000)
}

export const nowUnix = (): number => {
    return round(Date.now() / 1000)
}

export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}